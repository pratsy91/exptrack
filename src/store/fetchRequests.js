import { redirect } from "react-router-dom";
import { expenseActions } from "./expenseSlice";
import { authActions } from "./AuthSlice";

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
      const response = await fetch(
        "http://localhost:5000/expense/add-expense",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
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
        console.log(data.expense);
        dispatch(getExpense());
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getExpense = (expense) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch("http://localhost:5000/expense/get-expense");
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
      const response = await fetch(
        `http://localhost:5000/expense/del-expense/${id}`
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

// export const signUp = (email, password) => {
//   return async (dispatch) => {
//     const sendRequest = async () => {
//       const response = await fetch("http://localhost:5000/user/signup", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       });
//       return response;
//     };
//     try {
//       const response = await sendRequest();
//       if (response.ok) {
//         const data = await response.json();
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };

// export const logIn = (email, password) => {
//   return async (dispatch) => {
//     const sendRequest = async () => {
//       const response = await fetch("http://localhost:5000/user/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       });
//       return response;
//     };
//     try {
//       const response = await sendRequest();
//       if (response.ok) {
//         const data = await response.json();
//         const token = data.token;
//         localStorage.setItem("token", data.token);
//         dispatch(authActions.logIn());
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };
