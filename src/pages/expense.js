import React, { useEffect, useRef, useState } from "react";
import { Button, Container, Form, Pagination } from "react-bootstrap";
import classes from "./expense.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  delExpense,
  getExpense,
  getToken,
  parseJwt,
  postExpense,
} from "../store/fetchRequests";
import LeaderBoard from "./LeaderBoard";
import axios from "axios";
import { useNavigate, useRouteLoaderData } from "react-router-dom";

const Expenses = () => {
  const navigate = useNavigate();
  const categoryRef = useRef();
  const descRef = useRef();
  const amountRef = useRef();
  const dispatch = useDispatch();
  const token = useRouteLoaderData("token");
  const tokenBody = parseJwt(token);
  const [isPremium, setisPremium] = useState(tokenBody.isPremium);
  let expenses = useSelector((state) => state.pageReducer.pageData.expenses);
  const pagedata = useSelector((state) => state.pageReducer.pageData);

  let pages = [];
  console.log(expenses);
  if (expenses == undefined) {
    expenses = [];
  }
  if (pagedata.last_page > 1) {
    for (let i = 1; i <= pagedata.last_page; i++) {
      pages.push(i);
    }
  }

  console.log(pages);

  useEffect(() => {
    dispatch(getExpense());
  }, []);

  const deleteHandler = (id) => {
    dispatch(delExpense(id));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const inputCategory = categoryRef.current.value;
    const inputDesc = descRef.current.value;
    const inputAmount = +amountRef.current.value;

    const expense = {
      amount: inputAmount,
      description: inputDesc,
      category: inputCategory,
    };

    dispatch(postExpense(expense));

    categoryRef.current.value = "";
    descRef.current.value = "";
    amountRef.current.value = "";
  };

  const premiumHandler = async (event) => {
    const token = getToken();
    const response = await fetch(
      "http://3.110.49.218:5000/purchase/premiummembership",
      { headers: { Authorization: token } }
    );
    console.log(response);
    const data = await response.json();
    console.log(data);
    var options = {
      key: data.key_id,
      order_id: data.order.id,
      handler: async function (response) {
        console.log(response);
        const res = await fetch(
          "http://3.110.49.218:5000/purchase/updatetransactionstatus",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
            body: JSON.stringify({
              order_id: options.order_id,
              payment_id: response.razorpay_payment_id,
            }),
          }
        );
        alert("You are a Premium User Now");
        const data = await res.json();
        localStorage.setItem("token", data.token);
        const premiumToken = getToken();
        const tokenBody = parseJwt(premiumToken);
        setisPremium(tokenBody.isPremium);
      },
    };
    const rzp1 = new Razorpay(options);
    rzp1.open();
    event.preventDefault();

    rzp1.on("payment.failed", function (response) {
      alert("Something went wrong!");
    });
  };

  const pageHandler = (page) => {
    dispatch(getExpense(page));
  };

  return (
    <React.Fragment>
      {isPremium && <LeaderBoard />}
      <h5 className={classes.subscription}>
        User Subscription: {isPremium ? "Premium" : "Normal"}
      </h5>
      <div className={classes.container}>
        <h1 className={classes.heading}>Add Expense</h1>
        <Form className={classes.form} onSubmit={submitHandler}>
          <Form.Label className={classes.label}>Amount:</Form.Label>
          <Form.Control
            type="number"
            min="0"
            className={classes.input}
            ref={amountRef}
          />

          <Form.Label className={classes.label}>Description:</Form.Label>
          <Form.Control type="text" className={classes.input} ref={descRef} />

          <Form.Label className={classes.label}>Category:</Form.Label>
          <Form.Select ref={categoryRef}>
            <option>Select Category</option>
            <option value="food">Food</option>
            <option value="travel">Travel</option>
            <option value="health">Health</option>
          </Form.Select>

          <Button variant="dark" className={classes.button} type="submit">
            Submit
          </Button>
        </Form>
      </div>

      <div className={classes.premiumButton}>
        <Button variant="info" onClick={premiumHandler} hidden={isPremium}>
          Become a Premium User
        </Button>
      </div>

      {expenses && (
        <div className={classes.expensesContainer}>
          <ul className={classes.listItems}>
            {expenses.map((expense) => (
              <div key={expense.id}>
                <li className={classes.listItem}>
                  <div>
                    <div className={classes.category}>{expense.category}</div>
                    <span className={classes.spanele}>
                      &#8377;{`${expense.amount}`}
                    </span>
                    <span className={classes.spanele}>
                      {`description: ${expense.description}`}
                    </span>
                  </div>

                  <div>
                    <Button
                      variant="danger"
                      size="sm"
                      className={classes.expButton}
                      onClick={() => deleteHandler(expense.id)}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="dark"
                      size="sm"
                      className={classes.expButton}
                    >
                      Edit
                    </Button>
                  </div>
                </li>
                <hr />
              </div>
            ))}
          </ul>
        </div>
      )}

      {pages.length > 1 && (
        <div className={classes.pagination}>
          <Pagination>
            <Pagination.First
              onClick={() => pageHandler(pagedata.first_page)}
            />
            {pages.map((page) => (
              <Pagination.Item onClick={() => pageHandler(page)} key={page}>
                {page}
              </Pagination.Item>
            ))}
            <Pagination.Last onClick={() => pageHandler(pagedata.last_page)} />
          </Pagination>
        </div>
      )}
    </React.Fragment>
  );
};

export default Expenses;
