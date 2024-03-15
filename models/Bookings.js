import { Schema, model, models } from 'mongoose';

const BookingSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    hotel_id: {
      type: Schema.Types.ObjectId,
      ref: 'Property',
      required: true,
    },
    check_in: {
      type: Date,
      required: true,
    },
    check_out: {
      type: Date,
      required: true,
    },
    phone_number: {
      type: Number,
      required: true,
    },
    guests: {
      type: Number,
      required: false,
    },
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String, // Booking status
      enum: ['paid', 'unpaid'],
    },
  },
  {
    timestamps: true,
  }
);

const Bookings = models.Bookings || model('Bookings', BookingSchema);

export default Bookings;
