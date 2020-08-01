const URL = 'https://rickandmortyapi.com/api/character/';
const loadMore = document.getElementById('load-more');
const body = document.querySelector('body');

const stringToHTML = (s) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(s, "text/html");
    return doc.body.firstChild;
};
const addEvents = (selector, id) => {
    body.appendChild(selector);
    window.onclick = function (event) {
        if (event.target === selector || event.target.id === `close-${id}`) {
            selector.querySelector('.modal-content').style.animationName = 'animatetopOut'
            setTimeout(() => { document.querySelector('body').removeChild(selector); }, 200);
        }
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
    renderedCharacter.addEventListener('click', function () {
        showModal(character);
    })
    return renderedCharacter;
}
const getData = URL => {
    const loading = document.querySelector('.loading');
    loading.style.display = 'block';
    body.classList.add('loading-products');
    fetch(URL)
        .then(res => res.json())
        .then(characters => {
            loading.style.display = 'none';
            if (characters.info.next) {
                loadMore.setAttribute('data-next-url', characters.info.next);
            }
            characters.results.map(character => {
                const charactersList = document.querySelector('.characters-wrapper')
                let renderedCharacters = showCard(character);
                charactersList.appendChild(renderedCharacters);
            })
            body.classList.remove('loading-products');
        })
        .finally(() => { body.classList.remove('loading-products'); })
}
window.onload = () => {
    getData(URL);
    window.addEventListener('scroll', function (e) {
        let target = loadMore.getBoundingClientRect().top;
        if (loadMore && !body.classList.contains('loading-products')) {
            if (target < (window.innerHeight + 400)) {
                let URL = loadMore.dataset.nextUrl;
                getData(URL)
            }
        }
    })
}