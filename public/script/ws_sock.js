const socket = new WebSocket('ws://localhost:3000'); // Измените на свой порт, если не используете 3000
const consoleDiv = document.getElementById('console');

socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    const messageElement = document.createElement('p');

    if (data.type === 'log') {
        messageElement.textContent = data.message;
    } else if (data.type === 'error') {
        messageElement.textContent = data.message;
        messageElement.style.color = 'red';
    }

    consoleDiv.appendChild(messageElement);
};
