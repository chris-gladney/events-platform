const Google = ({ userEvents }) => {
  
  const handleGoogleCalendar = () => {
    console.log(userEvents)
  };

  handleGoogleCalendar()

  return <button onClick={handleGoogleCalendar}>Add to google calendar</button>;
};

export default Google;
