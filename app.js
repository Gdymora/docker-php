const express = require("express");
const WebSocket = require("ws");
const http = require("http");
const app = express();
const port = process.env.PORT || 3000;

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

const { exec } = require("child_process");

function sendOutputInChunks(output, ws, type) {
  const chunkSize = 1024; // Размер порции
  let offset = 0;

  function sendChunk() {
    if (offset < output.length) {
      const chunk = output.slice(offset, offset + chunkSize);
      ws.send(JSON.stringify({ type: type, message: chunk }));
      offset += chunkSize;
      setTimeout(sendChunk, 100); // Отправляем следующую порцию через 100 миллисекунд
    }
  }

  sendChunk(); // Начинаем отправку данных порциями
}

app.get("/start-docker", (req, res) => {
  const dockerCommand = "./start 8";
  const options = { maxBuffer: 1024 * 1024 }; // Увеличиваем размер буфера для child_process

  exec(dockerCommand, options, (error, stdout, stderr) => {
    if (error) {
      console.error(`Ошибка выполнения команды: ${error}`);
      return res.status(500).send("Error Docker.");
    } else {
      console.log(`Результат выполнения команды: ${stdout}`); 
      res.send("Команда Docker успешно выполнена.");
    }
  });
});

app.get("/ls", (req, res) => {
  const dockerCommand = "ls";
  exec(dockerCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Ошибка выполнения команды: ${error}`);
      return res.status(500).send("Error Docker.");
    } else {
      console.log(`Результат выполнения команды: ${stdout}`); 
      res.send("Команда Docker успешно выполнена.");
    }
  });
});

wss.on("connection", (ws) => {
  console.log("WebSocket connected");

  const originalConsoleLog = console.log;
  console.log = function (message) {
    originalConsoleLog.apply(console, arguments);
    sendOutputInChunks(message, ws, "log"); // Отправляем сообщение через WebSocket
  };

  const originalConsoleError = console.error;
  console.error = function (message) {
    originalConsoleError.apply(console, arguments);
    sendOutputInChunks(message, ws, "error"); // Отправляем сообщение через WebSocket
  };
});

server.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});

