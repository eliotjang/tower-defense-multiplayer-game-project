import express from 'express';
import { createServer } from 'http';
import initSocket from './init/socket.js';
import { loadGameAssets, getGameAssets } from './init/assets.js';
import configs from './config/configs.js';
import router from './router/accounts.router.js';

const app = express();
const server = createServer(app);
const PORT = configs.env.serverPort;

// static file(html, css, js) serve middleware
app.use(express.static('public'));
// body parser middleware
app.use(express.json());
// content-type이 form인 경우, body data 가져옴
app.use(express.urlencoded({ extended: false }));
// app.use('/api', accountRouter);
app.use('/api', router);
initSocket(server);

app.get('/hi', (req, res) => {
  res.send('<h1>Hello World</h1>');
});

server.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  try {
    await loadGameAssets();
    console.log('게임 에셋 로드 성공');
    const data = getGameAssets();
  } catch (error) {
    console.error('게임 에셋 로드 실패');
  }
});
