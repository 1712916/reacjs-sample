import "./App.css";

import { useEffect, useState } from "react";
import AuthView from "./pages/Authen/AuthenView";
import { setToken } from "./api/ApiUtils";
import { LoggedView } from "./pages/Home/Home";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      setToken(token);
      setIsLogin(true);
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
