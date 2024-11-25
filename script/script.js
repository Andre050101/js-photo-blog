/*CONSEGNA 1:
*Milestone 1*
Sfruttando gli screen e gli asset in allegato riproduciamo la grafica proposta in maniera statica: utilizzando soltanto HTML e CSS e riproducendo una singola fotografia (usiamo una qualunque immagine a piacimento)

*Milestone 2*
Utilizzando Postman, testiamo una chiamata all’endpoint di JSON Placeholder:
https://jsonplaceholder.typicode.com/photos?_limit=6
Studiamo bene la risposta e i dati che ci fornisce iniziando a pensare a come poterli sfruttare.

*Milestone 3*
Inseriamo un foglio JavaScript ed effettuiamo una chiamata AJAX all’API di JSON Placeholder, sfruttando la risposta per generare dinamicamente in pagina una serie di foto!

*Bonus*
rendi la pagina responsive, in modo che su mobile e tablet le foto si dispongano man mano una sotto l’altra ed il titolo abbia una dimensione adeguata

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

CONSEGNA 2:
*Milestone 1*
Facciamo in modo di creare un overlay che copra l’intera pagina e all’interno, centrata, disponiamo un’immagine qualunque ed un button di chiusura.

*Milestone 2*
Facciamo sparire l’overlay con l’aiuto di una classe CSS che imposti il display: none .
Dopodiché facciamo sì che cliccando una qualunque foto. L’overlay ricompaia.
Cliccando invece il button di chiusura, l’overlay scompare nuovamente.

*Milestone 3*
Inseriamo il pezzo di logica finale: quando una foto viene cliccata, dobbiamo fare in modo che sia proprio quella foto a essere mostrata all’interno dell’overlay.
Ci sono diversi modi di farlo, prova a sperimentare :faccia_leggermente_sorridente:

*Bonus*
Spostandosi col mouse sopra le foto, queste si zoommano, ruotano di 10 gradi e la loro ombra aumenta, il tutto in manierà fluida. Inoltre il mouse diventa un puntatore, per far capire all’utente che può cliccare
Aggiungere un loader al caricamento dei dati
*/

//COSTANTI
const board = document.querySelector('.board'); // Selezione del contenitore principale

const apiURL = 'https://jsonplaceholder.typicode.com/photos?_limit=6'; // URL dell'API (carica solo 6 foto)

// Riferimenti agli elementi dell'overlay per visualizzare l'immagine ingrandita
const overlay = document.getElementById('overlay'); // Contenitore dell'overlay (background scuro)
const closeOverlayBtn = document.getElementById('close-overlay'); // Bottone per chiudere l'overlay
const overlayImg = document.getElementById('overlay-img'); // Immagine visualizzata nell'overlay

// Riferimenti ai pulsanti di navigazione tra le foto nell'overlay
const prevButton = document.getElementById('prev-photo'); // Bottone per visualizzare la foto precedente
const nextButton = document.getElementById('next-photo'); // Bottone per visualizzare la foto successiva

// Riferimento al pulsante per eliminare la foto corrente dall'overlay
const deletePicBtn = document.getElementById('delete-photo'); // Bottone per eliminare la foto corrente

// Riferimento al pulsante per aggiungere una nuova foto
const btnBase = document.getElementById('btnBase'); // Bottone per aggiungere una nuova foto alla griglia

// Riferimento al pulsante per eliminare tutte le foto
const deleteAllBtn = document.getElementById('deleteAllBtn');

//VARIABILI
let currentPhotoIndex = 0; // Indice della foto corrente che viene visualizzata nell'overlay
let photos = []; // Array che conterrà tutte le foto caricate (inclusi i dati come URL e titolo)

//FUNZIONI
// Funzione per creare una singola card
function createCard(photo) {
  return `
        <div class="card" data-url="${photo.url}">
            <img src="./img/pin.svg" alt="Pin" class="pin">
            <div class="card-content" 
                style="background-image: url('${photo.url}');">
            </div>
            <p>${photo.title}</p>
        </div>
    `;
}

// Funzione per caricare le foto dall'API
async function loadPhotos() {
  try {
    // Effettua una richiesta GET bloccando esecuzione finche l'esecuzione della promise non è terminata (metodo async/await)
    const response = await axios.get(apiURL);
    // Memorizza le foto per la navigazione
    photos = response.data;

    // Genera il markup delle card
    board.innerHTML = photos.map(createCard).join('');
    //Gestione apertura card al click
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
      card.addEventListener('click', () => {
        currentPhotoIndex = index; // Salva l'indice della foto cliccata
        openOverlay(currentPhotoIndex); // Mostra l'overlay con la foto selezionata
      });
    });
  } catch (error) {
    // Gestione degli errori
    console.error('Errore durante il caricamento delle foto:', error);
    board.innerHTML = '<p>Errore durante il caricamento. Riprova più tardi.</p>';
  }
}
//Apertura e chiusura Overlay
//Apertura
function openOverlay(index) {
  const photo = photos[index];
  overlay.style.display = 'flex';
  overlayImg.src = photo.url;
}

//Chiusura
function closeOverlay() {
  overlay.style.display = 'none';
}

// Navigazione tra le foto
//Foto successiva
function showNextPhoto() {
  currentPhotoIndex = (currentPhotoIndex + 1) % photos.length; // Vai alla foto successiva
  openOverlay(currentPhotoIndex);
}
//Foto precedente
function showPrevPhoto() {
  currentPhotoIndex =
    (currentPhotoIndex - 1 + photos.length) % photos.length; // Vai alla foto precedente
  openOverlay(currentPhotoIndex);
}

//Funzione per eliminazione foto
function deletePhoto() {
  if (photos.length > 0) {
    //Elimino foto da array
    photos.splice(currentPhotoIndex, 1);

    //Aggiorno griglia sulla board
    board.innerHTML = photos.map(createCard).join('');

    //Riaggiungo event listener alle card
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
      card.addEventListener('click', () => {
        currentPhotoIndex = index;
        openOverlay(currentPhotoIndex);
      });
    });
    closeOverlay();

    //Se non ci sono foto, mostra messaggio:
    if (photos.length === 0) {
      board.innerHTML = `
      <p class="noPicMsg">Nessuna foto disponibile.</p>
      <div class = "addBtnWrapper">
        <button class="addBtn">
        <span class="textBtn">Carica foto</span>
        <i class="fa-solid fa-image addBtnImg"></i></button>
      </div>
      `;
      btnBase.style.display = 'none';
      deleteAllBtn.style.display = 'none';
    }
  }
}
//Funzione per aggiungere foto
function addPhoto(photo) {
  //aggiunta foto in array
  photos.push(photo);

  //Aggiorna griglia
  board.innerHTML = photos.map(createCard).join('');

  //Aggiunge event listener a card aggiornate
  const cards = document.querySelectorAll('.card');
  cards.forEach((card, index) => {
    card.addEventListener('click', () => {
      currentPhotoIndex = index,
        openOverlay(currentPhotoIndex);
    });
  });
  if (photos.length > 0) {
    deleteAllBtn.style.display = 'block';
  }
  btnBase.style.display = 'block';
}

//funzione per colore esadecimale casuale
function getRandomHexColor() {
  return Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}

//funzione per titolo generato casualmente
function getRandomLoremString() {
  const words = [
    "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing",
    "elit", "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore",
    "et", "dolore", "magna", "aliqua", "ut", "enim", "ad", "minim",
    "veniam", "quis", "nostrud", "exercitation", "ullamco", "laboris",
    "nisi", "ut", "aliquip", "ex", "ea", "commodo", "consequat"
  ];

  let randomWords = [];
  for (let i = 0; i < 7; i++) {
    const randomIndex = Math.floor(Math.random() * words.length);
    randomWords.push(words[randomIndex]);
  }

  return randomWords.join(' ');
}

//funzione per gestire click su bottone carica foto
function handleAddPicBtn() {
  const color = getRandomHexColor();
  console.log(color);
  const title = getRandomLoremString();
  console.log(title);
  const newPhoto = {
    url: 'https://via.placeholder.com/600/' + color,
    title: title + (photos.length + 1),
  };
  console.log(title);
  addPhoto(newPhoto);
}

//funzione per eliminare tutte le foto 
function deleteAllPics() {
  photos = [];
  board.innerHTML = `
      <p class="noPicMsg">Nessuna foto disponibile.</p>
      <div class = "addBtnWrapper">
        <button class="addBtn">
        <span class="textBtn">Carica foto</span>
        <i class="fa-solid fa-image addBtnImg"></i></button>
      </div>
      `;
  btnBase.style.display = 'none';
  deleteAllBtn.style.display = 'none';
}

//EVENT LISTENER
// Event listener per chiudere l'overlay
closeOverlayBtn.addEventListener('click', closeOverlay);

// Event listener per navigazione
//Bottone precedente
prevButton.addEventListener('click', (e) => {
  e.stopPropagation(); // Evita che il click chiuda l'overlay
  showPrevPhoto();
});
//Bottone successivo
nextButton.addEventListener('click', (e) => {
  e.stopPropagation(); // Evita che il click chiuda l'overlay
  showNextPhoto();
});

// Event listener per chiudere l'overlay cliccando fuori dall'immagine
overlay.addEventListener('click', closeOverlay);

// Evita che il click sull'immagine non chiuda l'overlay
overlayImg.addEventListener('click', (e) => e.stopPropagation());

//Event listener per bottone eliminazione
deletePicBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  deletePhoto();
});

//Event listener per bottone dinamico
document.addEventListener('click', (e) => {
  if (e.target && e.target.matches('.addBtn')) {
    handleAddPicBtn();
  }
});

//Gestiamo funzionamento bottone aggiungi foto basico(aside)
btnBase.addEventListener('click', (e) => {
  handleAddPicBtn();
})

//Event listener per pulsante elimina tutto
deleteAllBtn.addEventListener('click', (e) => {
  deleteAllPics();
})

// Avvia il caricamento delle foto al caricamento della pagina
loadPhotos();