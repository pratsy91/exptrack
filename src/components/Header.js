import { Badge, Button, Nav, Navbar } from "react-bootstrap";
import classes from "./Header.module.css";
import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const loginHandler = () => {
    navigate("/auth?mode=login");
  };
  return (
    <Navbar className={classes.navbar} expand="lg" variant="dark">
      <Navbar.Brand>
        <Badge bg="info" className={classes.badge}>
          My Expense Tracker
        </Badge>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className={classes.links}>
          <NavLink to="/" className={classes.link}>
            Home
          </NavLink>
          <NavLink to="/expenses" className={classes.link}>
            Expenses
          </NavLink>
        </Nav>

        <Nav>
          <Button
            className={classes.button}
            variant="dark"
            onClick={loginHandler}
          >
            Login
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
