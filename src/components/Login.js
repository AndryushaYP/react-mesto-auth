import React from "react";

export default function Login() {
  return (
    <div className="login">
      <form
        action="#"
        method="POST"
        className="popup__form popup__form_type_login"
        noValidate
      >
        <h2 className="popup__title popup__title_type_login">Вход</h2>
        <label className="popup__label">
        <input
          
          
          placeholder="Email"
          type="text"
          name="name"
          className="popup__input popup__input_type_login"
          minLength="2"
          maxLength="40"
          required
        />
        <span className="popup__error" id="name-error"></span>
      </label>

      <label className="popup__label">
        <input
          
          
          placeholder="Пароль"
          type="text"
          name="about"
          minLength="2"
          maxLength="200"
          className="popup__input popup__input_type_login"
          required
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