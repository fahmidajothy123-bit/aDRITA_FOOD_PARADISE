import express from 'express';
import { createReservation, getReservations } from '../controllers/reservationController.js';

const router = express.Router();

router.route('/').post(createReservation).get(getReservations);

export default router;
