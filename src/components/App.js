import React from "react";
import ProtectedRoute from "./ProtectedRoute";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import InfoTooltip from "./InfoTooltip";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import Login from "./Login";
import Register from "./Register";
import api from "../utils/Api.js";
import * as auth from "../utils/auth.js";

function App() {
  /* Авторизация/регистрация */
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userData, setUserData] = React.useState([]);

  const handleRegister = (password, email) => {
    console.log(password, email);
    auth
      .register(password, email)
      .then((data) => {
        console.log(data.data._id)

        if(data.data._id) {
          setUserData({
            email: data.data.email
          })
          setLoggedIn(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    /* let history = useHistory();
    history.push("/signin"); */
  };

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUserData(), api.getAllCardsList()])
      .then((res) => {
        const [dataUser, cardData] = res;

        setCurrentUser(dataUser);

        const item = cardData.map((cardEl) => ({
          link: cardEl.link,
          name: cardEl.name,
          likes: cardEl.likes,
          _id: cardEl._id,
          owner: cardEl.owner,
        }));

        setCards(item);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCard(card._id, !isLiked)
      .then((newCard) => {
        // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
        const newCards = cards.map((cardItem) => (cardItem._id === card._id ? newCard : cardItem));
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then((res) => {
        const newCardArr = cards.filter((cardEl) => cardEl._id !== card._id);
        setCards(newCardArr);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(newCard) {
    api
      .addCard(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        setIsAddPlacePopupOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(userData) {
    api
      .changeUserData(userData)
      .then((userData) => {
        setCurrentUser(userData);
        setIsEditProfilePopupOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(userData) {
    api
      .changeUserAvatar(userData)
      .then((userData) => {
        setCurrentUser(userData);
        setIsEditAvatarPopupOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopup() {
    setSelectedCard(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
  }

  return (
    <div className="page">
      <Header email={userData.email}/>

      <Switch>
        <CurrentUserContext.Provider value={currentUser}>
          <ProtectedRoute
            path="/home"
            loggedIn={loggedIn}
            component={Main}
            onCardClick={handleCardClick}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          ></ProtectedRoute>

          <Route path="/signin">
            <Login />
          </Route>

          <Route path="/signup">
            <Register handleRegister={handleRegister} />
          </Route>
          <InfoTooltip />
          <Route>{loggedIn ? <Redirect to="/home" /> : <Redirect to="/signin" />}</Route>

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopup}
            onUpdateUser={handleUpdateUser}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopup}
            onAddPlace={handleAddPlaceSubmit}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopup}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <PopupWithForm
            name={"confirm"}
            title={"Вы уверены?"}
            btnValue={"Да"}
            onClose={closeAllPopup}
          ></PopupWithForm>

          <ImagePopup card={selectedCard} onClose={closeAllPopup} />
        </CurrentUserContext.Provider>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
