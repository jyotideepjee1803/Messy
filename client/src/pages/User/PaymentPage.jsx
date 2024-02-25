import { useLocation } from "react-router-dom";
import axios, { getAxiosConfig } from '../../utils/axios';

export const PaymentPage = () => {
  const { state } = useLocation();

    // Access the total and selectedItems from the state
    const totalCost = state?.total;
    const selectedItems = state?.selectedItems;
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const config = getAxiosConfig({ loggedInUser });

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };
 
  const displayRazorpay = async () => {
    try {
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }

      const result = await axios.post("api/user/pay" , {totalCost , selectedItems}, config);

      // console.log(result);
      if (!result) {
        alert("Server error. Are you online?");
        return;
      }

      const { amount, id: order_id, currency } = result.data;

      const options = {
        key: "rzp_test_hWcGMj2bhItndk",
        amount: amount.toString(),
        currency: currency,
        name: "IIIT MESS.",
        description: "Test Transaction",
        order_id: order_id,
        handler: async function (response) {
          const data = {
            orderCreationId: order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };

          const result = await axios.post(
            "api/pay/success",
            data
          );

          alert(result.data.msg);
        },
        prefill: {
          name: "Soumya Dey",
          email: "SoumyaDey@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Soumya Dey Corporate Office",
        },
        theme: {
          color: "#61dafb",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
  <h2>Your Page</h2>
  <p>Total Cost: ₹{totalCost}</p>
  <button onClick={displayRazorpay}>Pay ₹{totalCost}</button>
</div>

  );
};


