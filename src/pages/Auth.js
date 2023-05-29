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
import useFetch from "../store/fetchHook";
import { Form } from "react-router-dom";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const { post } = useFetch("http://localhost:5000/user");
  // const emailRef = useRef();
  // const passRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useRouteLoaderData("token");
  const islogin = searchParams.get("mode") === "login";
  // const isLoggedin = useSelector((state) => state.authReducer.isLoggedin);
  // const isSignedup = useSelector((state) => state.authReducer.isSignedup);

  // const submitHandler = (event) => {
  //   event.preventDefault();
  //   const emailInput = emailRef.current.value;
  //   const passInput = passRef.current.value;
  //   if (islogin) {
  //     post("/login", { email: emailInput, password: passInput }).then(
  //       (data) => {
  //         const token = data.token;
  //         localStorage.setItem("token", token);
  //       }
  //     );
  //   } else {
  //   }
  // };

  return (
    <React.Fragment>
      <h1 className={classes.heading}>
        {islogin ? "Login to Continue" : "Signup to Register"}
      </h1>

      <div className={classes.container}>
        <Form className={classes.form} method="POST">
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
    email: formData.get("email"),
    password: formData.get("password"),
  };

  let url = "";

  if (mode === "login") {
    url = "http://localhost:5000/user/login";
  } else {
    url = "http://localhost:5000/user/signup";
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: user.email,
      password: user.password,
    }),
  });
  const data = await response.json();
  const token = data.token;
  localStorage.setItem("token", token);
  if (mode === "login") {
    return redirect("/");
  } else {
    return redirect("/auth?mode=login");
  }
}
