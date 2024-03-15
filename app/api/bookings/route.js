import connectDB from '@/config/database';
import Booking from '@/models/Bookings';
import { getSessionUser } from '@/utils/getSessionUser';

export const dynamic = 'force-dynamic';

// GET /api/bookings
export const GET = async (request) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response('User ID is required', { status: 401 });
    }

    const { userId } = sessionUser;

    const bookings = await Booking.find({ user_id: userId })
      .populate('hotel_id')
      .populate('user_id');

    return new Response(JSON.stringify(bookings), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};

export const POST = async (request) => {
  try {
    await connectDB();

    const { amount, check_in, check_out, guests, hotel_id, phone_number } =
      await request.json();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response('User ID is required', { status: 401 });
    }

    const { userId } = sessionUser;

    const booking = new Booking({
      user_id: userId,
      hotel_id,
      check_in,
      check_out,
      phone_number,
      guests,
      total: amount,
      status: 'unpaid',
    });

    await booking.save();

    return new Response('Booking created successfully', { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};
