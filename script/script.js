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

// Selezione del contenitore principale
const board = document.querySelector('.board');

// URL dell'API (carica solo 6 foto)
const apiURL = 'https://jsonplaceholder.typicode.com/photos?_limit=6';

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
    // Effettua una richiesta GET
    const response = await axios.get(apiURL);
    const photos = response.data;

    // Genera il markup delle card
    board.innerHTML = photos.map(createCard).join('');
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      card.addEventListener('click', (e) => {
        const imageUrl = e.currentTarget.querySelector('.card-content').style.backgroundImage;
        const cleanUrl = imageUrl.replace('url(', '').replace(')', '').replace(/"/g, '');
        overlay.style.display = 'flex';
        overlayImg.src = cleanUrl;
      });
    });
  } catch (error) {
    // Gestione degli errori
    console.error('Errore durante il caricamento delle foto:', error);
    board.innerHTML = '<p>Errore durante il caricamento. Riprova più tardi.</p>';
  }
}

/*Gestione overlay:*/
const overlay = document.getElementById('overlay');
const closeOverlayBtn = document.getElementById('close-overlay');
const overlayImg = document.getElementById('overlay-img');

// Funzione per chiudere l'overlay quando si clicca sul bottone di chiusura
closeOverlayBtn.addEventListener('click', () => {
  overlay.style.display = 'none';
});

// Avvia il caricamento delle foto al caricamento della pagina
loadPhotos();