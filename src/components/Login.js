import React from "react";
import * as auth from "../utils/auth.js";

export default function Login({ handleLogin }) {
  const [data, setData] = React.useState({ password: "", email: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let { password, email } = data;
    handleLogin(password, email);
  };

  return (
    <div className="login">
      <form
        action="#"
        method="POST"
        className="popup__form popup__form_type_login"
        noValidate
        onSubmit={handleSubmit}
      >
        <h2 className="popup__title popup__title_type_login">Вход</h2>
        <label className="popup__label">
          <input
            placeholder="Email"
            type="text"
            name="email"
            className="popup__input popup__input_type_login"
            minLength="2"
            maxLength="40"
            required
            onChange={handleChange}
          />
          <span className="popup__error" id="name-error"></span>
        </label>

        <label className="popup__label">
          <input
            placeholder="Пароль"
            type="text"
            name="password"
            minLength="2"
            maxLength="200"
            className="popup__input popup__input_type_login"
            required
            onChange={handleChange}
          />
          <span className="popup__error" id="about-error"></span>
        </label>

        <button type="submit" value="" className="popup__button_type_login">
          Войти
        </button>
      </form>
    </div>
  );
}
