const container = document.querySelector(".container");
const card = document.querySelector(".card.row");
const cardBody1 = document.querySelectorAll(".card-body")[0];
const form = document.querySelector("#film-form");
const title = document.querySelector("#title");
const director = document.querySelector("#director");
const url = document.querySelector("#url");
const button = document.querySelector(".btn-danger");
//sec card-body
const cardBody2 = document.querySelectorAll(".card-body")[1];
const filmTitle = document.querySelector("#films-title");
const tBody = document.querySelector("#films");
const clearAll = document.querySelector("#clear-films");

eventListeners();

function eventListeners() {
    form.addEventListener("submit", addFilm);
    document.addEventListener("DOMContentLoaded", showFilmsFromLocalStorage);
    clearAll.addEventListener("click", clearAllFilms);
}

function clearAllFilms(e) {
    if (confirm("Hepsini silicem. Emin misin?")) {
        while (tBody.firstElementChild != null) {
            tBody.removeChild(tBody.firstElementChild);
        }
        localStorage.removeItem("films");
    } else {
        alert("Silme işlemi iptal edildi...");
    }
}

function addFilm(e) {
    const getTitle = title.value.trim();
    title.value = "";
    const getDirector = director.value.trim();
    director.value = "";
    const getUrl = url.value;
    url.value = "";
    if (getTitle === "" || getDirector === "" || getUrl === "") {
        showAlert("danger", "Hiçbir alan boş bırakılamaz...");
    } else {
        addFilmToUI(getTitle, getDirector, getUrl);
        addFilmToLocalStorage(getTitle, getDirector, getUrl);
        showAlert("success", "Film başarıyla eklendi...");
        console.log("ui a ekleme");
    }
    e.preventDefault();
}

function showAlert(type, message) {
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.innerHTML = message;
    cardBody1.appendChild(alert);
    setTimeout(() => {
        alert.remove();
    }, 1000);
}

function addFilmToUI(getTitle, getDirector, getUrl) {
    const trElement = document.createElement("tr");
    const tdElement = document.createElement("td");
    const imgElement = document.createElement("img");
    imgElement.src = getUrl;
    imgElement.className = "img-fluid img-thumbnail";
    tdElement.appendChild(imgElement);
    trElement.appendChild(tdElement);
    const tdElement2 = document.createElement("td");
    tdElement2.appendChild(document.createTextNode(getTitle));
    trElement.appendChild(tdElement2);
    const tdElement3 = document.createElement("td");
    tdElement3.appendChild(document.createTextNode(getDirector));
    trElement.appendChild(tdElement3);
    const tdElement4 = document.createElement("td");
    const aElement = document.createElement("a");
    aElement.href = "#";
    aElement.id = "delete-film";
    aElement.className = "btn btn-danger";
    //  aElement.innerHTML = "<i class = 'fa fa-remove'></i>";
    aElement.textContent = "Filmi Sil";
    tdElement4.appendChild(aElement);
    trElement.appendChild(tdElement4);
    tBody.appendChild(trElement);
}

function getFilmToLocalStorage() {
    let films;
    if (localStorage.getItem("films") === null) {
        films = [];
    } else {
        films = JSON.parse(localStorage.getItem("films"));
    }
    return films;
}

function addFilmToLocalStorage(getTitle, getDirector, getUrl) {
    let films = getFilmToLocalStorage();
    films.push({
        title: getTitle,
        director: getDirector,
        url: getUrl,
    });
    localStorage.setItem("films", JSON.stringify(films));
}

function showFilmsFromLocalStorage() {
    let films = getFilmToLocalStorage();
    films.forEach((film) => {
        addFilmToUI(film.title, film.director, film.url);
    });
}