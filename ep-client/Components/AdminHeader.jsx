import Model from "react-modal";
import CreateEvent from "./CreateEvent";
import { useState } from "react";

const AdminHeader = () => {
  const [makingEvent, setMakingEvent] = useState(false);

  return (
    <header>
      <ul className="header-list">
        <li className="header-item">
          <button
            className="create-event"
            onClick={() => {
              setMakingEvent(true);
            }}
          >
            Create Event
          </button>
        </li>
        <Model isOpen={makingEvent} appElement={document.getElementById("root")}>
          <CreateEvent setMakingEvent={setMakingEvent} />
        </Model>
        <li className="header-item">
          <button className="log-out">Log Out</button>
        </li>
      </ul>
    </header>
  );
};

export default AdminHeader;
