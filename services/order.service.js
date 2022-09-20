import OrderRepository from '../repository/order.repository.js';

async function getOrders() {
    return await OrderRepository.getOrders();
}

async function getOrder(id) {
    return await OrderRepository.getOrder(id);
}

async function createOrder(body) {
    return await OrderRepository.createOrder(body);
}

async function updateOrder(id, body) {
    return await OrderRepository.updateOrder(id, body);
}

async function updateDelivered(id, body) {
    return await OrderRepository.updateDelivered(id, body);
}

async function deleteOrder(id) {
    return await OrderRepository.deleteOrder(id);
}

async function findClient(body) {
    return await OrderRepository.findClient(body);
}

async function consultOrder(body) {
    return await OrderRepository.consultOrder(body);
}

async function moreOrders() {
    return await OrderRepository.moreOrders();
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
