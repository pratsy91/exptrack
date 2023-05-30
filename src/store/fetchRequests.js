import { redirect } from "react-router-dom";
import { expenseActions } from "./expenseSlice";
import { leaderActions } from "./leaderSlice";


export function getToken() {
  const token = localStorage.getItem("token");
  return token;
}

export function tokenLoader() {
  return getToken();
}

export const postExpense = (expense) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const token= getToken();
      const response = await fetch(
        "http://localhost:5000/expense/add-expense",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": token,
          },
          body: JSON.stringify(expense),
        }
      );
      return response;
    };
    try {
      const response = await sendRequest();
      if (response.ok) {
        const data = await response.json();
        dispatch(getExpense());
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getExpense = (expense) => {
  return async (dispatch) => {
    const token = getToken();
    const sendRequest = async () => {
      const response = await fetch(
        "http://localhost:5000/expense/get-expense",
        {
          headers: {
            "Authorization": token,
          },
        }
      );
      return response;
    };
    try {
      const response = await sendRequest();
      if (response.ok) {
        const data = await response.json();
        dispatch(expenseActions.setExpense({ expenses: data.expenses }));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const delExpense = (id) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const token = getToken();
      const response = await fetch(
        `http://localhost:5000/expense/del-expense/${id}`,{
          headers:{
            "Authorization": token,
          }
        }
      );
      return response;
    };
    try {
      const response = await sendRequest();
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        dispatch(getExpense());
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getLeaders = (expense) => {
  return async (dispatch) => {
    const token = getToken();
    const sendRequest = async () => {
      const response = await fetch("http://localhost:5000/premium/showLeaderBoard",{
      headers:{
        "Authorization": token,
      }
    });
      return response;
    };
    try {
      const response = await sendRequest();
      if (response.ok) {
        const data = await response.json();
         dispatch(leaderActions.setExpense({leaders:data}));
      }
    } catch (error) {
      console.log(error);
    }
  };
};
