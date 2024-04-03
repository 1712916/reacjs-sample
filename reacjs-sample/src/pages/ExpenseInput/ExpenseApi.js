import axios from "axios";
import { API_URL, getResponseData, getToken } from "../../api/ApiUtils.js";

export function callSubmitExpense(expense, onSuccess, onError, onDone) {
  //data sample:
  // {
  //     "amount": 4200000.0,
  //     "type": 0,
  //     "category": {
  //     "id": "bd8b3a34-3d0a-4c24-a79e-77d353261e26",
  //         "name": "Ăn sáng",
  //         "type": 0
  // },
  //     "description": "Lunch",
  //     "source": {
  //     "id": "10faa514-f9ac-41f3-9eba-a4e28fc346b4",
  //         "name": "TP Bank"
  // },
  //     "date": "2024-01-31T16:23:02"
  // }
  const headers = {
    Authorization: ` Bearer ${getToken()}`,
    "Content-Type": "application/json",
  };
  axios
    .post(
      `${API_URL}/expenses`,
      {
        amount: expense.amount,
        type: expense.type,
        category: expense.category,
        description: expense.description,
        source: expense.source,
        date: expense.date,
      },
      { headers }
    )
    .then((res) => {
      var [data, message, status] = getResponseData(res.data);

      if (status === 201) {
        onSuccess(data);
      } else {
        onError(message);
      }
    })
    .catch((err) => {
      onError(err.data);
    })
    .finally(onDone);
}

export function callUpdateExpense(expense, onSuccess, onError, onDone) {
  //data sample:
  // {
  //     "amount": 4200000.0,
  //     "type": 0,
  //     "category": {
  //     "id": "bd8b3a34-3d0a-4c24-a79e-77d353261e26",
  //         "name": "Ăn sáng",
  //         "type": 0
  // },
  //     "description": "Lunch",
  //     "source": {
  //     "id": "10faa514-f9ac-41f3-9eba-a4e28fc346b4",
  //         "name": "TP Bank"
  // },
  //     "date": "2024-01-31T16:23:02"
  // }
  const headers = {
    Authorization: ` Bearer ${getToken()}`,
    "Content-Type": "application/json",
  };
  axios
    .put(
      `${API_URL}/expenses`,
      {
        id: expense.id,
        amount: expense.amount,
        type: expense.type,
        category: expense.category,
        description: expense.description,
        source: expense.source,
        date: expense.date,
      },
      { headers }
    )
    .then((res) => {
      var [data, message, status] = getResponseData(res.data);

      if (status === 200) {
        onSuccess(data);
      } else {
        onError(message);
      }
    })
    .catch((err) => {
      onError(err.data);
    })
    .finally(onDone);
}

export function callGetExpenseList(onSuccess, onError, onDone) {
  const headers = {
    Authorization: ` Bearer ${getToken()}`,
    "Content-Type": "application/json",
  };
  axios
    .get(`${API_URL}/expenses`, { headers })
    .then((res) => {
      var [data, message, status] = getResponseData(res.data);

      if (status === 200) {
        onSuccess(data);
      }
    })
    .catch((err) => {
      onError(err.data);
    })
    .finally(onDone);
}

export function callGetTodayExpenseList(date, onSuccess, onError, onDone) {
  const headers = {
    Authorization: ` Bearer ${getToken()}`,
    "Content-Type": "application/json",
  };
  axios
    .get(`${API_URL}/expenses/date/${date.format("YYYY-MM-DD")}`, { headers })
    .then((res) => {
      var [data, message, status] = getResponseData(res.data);

      if (status === 200) {
        onSuccess(data);
      }
    })
    .catch((err) => {
      onError(err.data);
    })
    .finally(onDone);
}

export function callDeleteExpense(expense, onSuccess, onError, onDone) {
  const headers = {
    Authorization: ` Bearer ${getToken()}`,
    "Content-Type": "application/json",
  };
  axios
    .delete(`${API_URL}/expenses/${expense.id}`, { headers })
    .then((res) => {
      var [data, message, status] = getResponseData(res.data);

      if (status === 200) {
        onSuccess(data);
      }
    })
    .catch((err) => {
      onError(err.data);
    })
    .finally(onDone);
}
