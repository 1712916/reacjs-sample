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
