import React, { useEffect, useRef } from "react";
import { Button, Container, Form } from "react-bootstrap";
import classes from "./expense.module.css";
import { useDispatch, useSelector } from "react-redux";
import { delExpense, getExpense, postExpense } from "../store/fetchRequests";

const Expenses = () => {
  const categoryRef = useRef();
  const descRef = useRef();
  const amountRef = useRef();
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenseReducer.expenses);

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
    console.log(expense);

    dispatch(postExpense(expense));

    categoryRef.current.value = "";
    descRef.current.value = "";
    amountRef.current.value = "";
  };
  const dummyExpense = [
    {
      amount: "44",
      description: "Suez",
      category: "Fuel",
    },
    {
      amount: "24",
      description: "Los",
      category: "Food",
    },
  ];

  return (
    <React.Fragment>
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

      <div className={classes.expensesContainer}>
        <ul className={classes.listItems}>
          {expenses.map((expense) => (
            <div>
              <li className={classes.listItem} key={expense.id}>
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
    </React.Fragment>
  );
};

export default Expenses;
