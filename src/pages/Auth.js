import classes from "./Auth.module.css";

const Auth = () => {
  return (
    <div className={classes.container}>
      <h1 className={classes.heading}>Add Expense</h1>
      <Form className={classes.form}>
        <Form.Label className={classes.label}>Email:</Form.Label>
        <Form.Control type="" min="0" className={classes.input} />

        <Form.Label className={classes.label}>Password:</Form.Label>
        <Form.Control type="password" className={classes.input} />

        <Button variant="dark" className={classes.button}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Auth;
