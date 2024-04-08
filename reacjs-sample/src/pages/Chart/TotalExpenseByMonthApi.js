import axios from "axios";
import { API_URL, getResponseData, getToken } from "../../api/ApiUtils.js";

///response example
// {
//     "data": {
//         "month": 3,
//         "year": 2024,
//         "amount": 1.0667814E7
//     },
//     "message": "Success",
//     "status": 200
// }

export function callGetTotalExpenseByMonth(
  month,
  year,
  onSuccess,
  onError,
  onDone
) {
  const headers = {
    Authorization: ` Bearer ${getToken()}`,
    "Content-Type": "application/json",
  };
  try {
    axios
      .get(`${API_URL}/expenses/month-total?year=${year}&month=${month}`, {
        headers,
      })
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
  } catch (e) {}
}

export function callGetTotalExpenseByMonths(year, onSuccess, onError, onDone) {
  const headers = {
    Authorization: ` Bearer ${getToken()}`,
    "Content-Type": "application/json",
  };
  try {
    axios
      .get(`${API_URL}/expenses/months-total/${year}`, { headers })
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
  } catch (e) {}
}

// {
//     "data": {
//         "quarter": 2,
//         "year": 2024,
//         "amount": 455001.0
//     },
//     "message": "Success",
//     "status": 200
// }
export function callGetTotalExpenseByQuarter(
  quarter,
  year,
  onSuccess,
  onError,
  onDone
) {
  const headers = {
    Authorization: ` Bearer ${getToken()}`,
    "Content-Type": "application/json",
  };
  try {
    axios
      .get(
        `${API_URL}/expenses/quarter-total?year=${year}&quarter=${quarter}`,
        { headers }
      )
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
  } catch (e) {}
}

export function callGetTotalExpenseByQuarters(
  year,
  onSuccess,
  onError,
  onDone
) {
  const headers = {
    Authorization: ` Bearer ${getToken()}`,
    "Content-Type": "application/json",
  };
  try {
    axios
      .get(`${API_URL}/expenses/quarters-total/${year}`, { headers })
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
  } catch (e) {}
}
