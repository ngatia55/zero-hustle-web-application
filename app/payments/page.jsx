'use client';

import React, { useState, useEffect } from 'react';

const PaymentPage = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      const res = await fetch('/api/bookings/payment');
      const data = await res.json();
      setPayments(data);
    };

    fetchPayments();
  }, []);

  return (
    <section className='bg-blue-50'>
      <div className='container m-auto py-24'>
        <div className='bg-white px-6 py-8 mb-4 shadow-sm rounded-md border m-4 md:m-0'>
          {payments?.length > 0 ? (
            <div className='flex justify-center mt-8 overflow-hidden overflow-y-scroll'>
              <div className='max-w-7xl overflow-hidden mb-8'>
                <div className='w-full overflow-x-auto no-scrollbar'>
                  <table className='w-full whitespace-nowrap'>
                    <thead className='text-xs font-semibold tracking-wide text-left text-gray-500 capitalize border-b border-gray-200  bg-gray-100'>
                      <tr>
                        <td className='px-4 py-3'>Transaction ID</td>
                        <td className='px-4 py-3'>Customer Name</td>
                        <td className='px-4 py-3'>Payment Phone</td>
                        <td className='px-4 py-3'>Paybill</td>
                        <td className='px-4 py-3'>Expected Amount</td>
                        <td className='px-4 py-3'>Amount Paid</td>
                        <td className='px-4 py-3'>Date</td>
                        <td className='px-4 py-3'>Status</td>
                      </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-100 text-gray-700'>
                      {payments?.map((payment) => {
                        const {
                          _id,
                          user_id,
                          booking_id,
                          transaction_amount,
                          status,
                          createdAt,
                        } = payment;

                        return (
                          <tr key={_id} role='button'>
                            <td className='px-4 py-3'>
                              <span className='text-sm'>{_id}</span>
                            </td>
                            <td className='px-4 py-3'>
                              <span className='text-sm'>
                                {user_id?.username}
                              </span>
                            </td>
                            <td className='px-4 py-3'>
                              <span className='text-sm'>
                                {booking_id?.phone_number}
                              </span>
                            </td>
                            <td className='px-4 py-3'>
                              <span className='text-sm'>174379</span>
                            </td>
                            <td className='px-4 py-3'>
                              <span className='text-sm'>
                                {formatter.format(booking_id?.total)}
                              </span>
                            </td>
                            <td className='px-4 py-3'>
                              <span className='text-sm'>
                                {formatter.format(transaction_amount)}
                              </span>
                            </td>
                            <td className='px-4 py-3'>
                              <span className='text-sm'>
                                {new Date(createdAt).toDateString()}
                              </span>
                            </td>
                            <td className='px-4 py-3'>
                              <span
                                className={
                                  status === 'successful'
                                    ? 'text-sm text-green-500'
                                    : status === 'failed'
                                    ? 'text-sm text-gray-500'
                                    : 'text-sm text-red-500'
                                }
                              >
                                {status}
                              </span>
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
              <h3>You have no payments</h3>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PaymentPage;

const formatter = new Intl.NumberFormat('en-KE', {
  style: 'currency',
  currency: 'KES',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const payments = [
  {
    id: '5f43a7f5b8e7f5f8b8e7f5f8',
    BusinessShortCode: '174379',
    Msisdn: '254708374149',
    Amount: 1000,
    date: '2020-08-24T14:15:22.000Z',
    status: 'Paid',
    client: {
      name: 'John Doe',
    },
    appointment: {
      barber: {
        name: 'John Doe',
      },
      service: 'Haircut',
    },
  },
];
