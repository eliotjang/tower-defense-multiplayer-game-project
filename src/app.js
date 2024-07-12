import initSocket from './init/socket.js';
import config from './config/configs.js';
import express from 'express';
import { createServer } from 'http';
import initSocket from './init/socket.js';
import { loadGameAssets, getGameAssets } from './init/assets.js';
import config from './config/configs.js';
import initServer from './init/init.js';

const app = express();
const server = createServer(app);
const PORT = config.env.serverPort;

// static file(html, css, js) serve middleware
app.use(express.static('public'));
// body parser middleware
app.use(express.json());
// content-type이 form인 경우, body data 가져옴
app.use(express.urlencoded({ extended: false }));
// app.use('/api', accountRouter);
initSocket(server);

app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>');
});

await initServer();

server.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  try {
  } catch (error) {
    console.error('게임 에셋 로드 실패');
  }
});
