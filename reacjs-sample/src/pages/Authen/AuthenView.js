import { useState } from "react";
import LoginView from "./Login";
import RegisterView from "./Register";

export default function AuthView({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const handleToggleChange = () => {
    setIsLogin(!isLogin);
  };

  return (
    <>
      {isLogin ? (
        <LoginView onLogin={onLogin} onToggleView={handleToggleChange} />
      ) : (
        <RegisterView onRegister={() => {}} onToggleView={handleToggleChange} />
      )}
    </>
  );
}
