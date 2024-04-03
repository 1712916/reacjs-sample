import axios from "axios";
import { API_URL, getResponseData, getToken } from "../../api/ApiUtils.js";

export function callGetMoneySource(onSuccess, onError, onDone) {
  const headers = {
    Authorization: ` Bearer ${getToken()}`,
    "Content-Type": "application/json",
  };
  axios
    .get(`${API_URL}/money-sources`, { headers })
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

export function callAddMoneySource(item, onSuccess, onError, onDone) {
  const headers = {
    Authorization: ` Bearer ${getToken()}`,
    "Content-Type": "application/json",
  };
  axios
    .post(
      `${API_URL}/money-sources`,
      {
        name: item.name,
      },
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
}

export function callDeleteMoneySource(item, onSuccess, onError, onDone) {
  const headers = {
    Authorization: ` Bearer ${getToken()}`,
    "Content-Type": "application/json",
  };
  axios
    .delete(`${API_URL}/money-sources/${item.id}`, { headers })
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
