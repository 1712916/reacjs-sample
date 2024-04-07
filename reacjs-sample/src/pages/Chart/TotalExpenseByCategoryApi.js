import axios from "axios";
import { API_URL, getResponseData, getToken } from "../../api/ApiUtils.js";
import {
  dateFormatPattern,
  getStartAndEndOfCurrentMonth,
  getStartAndEndOfLastMonth,
} from "../../utils/date_utils.js";

export function callGetTotalExpenseByCategory(
  startDate,
  endDate,
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
        `${API_URL}/expenses/category/total?fromDate=${startDate.format(dateFormatPattern)}&toDate=${endDate.format(dateFormatPattern)}`,
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
