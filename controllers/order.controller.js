import OrderService from '../services/order.service.js';

async function getOrders(req, res, next) {
    try {
        res.status(200).send(await OrderService.getOrders());
    } catch (err) {
        console.error(err);
        next(err);
    }
}

async function createOrder(req, res, next) {
    try {
        let body = req.body;
        if (!body.client || !body.product || body.value == undefined) {
            throw new Error('client, product and value are required');
        }

        res.status(200).send(await OrderService.createOrder(body));
    } catch (err) {
        console.error(err);
        next(err);
    }
}

async function getOrder(req, res, next) {
    try {
        let id = req.params.id;
        res.status(200).send(await OrderService.getOrder(id));
    } catch (err) {
        console.error(err);
        next(err);
    }
}

async function updateOrder(req, res, next) {
    try {
        let id = req.params.id;
        let body = req.body;
        if (!body.client || !body.product || body.value == undefined) {
            throw new Error('client, product and value are required');
        }
        res.status(200).send(await OrderService.updateOrder(id, body));
    } catch (err) {
        console.error(err);
        next(err);
    }
}

async function updateDelivered(req, res, next) {
    try {
        let id = req.params.id;
        let body = req.body;
        res.status(200).send(await OrderService.updateDelivered(id, body));
    } catch (err) {
        console.error(err);
        next(err);
    }
}

async function deleteOrder(req, res, next) {
    try {
        let id = req.params.id;
        res.status(200).send(await OrderService.deleteOrder(id));
    } catch (err) {
        console.error(err);
        next(err);
    }
}

async function findClient(req, res, next) {
    try {
        let body = req.body;
        res.status(200).send(await OrderService.findClient(body));
    } catch (err) {
        console.error(err);
        next(err);
    }
}

async function consultOrder(req, res, next) {
    try {
        let body = req.body;
        res.status(200).send(await OrderService.consultOrder(body));
    } catch (err) {
        console.error(err);
        next(err);
    }
}

async function moreOrders(req, res, next) {
    try {
        res.status(200).send(await OrderService.moreOrders());
    } catch (err) {
        console.error(err);
        next(err);
    }
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
