import express from 'express'
import { createOrder,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getAllOrders} from '../controllers/orderController.js'
import {protect,admin} from '../middleware/authMiddleware.js'
const router = express.Router();
router.route('/').post(protect,createOrder).get(protect,admin,getAllOrders)
router.route('/myOrders').get(protect,getMyOrders);
router.route('/:id').get(protect,getOrderById);
router.route('/:id/pay').put(protect,updateOrderToPaid);
router.route('/:id/deliver').put(protect,admin,updateOrderToDelivered);
export default router;