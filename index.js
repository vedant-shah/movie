const title = document.getElementById("title");
const actors = document.getElementById("actors");
const releaseYear = document.getElementById("releaseYear");
const boxOffice = document.getElementById("boxOffice");
const synopsis = document.getElementById("synopsis");
const rating = document.getElementById("rating");

const addMoviebtn = document.querySelector(".btn-primary");
addMoviebtn.addEventListener("click", addMovie);

const movielistlocal = localStorage.getItem("movies");

const movieList = document.querySelector(".table-group-divider");
if (movielistlocal) {
  const movies = JSON.parse(movielistlocal);
  movies.forEach((movie) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${movie.title}</td><td>${movie.actors}</td><td>${movie.releaseYear}</td><td>${movie.boxOffice}</td><td>${movie.synopsis}</td><td>${movie.rating}</td><td><button class="btn btn-primary edit-btn">Edit</button><button class="btn btn-danger mx-2 delete-btn">Delete</button></td>`;
    movieList.appendChild(tr);
  });
}

const deleteBtn = document.querySelectorAll(".delete-btn");
deleteBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    const movie = JSON.parse(movielistlocal);
    const index = movie.findIndex(
      (movie) => movie.title === btn.parentNode.parentNode.children[0].innerText
    );
    movie.splice(index, 1);
    localStorage.setItem("movies", JSON.stringify(movie));
    location.reload();
  });
});
let isEditing = false;

const editBtn = document.querySelectorAll(".edit-btn");
editBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    isEditing = true;
    const movie = JSON.parse(movielistlocal);
    const index = movie.findIndex(
      (movie) => movie.title === btn.parentNode.parentNode.children[0].innerText
    );
    console.log("index:", index);
    const movielocal = movie[index];
    title.value = movielocal.title;
    actors.value = movielocal.actors;
    releaseYear.value = movielocal.releaseYear;
    boxOffice.value = movielocal.boxOffice;
    synopsis.value = movielocal.synopsis;
    rating.value = movielocal.rating;
  });
});
function addMovie() {
  if (isEditing) {
    const movie = {
      title: title.value,
      actors: actors.value,
      releaseYear: releaseYear.value,
      boxOffice: boxOffice.value,
      synopsis: synopsis.value,
      rating: rating.value,
    };
    localStorage.setItem(
      "movies",
      JSON.stringify([
        ...JSON.parse(movielistlocal).filter(
          (movie) => movie.title !== title.value
        ),
        movie,
      ])
    );
    location.reload();
    return;
  }
  const movie = {
    title: title.value,
    actors: actors.value,
    releaseYear: releaseYear.value,
    boxOffice: boxOffice.value,
    synopsis: synopsis.value,
    rating: rating.value,
  };
  let parsedMovies = JSON.parse(movielistlocal);
  if (parsedMovies) {
    if (
      JSON.parse(movielistlocal).findIndex(
        (movie) => movie.title === title.value
      ) !== -1
    ) {
      alert("Movie with this title already exists");
      return;
    }
    localStorage.setItem(
      "movies",
      JSON.stringify([...(JSON.parse(movielistlocal) || []), movie])
    );
  } else {
    localStorage.setItem("movies", JSON.stringify([movie]));
  }
  location.reload();
}
