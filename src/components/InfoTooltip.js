import React from "react";
import successImage from "../images/Union.svg";
import failImage from "../images/Fail.svg";

export default function InfoTooltip({ isOpen, onClose, sucess }) {
  return (
    <div className={isOpen ? "popup popup_opened" : "popup"}>
      <form action="#" method="POST" className="popup__form" noValidate>
        <img
          src={sucess ? successImage : failImage}
          alt={sucess ? "Вы успешно зарегистрировались!" : "Что-то пошло не так!"}
          className="popup-image"
        />
        <p className="popup-caption">
          {sucess ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}
        </p>
        <button type="reset" className="popup__button-close" onClick={onClose}></button>
      </form>
    </div>
  );
}
