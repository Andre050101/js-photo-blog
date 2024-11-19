/*CONSEGNA:
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
*/

// Seleziona il contenitore della board
const board = document.querySelector('.board');

// URL dell'API di JSON Placeholder
const apiURL = 'https://jsonplaceholder.typicode.com/photos?_limit=6';

// Funzione per creare una card dinamica
function createCard(photo) {
    // Crea il markup della card
    const cardHTML = `
    <div class="card">
      <img src="./img/pin.svg" alt="Pin" class="pin">
      <div class="card-content" style="background-image: url('${photo.thumbnailUrl}'); background-size: cover; background-position: center;"></div>
      <p>${photo.title}</p>
    </div>
  `;
    return cardHTML;
}

// Funzione per caricare le foto dall'API
async function loadPhotos() {
    try {
        // Richiesta all'API con Axios
        const response = await axios.get(apiURL);
        const photos = response.data;

        // Genera dinamicamente le card e inseriscile nel DOM
        board.innerHTML = photos.map(photo => createCard(photo)).join('');
    } catch (error) {
        console.error('Errore durante il caricamento delle foto:', error);
        board.innerHTML = '<p>Si è verificato un errore durante il caricamento delle foto.</p>';
    }
}

// Carica le foto al caricamento della pagina
loadPhotos();