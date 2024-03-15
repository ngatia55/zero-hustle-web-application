'use client';

import React, { useState } from 'react';
import { toast } from 'react-toastify';

const PaymentModal = ({ bookingId, isVisible, onClose }) => {
  if (!isVisible) return null;

  const [fields, setFields] = useState({
    booking_id: bookingId,
    phone_number: '',
    amount: '',
  });

  const handleClose = (e) => {
    if (e.target.id === 'payment-wrapper') onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Not nested
    setFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/bookings/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fields),
    });

    if (res.ok) {
      toast.success('Payment successful.');
      onClose();
    }
  };

  return (
    <div
      className='z-20 fixed inset-0 bg-black-600 bg-opacity-20 flex justify-center items-end sm:items-center px-7'
      onClick={handleClose}
      id='payment-wrapper'
    >
      <div className='w-[500px] min-h-[35.625rem]'>
        <div className='bg-white p-2 rounded-md shadow-xl h-full'>
          <div className='flex justify-end px-4 py-2'>
            <button
              onClick={onClose}
              className='p-2 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none'
            >
              <svg
                fill='none'
                className='h-6'
                stroke='currentColor'
                strokeWidth={1.5}
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          </div>
          <div className='px-7'>
            <div className='mb-2'>
              <h2 className='text-2xl font-medium'>
                Pay for your Hotel Booking{' '}
              </h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div className='my-4'>
                <label className='block text-gray-700 font-bold mb-2'>
                  Phone number
                </label>
                <input
                  type='number'
                  id='phone_number'
                  name='phone_number'
                  className='border rounded w-full py-2 px-3 mb-2'
                  placeholder='e.g. 0712345678'
                  required
                  value={fields.phone_number}
                  onChange={handleChange}
                />
              </div>
              <div className='my-4'>
                <label className='block text-gray-700 font-bold mb-2'>
                  Amount
                </label>
                <input
                  type='text'
                  id='amount'
                  name='amount'
                  className='border rounded w-full py-2 px-3 mb-2'
                  placeholder='e.g. 1000'
                  required
                  value={fields.amount}
                  onChange={handleChange}
                />
              </div>
              <div className='mb-8'>
                <button
                  className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'
                  type='submit'
                >
                  Pay Now
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
