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

// Selezione del contenitore principale
const board = document.querySelector('.board');

// URL dell'API (carica solo 6 foto)
const apiURL = 'https://jsonplaceholder.typicode.com/photos?_limit=6';

// Funzione per creare una singola card
function createCard(photo) {
  return `
        <div class="card">
            <img src="./img/pin.svg" alt="Pin" class="pin">
            <div class="card-content" 
                style="background-image: url('${photo.thumbnailUrl}');">
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
  } catch (error) {
    // Gestione degli errori
    console.error('Errore durante il caricamento delle foto:', error);
    board.innerHTML = '<p>Errore durante il caricamento. Riprova più tardi.</p>';
  }
}

// Avvia il caricamento delle foto al caricamento della pagina
loadPhotos();