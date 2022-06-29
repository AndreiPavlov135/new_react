import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../hooks/context";
import MyButton from "../UI/Button/MyButton";
import MyInput from "../UI/Input/MyInput";

export default function Login() {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const login = (e) => {
    localStorage.setItem("auth", "true");
    e.preventDefault();
    setIsAuth(true);
  };
  return (
    <div>
      <h1>Страница авторизации</h1>
      <form onSubmit={login}>
        <MyInput type="text" placeholder="login" />
        <MyInput type="password" placeholder="password" />
        <MyButton>Enter</MyButton>
      </form>
    </div>
  );
}
