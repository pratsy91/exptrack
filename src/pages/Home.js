import React, { useEffect } from "react";
import imageurl from "../images/tracker.png";

import classes from "./Home.module.css";
import { useDispatch } from "react-redux";
import { getuser } from "../store/fetchRequests";
import { premiumActions } from "../store/premiumslice";

const Home = () => {
      const dispatch = useDispatch();
    useEffect(()=>{
      const bool = localStorage.getItem("isPremium")==="true";
      dispatch(premiumActions.setPremium({bool}))
    })
  
  return (
    <React.Fragment>
      <div className={classes.homeLogo}>
        <img
          src={imageurl}
          alt="expense tracker image"
          width="200px"
          heigh="200px"
        />
        <h1>Welcome to Expense Tracker</h1>
      </div>
    </React.Fragment>
  );
};

export default Home;
