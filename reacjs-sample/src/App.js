import "./App.css";

import { useEffect, useState } from "react";
import AuthView from "./pages/Authen/AuthenView";
import { setToken } from "./api/ApiUtils";
import { LoggedView } from "./pages/Home/Home";
import { callGetLoginStatus } from "./pages/Authen/AuthenApi";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      setToken(token);

      callGetLoginStatus(
        () => {
          setIsLogin(true);
        },
        (err) => {
          setIsLogin(false);
        }
      );
    }
  }, []);

  return !isLogin ? (
    <AuthView
      onLogin={() => {
        setIsLogin(true);
      }}
    />
  ) : (
    <LoggedView logout={() => setIsLogin(false)} />
  );
}

export default App;
