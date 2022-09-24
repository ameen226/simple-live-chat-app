const socket = io('http://localhost:3000')

const name = prompt('Enter your name');

var el = document.querySelector('button');
var message;
var ul = document.querySelector('ul');

socket.emit('new-user', name);

addListItem('You joined the chat');

socket.on('message', message => {
    addListItem(message);
})

socket.on('new-user', name => {
    addListItem(`${name} joined the chat`);
})



el.addEventListener('click', function () {
    message = document.querySelector('input').value;
    document.querySelector('input').value = '';
    addListItem(`me: ${message}`);
    socket.emit('message', message);
})

function addListItem(text) {
    var li = document.createElement('li');
    li.innerText = text;
    ul.appendChild(li);
}