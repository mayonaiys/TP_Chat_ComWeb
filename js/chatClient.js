//Création variable globale
var webSocket = createWebSocket();

//Création login
var login = prompt("Entrez votre login!");

//Fonction createWebSocket
function createWebSocket(){
    let ws = new WebSocket('ws://localhost:12345/');
    let button = document.getElementById('send');
    button.addEventListener("click", sendMessage);
    return ws;
}

//Fonction sendMessage
function sendMessage(event){
    let message = document.getElementById('message').value;
    webSocket.send(login + " : " + message + "\n");
    event.preventDefault();
    document.getElementById('message').value = "";
}

//Récupération message envoyé par le serveur + affichage dans la zone de texte
webSocket.onmessage = function(event){
    let tchat = document.getElementById('textarea');
    tchat.setAttribute("disabled",false);
    tchat.append(event.data);
    tchat.setAttribute("disabled",true);
}