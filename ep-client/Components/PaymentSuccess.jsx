import Google from "./Google";

const PaymentSuccess = () => {
  return (
    <div className="payment-success">
      <p>
        Payment complete! Click the google button to add this event(s) to your
        google calendar
      </p>
      <Google />
    </div>
  );
};

export default PaymentSuccess;
