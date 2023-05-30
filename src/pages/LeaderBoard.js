import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

import classes from "./LeaderBoard.module.css"
import { getLeaders, getToken } from '../store/fetchRequests';
import { useDispatch, useSelector } from 'react-redux';

const LeaderBoard = () => {
  const dispatch = useDispatch();
  const leaders = useSelector(state=>state.leadersReducer.leaders);
  const [show,setShow] = useState(false);

  const boardHandler=async ()=>{
       dispatch(getLeaders());
       setShow(prev=>!prev);
  }
  return ( 
    <React.Fragment>
    <Button variant='dark' onClick={boardHandler} className={classes.button}>View LeaderBoard</Button>
    {show && <div className={classes.leadersContainer}> 
    <ol className={classes.listItems}>
      {leaders.map((leader) => (
        <div key={leader.id}>
          <li className={classes.listItem} >
            <div className={classes.spanItem}>
              <span>{leader.name}</span>
            <span>{leader.total_amount}</span>
            </div>  
          </li>
        </div>
      ))}
    </ol>
  </div>}
  </React.Fragment>
   );
}
 
export default LeaderBoard;