/* --- IMPORTACIONES MODULARES --- */
import {
  setEventListeners,
  toggleButtonState,
  resetValidation,
} from "./validate.js";

/* --- 1. DATOS INICIALES (URLs extraídas de tu HTML original) --- */
const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

/* --- 2. SELECTORES DEL DOM --- */
const cardsList = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template").content;

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const editButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

const editPopup = document.querySelector("#edit-popup");
const editForm = editPopup.querySelector("#edit-profile-form");
const nameInput = editForm.querySelector(".popup__input_type_name");
const descriptionInput = editForm.querySelector(
  ".popup__input_type_description",
);
const closeEditButton = editPopup.querySelector(".popup__close");

const newCardPopup = document.querySelector("#new-card-popup");
const newCardForm = newCardPopup.querySelector("#new-card-form");
const cardNameInput = newCardForm.querySelector(".popup__input_type_card-name");
const cardLinkInput = newCardForm.querySelector(".popup__input_type_url");
const closeAddCardButton = newCardPopup.querySelector(".popup__close");

const imagePopup = document.querySelector("#image-popup");
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");
const closeImageButton = imagePopup.querySelector(".popup__close");

/* --- 3. FUNCIONES GENERALES DE MODALES --- */

function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}

function openModal(modal) {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscClose);

  const formInModal = modal.querySelector(".popup__form");
  if (formInModal) {
    const submitButton = formInModal.querySelector(".popup__button");
    submitButton.disabled = true;
  }
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscClose);

  const formInModal = modal.querySelector(".popup__form");
  if (formInModal) {
    resetValidation(formInModal);
  }
}

/* --- 4. FUNCIONES DE TARJETAS --- */

function handleLikeButtonClick(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

function handleDeleteButtonClick(evt) {
  const cardItem = evt.target.closest(".card");
  cardItem.remove();
}

function getCardElement(data) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  cardImage.addEventListener("click", () => {
    popupImage.src = data.link;
    popupImage.alt = data.name;
    popupCaption.textContent = data.name;
    openModal(imagePopup);
  });

  likeButton.addEventListener("click", handleLikeButtonClick);
  deleteButton.addEventListener("click", handleDeleteButtonClick);

  return cardElement;
}

function renderCard(name, link, container) {
  const cardElement = getCardElement({ name, link });
  container.prepend(cardElement);
}

/* --- 5. MANEJADORES DE FORMULARIOS --- */

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeModal(editPopup);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  renderCard(cardNameInput.value, cardLinkInput.value, cardsList);
  closeModal(newCardPopup);
  newCardForm.reset();
}

/* --- 6. DETECTORES DE EVENTOS --- */

// Perfil
editButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
  openModal(editPopup);
});

closeEditButton.addEventListener("click", () => closeModal(editPopup));
editForm.addEventListener("submit", handleProfileFormSubmit);

// Nueva Tarjeta
addCardButton.addEventListener("click", () => {
  openModal(newCardPopup);
});

closeAddCardButton.addEventListener("click", () => closeModal(newCardPopup));
newCardForm.addEventListener("submit", handleCardFormSubmit);

// Visualizador de Imagen
closeImageButton.addEventListener("click", () => closeModal(imagePopup));

// Cierre por clic en la superposición
const popups = document.querySelectorAll(".popup");
popups.forEach((popupElement) => {
  popupElement.addEventListener("click", (evt) => {
    if (evt.target === evt.currentTarget) {
      closeModal(popupElement);
    }
  });
});

/* --- 7. INICIALIZACIÓN --- */

initialCards.forEach((cardData) => {
  renderCard(cardData.name, cardData.link, cardsList);
});

setEventListeners(editForm);
setEventListeners(newCardForm);
