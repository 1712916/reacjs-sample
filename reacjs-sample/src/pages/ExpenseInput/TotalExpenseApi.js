import axios from "axios";
import { API_URL, getResponseData, getToken } from "../../api/ApiUtils.js";
import {
  dateFormatPattern,
  getStartAndEndOfCurrentMonth,
  getStartAndEndOfLastMonth,
} from "../../utils/date_utils.js";

//format date: yyyy-mm-dd
//ex: 2024-04-30
function callGetTotalExpenseFromDateToDate(fromDate, toDate) {
  const headers = {
    Authorization: ` Bearer ${getToken()}`,
    "Content-Type": "application/json",
  };
  return axios.get(
    `${API_URL}/expenses/total?fromDate=${fromDate}&toDate=${toDate}`,
    { headers }
  );
}

export function callGetTotalExpenseOfCurrentMonth(onSuccess, onError, onDone) {
  var [fromDate, toDate] = getStartAndEndOfCurrentMonth();

  callGetTotalExpenseFromDateToDate(
    fromDate.format(dateFormatPattern),
    toDate.format(dateFormatPattern)
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
}

export function callGetTotalExpenseOfLastMonth(onSuccess, onError, onDone) {
  var [fromDate, toDate] = getStartAndEndOfLastMonth();

  callGetTotalExpenseFromDateToDate(
    fromDate.format(dateFormatPattern),
    toDate.format(dateFormatPattern)
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
}

//from date to date
//example response:
// {
//     "data": [
//         {
//             "date": "2024-03-28T00:00:00",
//             "amount": 16000.0
//         },
//         {
//             "date": "2024-03-29T00:00:00",
//             "amount": 15000.0
//         }
//     ],
//     "message": "Success",
//     "status": 200
// }

export function callGetListTotalExpenseFromDateToDate(
  fromDate,
  toDate,
  onSuccess,
  onError,
  onDone
) {
  const headers = {
    Authorization: ` Bearer ${getToken()}`,
    "Content-Type": "application/json",
  };
  axios
    .get(
      `${API_URL}/expenses/total-list?fromDate=${fromDate}&toDate=${toDate}`,
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
