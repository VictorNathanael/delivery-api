import express from 'express';
import OrderRouter from './routes/order.routes.js';

const app = express();
const port = 3000;
app.use(express.json());
app.use('/', OrderRouter);

app.listen(port, () => {
    console.log('API Started');
});
