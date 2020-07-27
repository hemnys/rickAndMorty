const URL = 'https://rickandmortyapi.com/api/character/';

const stringToHTML = (s) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(s, "text/html");
    return doc.body.firstChild;
};
const addEvents = (selector, id) => {
    document.querySelector('body').appendChild(selector);
    selector.style.display = 'block';
    const span = document.getElementById(`close-${id}`);
    window.onclick = function (event) {
        if (event.target === selector) {
            selector.style.display = "none";
        }
    }
    span.onclick = function () {
        selector.style.display = "none";
    }
}
const showModal = (character) => {
    const { name, id, image, status, species, gender, origin } = character;
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
    addEvents(renderedModal, id)

}
const showCard = (character) => {
    const { name, id, image } = character;
    let template = `
        <div class="character" data-id="${id}">
            <div class="character-image-wrapper">
                <img src="${image}" alt="${name}">
            </div>
            <div class="character-bio">
                <h3>${name}</h3>
            </div>
        </div>
    `;
    renderedCharacter = stringToHTML(template);
    renderedCharacter.addEventListener('click', function () {
        showModal(character);
    })
    return renderedCharacter;
}
window.onload = () => {
    fetch(URL)
        .then(res => res.json())
        .then(characters => {
            characters.results.map(character => {
                const charactersList = document.querySelector('.characters-wrapper')
                let renderedCharacters = showCard(character);

                charactersList.appendChild(renderedCharacters)
            })
        })
}