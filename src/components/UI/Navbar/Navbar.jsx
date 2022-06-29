import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../hooks/context";
import MyButton from "../Button/MyButton";

export default function Navbar() {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem("auth");
  };
  return (
    <div className="navbar">
      <MyButton onClick={logout}>Exit</MyButton>
      <div className="navbar__links">
        <Link to="/about">
          <MyButton>О нас</MyButton>
        </Link>
        <Link to="/posts">Посты</Link>
      </div>
    </div>
  );
}
