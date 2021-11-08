const process = require("process");
const path = require("path");
const fs = require("fs");
const { stdin, stdout } = process;

const pathFile = path.join(__dirname, "text.txt");
let readableStream = fs.createReadStream(pathFile, "utf8");
let writeableStream = fs.createWriteStream(pathFile);

const EventEmitter = require("events");
const emitter = new EventEmitter();

const handler1 = () =>
  fs.writeFile(pathFile, "", (err) => {
    if (err) throw err;
    console.log("Привет! Как тебя зовут?");
  });
const handler2 = () =>
  stdin.on("data", (data) => {
    // функция,которая будет записывать текст в файл
    writeableStream.write(data); // Запись данных - метод write(), в который передаются данные
    writeableStream.end(""); // Завершение записи
    readableStream.pipe(writeableStream); // У потока чтения вызывается метод pipe(), в который передается поток для записи
  });
process.on("exit", () => stdout.write("Удачи в изучении Node.js!"));

emitter.on("start", handler1); // первый обработчик запускается при событии старт
emitter.on("start", handler2); // второй нужно запустить на событии старт

emitter.emit("start"); // выводит 1, затем 2 (генерируем событие, чтобы сработал его обработчик->метод emit())
