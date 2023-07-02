import React, { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import classes from "./forgotPassword.module.css";

const ForgotPassword = () => {
  const emailRef = useRef();

  const passwordHandler = (event) => {
    event.preventDefault();
    const inputEmail = emailRef.current.value;
    const userDetails = {
      email: inputEmail,
    };
    fetch("http://3.110.49.218:5000/password/forgotpassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    })
      .then((response) => {
        if (response.status === 202) {
          return response.json();
        } else {
          throw new Error("Something went wrong!!!");
        }
      })
      .then((data) => {
        alert(data.message);
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div className={classes.container} onSubmit={passwordHandler}>
      <Form className={classes.form}>
        <label className={classes.label}>Email:</label>
        <input type="email" className={classes.input} ref={emailRef} />

        <Button variant="dark" className={classes.button} type="submit">
          Send Mail
        </Button>
      </Form>
    </div>
  );
};

export default ForgotPassword;
