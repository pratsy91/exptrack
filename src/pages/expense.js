import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import classes from "./expense.module.css";

const Expenses = () => {
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
        <Form className={classes.form}>
          <Form.Label className={classes.label}>Amount:</Form.Label>
          <Form.Control type="number" min="0" className={classes.input} />

          <Form.Label className={classes.label}>Description:</Form.Label>
          <Form.Control type="text" className={classes.input} />

          <Form.Label className={classes.label}>Category:</Form.Label>
          <Form.Control type="text" className={classes.input} />

          <Button variant="dark" className={classes.button}>
            Submit
          </Button>
        </Form>
      </div>

      <div className={classes.expensesContainer}>
        <ul className={classes.listItems}>
          {dummyExpense.map((expense) => (
            <div>
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
