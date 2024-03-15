import connectDB from '@/config/database';
import Booking from '@/models/Bookings';
import Payment from '@/models/Payments';
import { getSessionUser } from '@/utils/getSessionUser';

export const dynamic = 'force-dynamic';

// GET /api/bookings/payment
export const GET = async (request) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response('User ID is required', { status: 401 });
    }

    const { userId } = sessionUser;

    const payments = await Payment.find({ user_id: userId })
      .populate('booking_id')
      .populate('user_id');

    return new Response(JSON.stringify(payments), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};

// POST /api/bookings/payment
export const POST = async (request) => {
  try {
    await connectDB();

    const { amount, phone_number, booking_id } = await request.json();
    console.log('amount', amount);
    console.log('phone_number', phone_number);
    console.log('booking_id', booking_id);

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response('User ID is required', { status: 401 });
    }

    const { userId } = sessionUser;

    const payload = JSON.stringify({
      BusinessShortCode: '174379',
      Msisdn: `254${parseInt(phone_number)}`,
      Amount: amount,
    });

    const res = await fetch(
      'https://node-payment-simulation.onrender.com/api/v1/payments/stkpush',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.MPESA_ACCESS_TOKEN}`,
        },
        body: payload,
      }
    );

    if (!res.ok) {
      return new Response('Payment failed', { status: 400 });
    } else { 

    
    

    const data = await res.json();

    
    const payment = new Payment({
      user_id: userId,
      booking_id,
      transaction_id: data,
      transaction_amount: amount,
      currency: 'KES',
      payment_gateway: 'Mpesa',
      status: 'successful',
    });

    await payment.save();

    // Update booking id status to paid
    await Booking.findByIdAndUpdate(
      { _id: booking_id },
      { $set: { status: 'paid' } },
      { new: true }
    );


    return new Response('Payment created successfully', { status: 201 });
    }
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};
