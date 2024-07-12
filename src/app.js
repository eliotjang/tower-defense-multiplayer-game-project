<<<<<<< HEAD
import express from 'express';
import { createServer } from 'http';
import initSocket from './init/socket.js';
import { loadGameAssets, getGameAssets } from './init/assets.js';
import configs from './config/configs.js';
import router from './router/accounts.router.js';

const app = express();
const server = createServer(app);
const PORT = configs.env.serverPort;
=======
import express from "express";
import { createServer } from "http";
import config from "./config/configs.js";
import initServer from "./init/init.js";

const app = express();
const server = createServer(app);
const PORT = config.env.serverPort;
>>>>>>> b664291810d26b82c7bd5b8628ea7a4a6b8187e7

// static file(html, css, js) serve middleware
app.use(express.static("public"));
// body parser middleware
app.use(express.json());
// content-type이 form인 경우, body data 가져옴
app.use(express.urlencoded({ extended: false }));
// app.use('/api', accountRouter);
<<<<<<< HEAD
app.use('/api', router);
initSocket(server);

app.get('/hi', (req, res) => {
  res.send('<h1>Hello World</h1>');
=======

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
>>>>>>> b664291810d26b82c7bd5b8628ea7a4a6b8187e7
});

initServer(server).then(() => {
  server.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    try {
    } catch (error) {
      console.error("게임 에셋 로드 실패");
    }
  });
});
