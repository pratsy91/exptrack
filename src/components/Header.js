import { Badge, Button, Nav, Navbar } from "react-bootstrap";
import classes from "./Header.module.css";
import { NavLink, useNavigate, useRouteLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const token = useRouteLoaderData("token");

  const logoutHandler = () => {
    localStorage.removeItem("token");
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
        {token && (
          <Nav className={classes.links}>
            <NavLink to="/" className={classes.link}>
              Home
            </NavLink>
            <NavLink to="/expenses" className={classes.link}>
              Expenses
            </NavLink>
          </Nav>
        )}

        <Nav className={classes.loginButton}>
          {token && (
            <Button variant="dark" onClick={logoutHandler}>
              Logout
            </Button>
          )}
          {!token && (
            <NavLink to="/auth?mode=login">
              <Button variant="dark">Login</Button>
            </NavLink>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
