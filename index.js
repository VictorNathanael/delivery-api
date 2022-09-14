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

app.get('/order/:id', (req, res) => {
    try {
        let id = req.params.id;
        res.status(200).send(data.orders[id]);
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

app.put('/orders/delivered/:id', (req, res) => {
    try {
        let id = req.params.id;
        let body = req.body;
        res.status(200).send(updateDelivered(id, body));
    } catch (err) {
        console.error(err);
    }
});

app.delete('/orders/:id', (req, res) => {
    try {
        let id = req.params.id;
        res.status(200).send(deleteOrder(id));
    } catch (err) {
        console.error(err);
    }
});

app.get('/orders/client', (req, res) => {
    try {
        let body = req.body;
        res.status(200).send(findClient(body));
    } catch (err) {
        console.error(err);
    }
});

app.get('/orders/products', (req, res) => {
    try {
        let body = req.body;
        res.status(200).send(consultOrder(body));
    } catch (err) {
        console.error(err);
    }
});

app.get('/moreOrders', (req, res) => {
    try {
        res.status(200).send(moreOrders());
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

function updateDelivered(id, body) {
    const order = data.orders.find((order) => {
        return order.id === Number(id);
    });
    if (!order) return 'order not found';

    order.delivered = body.delivered;

    return order;
}

function deleteOrder(id) {
    const order = data.orders.find((order) => {
        return order.id === Number(id);
    });

    if (!order) return 'order not found';

    delete data.orders[id];

    return data.orders;
}

function findClient(body) {
    const client = data.orders
        .filter((order) => {
            return order.client === body.client && order.delivered === true;
        })
        .reduce((s, v) => (s += v.value), 0);

    return { client };
}

function consultOrder(body) {
    const orders = data.orders
        .filter((order) => {
            return order.product === body.product && order.delivered === true;
        })
        .reduce((s, v) => (s += v.value), 0);

    return { orders };
}

function moreOrders() {
    const deliveredOrders = data.orders.filter((order) => order.delivered);

    let count = [];
    for (const order of deliveredOrders) {
        count[order.product] = (count[order.product] || 0) + 1;
    }

    let orders = [];
    let result = [];
    for (const product in count) {
        orders.push({ product: product, count: count[product] });
    }

    orders = orders.sort((a, b) => b.count - a.count);

    for (const order of orders) {
        result.push(`${order.product} - ${order.count}`);
    }

    return result;
}
