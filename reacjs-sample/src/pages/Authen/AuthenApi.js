import axios from "axios";
import { API_URL, getResponseData, getToken } from "../../api/ApiUtils";
import async from "async";
import { delay } from "../../utils/delay";

export async function callLogin(account, password, onSuccess, onError) {
  // Handle login logic here
  const headers = {
    "Content-Type": "application/json",
  };

  return axios
    .post(
      `${API_URL}/login`,
      {
        account: account,
        password: password,
      },
      { headers }
    )
    .then((response) => {
      console.log(response);
      if (response.status === 200) {
        let token = response.data["data"]["token"];
        onSuccess(token);
      } else {
        onError(`Login failed: ${response.data.message}`);
      }
    })
    .catch((error) => {
      console.log(error);
      onError(`Login failed: ${error.message}`);
    });
}

//create call register function
export async function callRegister(
  account,
  password,
  email,
  onSuccess,
  onError
) {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios
    .post(
      `${API_URL}/register`,
      {
        account: account,
        password: password,
        email: email,
      },
      { headers }
    )
    .then((response) => {
      console.log(response);
      if (response.status === 200) {
        onSuccess();
      } else {
        onError(`Register failed: ${response.data.message}`);
      }
    })
    .catch((error) => {
      console.log(error);
      onError(`Register failed: ${error.message}`);
    });
}

export function callGetLoginStatus(onSuccess, onError, onDone) {
  const headers = {
    Authorization: ` Bearer ${getToken()}`,
    "Content-Type": "application/json",
  };
  axios
    .get(`${API_URL}/authorization`, { headers })
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
