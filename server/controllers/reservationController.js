import asyncHandler from 'express-async-handler';
import Reservation from '../models/Reservation.js';

// @desc    Create a table reservation
// @route   POST /api/reservations
// @access  Public
export const createReservation = asyncHandler(async (req, res) => {
  const { name, email, phone, date, time } = req.body;

  if (!name || !email || !phone || !date || !time) {
    res.status(400);
    throw new Error('Please fill all required reservation fields');
  }

  const reservation = await Reservation.create(req.body);
  res.status(201).json(reservation);
});

// @desc    Get all reservations (for an admin view)
// @route   GET /api/reservations
// @access  Public
export const getReservations = asyncHandler(async (req, res) => {
  const reservations = await Reservation.find({}).sort({ createdAt: -1 });
  res.json(reservations);
});
