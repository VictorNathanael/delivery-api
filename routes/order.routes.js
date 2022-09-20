import express from 'express';
import OrderController from '../controllers/order.controller.js';

const router = express.Router();

router.get('/', OrderController.getOrders);
router.post('/', OrderController.createOrder);
router.get('/:id', OrderController.getOrder);
router.put('/:id', OrderController.updateOrder);
router.put('/delivered/:id', OrderController.updateDelivered);
router.delete('/:id', OrderController.deleteOrder);
router.get('/client', OrderController.findClient);
router.get('/products', OrderController.consultOrder);
router.get('/moreOrders', OrderController.moreOrders);

router.use((err, req, res, next) => {
    console.error(`${req.method} ${req.baseUrl} - ${err.message}`);
    res.status(400).send({ error: err.message });
});

export default router;
