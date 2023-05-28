import React from "react";
import imageurl from "../images/tracker.png";

import classes from "./Home.module.css";

const Home = () => {
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
