import React from "react";
import successImage from "../images/Union.svg";
export default function InfoTooltip() {
  return (
    <div className="popup popup_opened">
      <form action="#" method="POST" className="popup__form" noValidate>
          <img src={successImage} className="popup-image"/>
          <p className="popup-caption">Вы успешно зарегистрировались!</p>
        <button type="reset" className="popup__button-close"></button>
      </form>
    </div>
  );
}
