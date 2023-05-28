import React from "react";
import classes from "./Auth.module.css";
import { Button, Form } from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";

const Auth = () => {
  let [searchParams] = useSearchParams();

  const islogin = searchParams.get("mode") === "login";

  return (
    <React.Fragment>
      <h1 className={classes.heading}>
        {islogin ? "Login to Continue" : "Signup to Register"}
      </h1>

      <div className={classes.container}>
        <Form className={classes.form}>
          <Form.Label className={classes.label}>Email:</Form.Label>
          <Form.Control type="email" className={classes.input} />

          <Form.Label className={classes.label}>Password:</Form.Label>
          <Form.Control type="password" className={classes.input} />

          <Button variant="dark" className={classes.button}>
            {islogin ? "Login" : "Signup"}
          </Button>
        </Form>
      </div>
      <div className={classes.heading}>
        {islogin && (
          <Link to="/forget-password" className={classes.link}>
            <Button variant="danger">Forgot Password? </Button>
          </Link>
        )}
      </div>

      <h5 className={classes.heading}>
        {islogin ? "Don't have an Account?" : "Already have an Account?"}
        <Link
          className={classes.link}
          to={`?mode=${islogin ? "signup" : "login"}`}
        >
          {islogin ? "Signup" : "Login"}
        </Link>
      </h5>
    </React.Fragment>
  );
};

export default Auth;
