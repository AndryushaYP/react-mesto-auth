import React from "react";
import logo from "../images/logo.svg";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <img src={logo} alt="Логотип Mesto" className="header__logo" />
      <Link className="header__button" to="/signup">Регистрация</Link>
    </header>
  );
}
