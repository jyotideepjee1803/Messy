import React from 'react';
import { useLocation } from 'react-router-dom';

export const PaymentPage = () => {
  const location = useLocation();
  const totalCost = location.state?.total || 0;

  return (
    <div>
      <h2>Payment Page</h2>
      <p>Total Cost: ${totalCost}
      </p>
      {/* Your payment page content goes here */}
    </div>
  );
};


