import Reservation from "../models/Reservation.js";

// POST /api/reservations
export const createReservation = async (req, res) => {
  try {
    const { name, email, phone, date, time, guests, occasion, requests } = req.body;

    if (!name || !email || !phone || !date || !time) {
      return res.status(400).json({ message: "Please fill in all required fields" });
    }

    const reservation = await Reservation.create({
      name, email, phone, date, time, guests, occasion, requests,
    });

    res.status(201).json(reservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/reservations  (admin use)
export const getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({}).sort({ createdAt: -1 });
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/reservations/:id/status  (admin use)
export const updateReservationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) return res.status(404).json({ message: "Reservation not found" });

    reservation.status = status;
    await reservation.save();

    res.json(reservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
