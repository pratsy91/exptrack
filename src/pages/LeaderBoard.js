import React from 'react';
import { Button } from 'react-bootstrap';

import classes from "./LeaderBoard.module.css"
import { getToken } from '../store/fetchRequests';

const LeaderBoard = () => {

  const boardHandler=async ()=>{
    const token= getToken();
    const res = await fetch("http://localhost:5000/premium/showLeaderBoard",{
      headers:{
        "Authorization": token,
      }
    });
    const data = await res.json();
    console.log(data);
  }
  return ( 
    <Button variant='dark' onClick={boardHandler} className={classes.button}>LeaderBoard</Button>
   );
}
 
export default LeaderBoard;