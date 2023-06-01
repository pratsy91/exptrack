import { redirect } from "react-router-dom";
import { leaderActions } from "./leaderSlice";
import { pageActions } from "./pageSlice";

export function getToken() {
  const token = localStorage.getItem("token");
  return token;
}

export function tokenLoader() {
  return getToken();
}

export function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

export const postExpense = (expense) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const token = getToken();
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

export const getExpense = (page) => {
  return async (dispatch) => {
    const token = getToken();
    const sendRequest = async () => {
      const response = await fetch(
        `http://localhost:5000/expense/get-expense/?page=${page}`,
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
        console.log(data);
        dispatch(pageActions.setPageData({ pageData: data }));
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
        `http://localhost:5000/expense/del-expense/${id}`,
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
      const response = await fetch(
        "http://localhost:5000/premium/showLeaderBoard",
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
        dispatch(leaderActions.setExpense({ leaders: data }));
      }
    } catch (error) {
      console.log(error);
    }
  };
};
