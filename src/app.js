import express from 'express';
import { createServer } from 'http';
import config from './config/configs.js';
import initServer from './init/init.js';

const app = express();
const server = createServer(app);
const PORT = config.env.serverPort;

// static file(html, css, js) serve middleware
app.use(express.static('public', { index: config.client.index }));
// body parser middleware
app.use(express.json());
// content-type이 form인 경우, body data 가져옴
app.use(express.urlencoded({ extended: false }));
// app.use('/api', accountRouter);

app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>');
});

initServer(server).then(() => {
  server.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    try {
    } catch (error) {
      console.error('게임 에셋 로드 실패');
    }
  });
});
