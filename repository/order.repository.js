import fs from 'fs';

global.filename = 'order.json';
const order = fs.readFileSync(filename, 'utf-8');
const data = JSON.parse(order);

function getOrders() {
    return data.orders;
}

function getOrder(id) {
    return data.orders[id];
}

function createOrder(body) {
    let newOrder;
    newOrder = {
        id: data.nextId++,
        client: body.client,
        product: body.product,
        value: body.value,
        delivered: false,
        timestamp: new Date(),
    };

    data.orders.push(newOrder);
    fs.writeFile(
        global.filename,
        JSON.stringify(data, null, 2),
        'utf8',
        function (err) {
            if (err) {
                return console.log(err);
            }

            console.log('The file was saved!');
        }
    );

    return newOrder;
}

function updateOrder(id, body) {
    const order = data.orders.find((order) => {
        return order.id === Number(id);
    });
    if (!order) return 'order not found';

    if (!data.products.includes(body.product)) return 'this product not exist';

    order.client = body.client;
    order.product = body.product;
    order.value = body.value;
    order.delivered = body.delivered;

    fs.writeFile(
        global.filename,
        JSON.stringify(data, null, 2),
        'utf8',
        function (err) {
            if (err) {
                return console.log(err);
            }

            console.log('The file was saved!');
        }
    );

    return order;
}

function updateDelivered(id, body) {
    const order = data.orders.find((order) => {
        return order.id === Number(id);
    });
    if (!order) return 'order not found';

    order.delivered = body.delivered;

    fs.writeFile(
        global.filename,
        JSON.stringify(data, null, 2),
        'utf8',
        function (err) {
            if (err) {
                return console.log(err);
            }

            console.log('The file was saved!');
        }
    );

    return order;
}

function deleteOrder(id) {
    const idFound = data.orders.find((order) => order.id === Number(id));

    if (!idFound) return `id ${id} not found`;

    data.orders = data.orders.filter((order) => order.id !== parseInt(id));

    fs.writeFile(
        global.filename,
        JSON.stringify(data, null, 2),
        'utf8',
        function (err) {
            if (err) {
                return console.log(err);
            }

            console.log('The file was saved!');
        }
    );

    return `id ${id} deleted`;
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

export default {
    getOrders,
    createOrder,
    getOrder,
    updateOrder,
    updateDelivered,
    deleteOrder,
    findClient,
    consultOrder,
    moreOrders,
};
