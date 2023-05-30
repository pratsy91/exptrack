import React, { useRef } from "react";
import classes from "./Auth.module.css";
import { Button } from "react-bootstrap";
import {
  Link,
  redirect,
  useNavigate,
  useRouteLoaderData,
  useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logIn, signUp } from "../store/fetchRequests";
import { Form } from "react-router-dom";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useRouteLoaderData("token");
  const islogin = searchParams.get("mode") === "login";

  return (
    <React.Fragment>
      <h1 className={classes.heading}>
        {islogin ? "Login to Continue" : "Signup to Register"}
      </h1>

      <div className={classes.container}>
        <Form className={classes.form} method="POST">
          <label className={classes.label}>Name:</label>
          <input type="name" className={classes.input} name="name" />

          <label className={classes.label}>Email:</label>
          <input type="email" className={classes.input} name="email" />

          <label className={classes.label}>Password:</label>
          <input type="password" className={classes.input} name="password" />

          <Button variant="dark" className={classes.button} type="submit">
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

export async function authAction({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode");
  const formData = await request.formData();
  const user = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  let url = "";

  if (mode === "login") {
    url = "http://localhost:5000/user/login";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: user.name,
        email: user.email,
        password: user.password,
      }),
    });
    const data = await response.json();
    const token = data.token;
  if(data.user){
    let isPremium = data.user.ispremiumuser;
  localStorage.setItem("isPremium", isPremium);
  }
  localStorage.setItem("token", token);
  return redirect("/");
  } else {
    url = "http://localhost:5000/user/signup";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: user.name,
        email: user.email,
        password: user.password,
      }),
    });
    const data = await response.json();
    return redirect("/auth?mode=login");
  }

}
