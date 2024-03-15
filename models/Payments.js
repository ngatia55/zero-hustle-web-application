import { Schema, model, models } from 'mongoose';

const PaymentSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    booking_id: {
      type: Schema.Types.ObjectId,
      ref: 'Bookings',
      required: true,
    },
    transaction_id: {
      type: Array,
      default: [],
    },
    transaction_amount: {
      type: Number,
      required: [true, 'transaction_amount is required'],
    },
    currency: {
      type: String,
      required: [true, 'currency is required'],
      enum: ['KES'],
    },
    payment_gateway: {
      type: String,
      required: [true, 'payment gateway is required'],
      enum: ['Mpesa'], // Payment gateway might differ as the application grows
    },
    status: {
      type: String, // Transaction status
      enum: ['successful', 'pending', 'failed'],
    },
  },
  {
    timestamps: true,
  }
);

const Payments = models.Payments || model('Payments', PaymentSchema);

export default Payments;
