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

async function findClient(query) {
    return await OrderRepository.findClient(query);
}

async function consultOrder(query) {
    return await OrderRepository.consultOrder(query);
}

async function moreOrders() {
    return await OrderRepository.moreOrders();
}

export default {
    getOrders,
    getOrder,
    createOrder,
    updateOrder,
    updateDelivered,
    deleteOrder,
    findClient,
    consultOrder,
    moreOrders,
};
