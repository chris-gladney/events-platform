import Account from "./Account";

const Header = ({ setBasketOpened }) => {
  return (
    <header>
      <ul className="header-list">
        <li className="header-item">
          <Account />
        </li>
        <li className="header-item">
          <a className="events-link">Events</a>
        </li>
        <li className="header-item">
          <a
            className="basket-link"
            onClick={() => {
              setBasketOpened(true);
            }}
          >
            Basket
          </a>
        </li>
      </ul>
    </header>
  );
};

export default Header;
