import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    guests: { type: Number, required: true, default: 2 },
    occasion: { type: String, default: '' },
    requests: { type: String, default: '' },
    status: { type: String, default: 'Confirmed' },
  },
  { timestamps: true }
);

const Reservation = mongoose.model('Reservation', reservationSchema);
export default Reservation;
