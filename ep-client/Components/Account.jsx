import { useContext, useState } from "react";
import { UserContext } from "../src/App";

const Account = () => {
  const { user } = useContext(UserContext);
  const [selected, setSelected] = useState(false);

  if (!selected) {
    return (
        <div>
          <img className="user-acc" src={user.image} />
        </div>
      )
  }
};

export default Account;
