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

/* --- 3. FUNCIONES GENERALES Y VALIDACIÓN --- */

function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(
    `.${inputElement.id}-input-error`,
  );
  inputElement.classList.add("popup__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__input-error_active");
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(
    `.${inputElement.id}-input-error`,
  );
  inputElement.classList.remove("popup__input_type_error");
  errorElement.textContent = "";
  errorElement.classList.remove("popup__input-error_active");
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

function hasInvalidInput(inputList) {
  return Array.from(inputList).some((input) => {
    return !input.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
  }
}

function setEventListeners(formElement) {
  const inputs = formElement.querySelectorAll(".popup__input");
  const submitButton = formElement.querySelector(".popup__button");

  toggleButtonState(inputs, submitButton);

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(formElement, input);
      toggleButtonState(inputs, submitButton);
    });
  });
}

/* --- 4. FUNCIONES DE TARJETAS --- */

function handleLikeButtonClick(evt) {
  evt.target.classList.toggle("card__like-button_active");
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

  const inputs = newCardForm.querySelectorAll(".popup__input");
  const submitButton = newCardForm.querySelector(".popup__button");
  toggleButtonState(inputs, submitButton);
}

/* --- 6. EVENTOS --- */

// Perfil
editButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;

  const inputs = editPopup.querySelectorAll(".popup__input");
  const submitButton = editPopup.querySelector(".popup__button");
  toggleButtonState(inputs, submitButton);

  openModal(editPopup);
});

closeEditButton.addEventListener("click", () => closeModal(editPopup));
editForm.addEventListener("submit", handleProfileFormSubmit);

// Nueva Tarjeta
addCardButton.addEventListener("click", () => {
  const inputs = newCardPopup.querySelectorAll(".popup__input");
  const submitButton = newCardPopup.querySelector(".popup__button");
  toggleButtonState(inputs, submitButton);

  openModal(newCardPopup);
});

closeAddCardButton.addEventListener("click", () => closeModal(newCardPopup));
newCardForm.addEventListener("submit", handleCardFormSubmit);

// Visualizador de Imagen
closeImageButton.addEventListener("click", () => closeModal(imagePopup));

/* >>> NUEVO: CIERRE POR CLIC EN LA SUPERPOSICIÓN <<< */
// Seleccionamos los tres modales que existen en la página
const popups = document.querySelectorAll(".popup");

popups.forEach((popupElement) => {
  popupElement.addEventListener("click", (evt) => {
    // Si el clic fue exactamente en el fondo oscuro (.popup) y no en la caja blanca
    if (evt.target === evt.currentTarget) {
      closeModal(popupElement);
    }
  });
});
/* >>> FIN DEL BLOQUE NUEVO <<< */

/* --- 7. INICIALIZACIÓN --- */

initialCards.forEach((cardData) => {
  renderCard(cardData.name, cardData.link, cardsList);
});

setEventListeners(editForm);
setEventListeners(newCardForm);
