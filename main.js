const URL = "https://rickandmortyapi.com/api/character/";
const $loadMoreButton = document.getElementById("load-more"),
  $loading = document.querySelector(".loading"),
  $charactersList = document.querySelector(".characters-wrapper"),
  $body = document.querySelector("body");

const stringToHTML = (s) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(s, "text/html");
  return doc.body.firstChild;
};
const addEvents = (selector, id) => {
  $body.appendChild(selector);
  window.addEventListener("click", (event) => {
    if (event.target === selector || event.target.id === `close-${id}`) {
      selector.querySelector(".modal-content").style.animationName =
        "animatetopOut";
      setTimeout(() => {
        $body.removeChild(selector);
      }, 200);
    }
  });
};
const showModal = ({ name, id, image, status, species, gender, origin }) => {
  let template = `
    <div id="myModal-${id}" class="modal">
      <div class="modal-content">
        <span class="close" id="close-${id}">&times;</span>
        <div class="modal-body">
          <div class="modal-image">
            <img src="${image}" alt="${name}">
          </div>
          <div class="modal-bio">
          <h2>${name}</h2>
          <p>Specie: ${species}</p>
          <p>Gender: ${gender}</p>
          <p>Status: ${status}</p>
          <p>Origin: ${origin.name}</p>
          </div>
        </div>
      </div>
    </div>
    `;
  renderedModal = stringToHTML(template);
  addEvents(renderedModal, id);
};
const showCard = (character) => {
  const { id, image, name } = character;
  let template = `
        <div class="character fade-in" data-id="${id}">
            <div class="character-image-wrapper">
                <img src="${image}" alt="${name}">
            </div>
            <div class="character-bio">
                <h3>${name}</h3>
            </div>
        </div>
    `;
  renderedCharacter = stringToHTML(template);
  renderedCharacter.addEventListener("click", function () {
    showModal(character);
  });
  return renderedCharacter;
};
const getData = (URL) => {
  $loading.style.display = "block";
  fetch(URL)
    .then((res) => res.json())
    .then(({ info: { next }, results }) => {
      $loading.style.display = "none";
      $loadMoreButton.dataset.nextUrl = next ? next : "";
      let charactersElements = results.map((result) => showCard(result));
      $charactersList.append(...charactersElements);
    });
};
window.addEventListener("DOMContentLoaded", function () {
  getData(URL);
  $loadMoreButton.addEventListener("click", function () {
    let URL = this.dataset.nextUrl;
    getData(URL);
  });
});
