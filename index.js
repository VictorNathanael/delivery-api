import express from 'express';
import fs from 'fs';

global.filename = 'order.json';

const order = fs.readFileSync(filename, 'utf-8');
const data = JSON.parse(order);

const app = express();
app.use(express.json());
const port = 3000;

app.listen(port, () => {
    console.log('API Started');
});

app.get('/orders', (req, res) => {
    try {
        res.status(200).send(data.orders);
    } catch (err) {
        console.error(err);
    }
});

app.put('/orders/:id', (req, res) => {
    try {
        let id = req.params.id;
        let body = req.body;
        res.status(200).send(updateOrder(id, body));
    } catch (err) {
        console.error(err);
    }
});

function updateOrder(id, body) {
    const order = data.orders.find((order) => {
        return order.id === Number(id);
    });
    if (!order) return 'order not found';

    if (!data.products.includes(body.product)) return 'this product not exist';

    order.client = body.client;
    order.product = body.product;
    order.value = body.value;

    return order;
}
