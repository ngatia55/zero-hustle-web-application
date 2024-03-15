'use client';
import React, { useState, useEffect } from 'react';
import PaymentModal from '@/components/PaymentModal';

const BookingPage = () => {
  const [bookings, setBookings] = useState([]);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      const res = await fetch('/api/bookings');
      const data = await res.json();
      setBookings(data);
    };

    fetchBookings();
  }, []);

  const handleDialog = (booking) => {
    setSelectedBooking(booking._id);
    setShowPayment(!showPayment);
  };

  return (
    <section className='bg-blue-50'>
      <div className='container m-auto py-24'>
        <div className='bg-white px-6 py-8 mb-4 shadow-sm rounded-md border m-4 md:m-0'>
          {bookings?.length > 0 ? (
            <div className='flex justify-center mt-8 overflow-hidden overflow-y-scroll'>
              <div className='max-w-7xl overflow-hidden mb-8'>
                <div className='w-full overflow-x-auto no-scrollbar'>
                  <table className='w-full whitespace-nowrap'>
                    <thead className='text-xs font-semibold tracking-wide text-left text-gray-500 capitalize border-b border-gray-200  bg-gray-100'>
                      <tr>
                        <td className='px-4 py-3'>Booking ID</td>
                        <td className='px-4 py-3'>Guest Name</td>
                        <td className='px-4 py-3'>Payment Phone</td>
                        <td className='px-4 py-3'>Paybill</td>
                        <td className='px-4 py-3'>Hotel Booked</td>
                        <td className='px-4 py-3'>Total Amount Paid</td>
                        <td className='px-4 py-3'>Check in date</td>
                        <td className='px-4 py-3'>Check out date</td>
                        <td className='px-4 py-3'>No. of Guests</td>
                        <td className='px-4 py-3'>Booking Date</td>
                        <td className='px-4 py-3'>Status</td>
                        <td className='px-4 py-3'>Action</td>
                      </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-100 text-gray-700'>
                      {bookings?.map((booking) => {
                        const {
                          _id,
                          phone_number,
                          check_in,
                          check_out,
                          hotel_id,
                          user_id,
                          total,
                          guests,
                          status,
                          createdAt,
                        } = booking;

                        return (
                          <tr key={_id} role='button'>
                            <td className='px-4 py-3'>
                              <span className='text-sm'>{_id}</span>
                            </td>
                            <td className='px-4 py-3'>
                              <span className='text-sm'>
                                {user_id.username}
                              </span>
                            </td>
                            <td className='px-4 py-3'>
                              <span className='text-sm'>{phone_number}</span>
                            </td>
                            <td className='px-4 py-3'>
                              <span className='text-sm'>174379</span>
                            </td>
                            <td className='px-4 py-3'>
                              <span className='text-sm'>{hotel_id.name}</span>
                            </td>
                            <td className='px-4 py-3'>
                              <span className='text-sm'>
                                {formatter.format(total)}
                              </span>
                            </td>
                            <td className='px-4 py-3'>
                              <span className='text-sm'>
                                {new Date(check_in).toDateString()}
                              </span>
                            </td>
                            <td className='px-4 py-3'>
                              <span className='text-sm'>
                                {new Date(check_out).toDateString()}
                              </span>
                            </td>
                            <td className='px-4 py-3'>
                              <span className='text-sm'>{guests}</span>
                            </td>

                            <td className='px-4 py-3'>
                              <span className='text-sm'>
                                {new Date(createdAt).toDateString()}
                              </span>
                            </td>
                            <td className='px-4 py-3'>
                              <span
                                className={
                                  status === 'paid'
                                    ? 'text-sm text-green-500'
                                    : status === 'refund'
                                    ? 'text-sm text-gray-500'
                                    : 'text-sm text-red-500'
                                }
                              >
                                {status}
                              </span>
                            </td>
                            <td className='px-4 py-3'>
                              <button
                                onClick={() => handleDialog(booking)}
                                className='mt-6 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'
                              >
                                Pay now
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className='px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-white text-gray-500 dark:text-gray-400 dark:bg-gray-800'>
                  <div className='flex flex-col justify-between text-xs sm:flex-row text-gray-600 dark:text-gray-400'>
                    <span className='flex items-center font-semibold tracking-wide uppercase'>
                      Showing 1-5 of 25
                    </span>
                    <div className='flex mt-2 sm:mt-auto sm:justify-end'></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className='flex justify-center mt-32'>
              <h3>You have no bookings available</h3>
            </div>
          )}
        </div>
      </div>
      <PaymentModal
        bookingId={selectedBooking}
        isVisible={showPayment}
        onClose={() => setShowPayment(false)}
      />
    </section>
  );
};

export default BookingPage;

const formatter = new Intl.NumberFormat('en-KE', {
  style: 'currency',
  currency: 'KES',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
