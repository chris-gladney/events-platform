import { useEffect } from "react";

const PaymentSuccess = ({ userEvents }) => {
  useEffect(() => {
    console.log(userEvents, "<<< userEvents")
  }, []);

  return (
    <div className="payment-success">
      <p>
        Payment complete! Click the google button to add this event(s) to your
        google calendar
      </p>
      {/* <Google userEvents={userEvents} /> */}
    </div>
  );
};

export default PaymentSuccess;
