"use strict";
const defaultFormConfig = {
    inputSelector: ".popup__input",
    buttonSubmitSelector: ".popup__button",
    inactiveButtonClass: "popup__button-disabled",
    errorInputClass: "form__input-type-error",
    visibleError: "popup__input-error_active",
};
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
class FormValidator {
    _config;
    _formElement;
    _inputList;
    _buttonElement;
    constructor(config, formElement) {
        this._config = config;
        this._formElement = formElement;
        this._inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
        this._buttonElement = formElement.querySelector(config.buttonSubmitSelector);
    }
    hasInvalidInput() {
        return this._inputList.some(input => !input.validity.valid);
    }
    showInputError(inputElement, errorMessage) {
        const inputErrorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._config.errorInputClass);
        inputErrorElement.textContent = errorMessage;
        inputErrorElement.title = errorMessage;
        inputErrorElement.classList.add(this._config.visibleError);
    }
    hideInputError(inputElement) {
        const inputErrorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._config.errorInputClass);
        inputErrorElement.classList.remove(this._config.visibleError);
        inputErrorElement.textContent = "";
        inputErrorElement.title = "";
    }
    toggleButtonState() {
        const hasInvalid = this.hasInvalidInput();
        if (hasInvalid) {
            this._buttonElement.classList.add(this._config.inactiveButtonClass);
        }
        else {
            this._buttonElement.classList.remove(this._config.inactiveButtonClass);
        }
        this._buttonElement.disabled = hasInvalid;
    }
    resetValidation() {
        this._inputList.forEach(input => {
            this.hideInputError(input);
        });
        this.toggleButtonState();
    }
    enableValidation() {
        this._inputList.forEach(input => {
            input.addEventListener("input", () => {
                if (!input.validity.valid) {
                    this.showInputError(input, input.validationMessage);
                }
                else {
                    this.hideInputError(input);
                }
                this.toggleButtonState();
            });
        });
        this.toggleButtonState();
    }
}
class Card {
    _name;
    _link;
    _templateSelector;
    _handleCardClick;
    constructor(data, templateSelector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
    }
    getTemplate() {
        const cardTemplate = document.querySelector(this._templateSelector);
        const cardElement = cardTemplate.content.querySelector(".card").cloneNode(true);
        return cardElement;
    }
    handleLikeButton(likeButton) {
        likeButton.classList.toggle("card__like-button_is-active");
    }
    handleDeleteButton(cardElement) {
        cardElement.remove();
    }
    setEventListeners(cardElement) {
        const cardImage = cardElement.querySelector(".card__image");
        const likeButton = cardElement.querySelector(".card__like-button");
        const deleteButton = cardElement.querySelector(".card__delete-button");
        cardImage.addEventListener("click", () => {
            this._handleCardClick(this._name, this._link);
        });
        likeButton.addEventListener("click", () => {
            this.handleLikeButton(likeButton);
        });
        deleteButton.addEventListener("click", () => {
            this.handleDeleteButton(cardElement);
        });
    }
    generateCard() {
        const cardElement = this.getTemplate();
        const cardTitle = cardElement.querySelector(".card__title");
        const cardImage = cardElement.querySelector(".card__image");
        cardTitle.textContent = this._name;
        cardImage.src = this._link;
        cardImage.alt = this._name;
        this.setEventListeners(cardElement);
        return cardElement;
    }
}
class Section {
    _container;
    _renderedItems;
    _renderer;
    constructor({ data, renderer }, containerSelector) {
        this._container = document.querySelector(containerSelector);
        this._renderedItems = data;
        this._renderer = renderer;
    }
    renderItems() {
        this._renderedItems.forEach(item => {
            this._renderer(item);
        });
    }
    addItem(element) {
        this._container.prepend(element);
    }
}
class Popup {
    _popupElement;
    _closeButton;
    constructor(popupSelector) {
        this._popupElement = document.querySelector(popupSelector);
        this._closeButton = this._popupElement.querySelector(".popup__close");
    }
    open() {
        this._popupElement.classList.add("popup_is-opened");
        document.addEventListener("keydown", this.handleEscClose);
    }
    close() {
        this._popupElement.classList.remove("popup_is-opened");
        document.removeEventListener("keydown", this.handleEscClose);
    }
    handleEscClose = (event) => {
        const escKey = event.key === "Escape";
        const popup = document.querySelector(".popup_is-opened");
        if (escKey && popup) {
            this.close();
        }
    };
    setEventListeners() {
        this._closeButton.addEventListener("click", () => {
            this.close();
        });
        this._popupElement.addEventListener("click", (event) => {
            if (event.target === this._popupElement) {
                this.close();
            }
        });
    }
}
class PopupWithImage extends Popup {
    _imageElement;
    _descriptionElement;
    constructor(popupSelector) {
        super(popupSelector);
        this._imageElement = this._popupElement.querySelector(".popup__image");
        this._descriptionElement = this._popupElement.querySelector(".popup__caption");
    }
    open(name, link) {
        if (!name || !link) {
            return;
        }
        this._imageElement.src = link;
        this._imageElement.alt = name;
        this._descriptionElement.textContent = name;
        super.open();
    }
}
class PopupWithForm extends Popup {
    _formElement;
    _inputList;
    _handleFormSubmit;
    constructor(popupSelector, handleSubmitForm) {
        super(popupSelector);
        this._formElement = this._popupElement.querySelector(".popup__form");
        this._inputList = Array.from(this._popupElement.querySelectorAll(".popup__input"));
        this._handleFormSubmit = handleSubmitForm;
    }
    getInputValues() {
        const inputValues = {};
        this._inputList.forEach(input => {
            inputValues[input.name] = input.value;
        });
        return inputValues;
    }
    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener("submit", (event) => {
            event.preventDefault();
            this._handleFormSubmit(this.getInputValues());
        });
    }
    close() {
        super.close();
        this._formElement.reset();
    }
}
class UserInfo {
    _userNameElement;
    _userJobElement;
    constructor({ userNameSelector, userJobSelector }) {
        this._userNameElement = document.querySelector(userNameSelector);
        this._userJobElement = document.querySelector(userJobSelector);
    }
    getUserInfo() {
        return {
            name: this._userNameElement.textContent ?? "",
            job: this._userJobElement.textContent ?? ""
        };
    }
    setUserInfo({ name, job }) {
        this._userNameElement.textContent = name;
        this._userJobElement.textContent = job;
    }
}
// Buttons
const addCardBtn = document.querySelector(".profile__add-button");
const editProfileBtn = document.querySelector(".profile__edit-button");
// Forms
const addCardFormElement = document.querySelector("#new-card-form");
const editProfileFormElement = document.querySelector("#edit-profile-form");
// Profile
const profileImage = document.querySelector(".profile__image");
const editProfileNameInput = editProfileFormElement.querySelector(".popup__input_type_name");
const editProfileDescriptionInput = editProfileFormElement.querySelector(".popup__input_type_description");
const editProfileImageInput = editProfileFormElement.querySelector(".popup__input_type_profile-image");
// Form validation
const editProfileForm = new FormValidator(defaultFormConfig, editProfileFormElement);
editProfileForm.enableValidation();
const addCardForm = new FormValidator(defaultFormConfig, addCardFormElement);
addCardForm.enableValidation();
// Profile and image popup
const userInfo = new UserInfo({
    userNameSelector: ".profile__title",
    userJobSelector: ".profile__description",
});
const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();
function createCard(cardData) {
    const card = new Card(cardData, "#card__template", (name, link) => {
        imagePopup.open(name, link);
    });
    return card.generateCard();
}
// Cards
const cardList = new Section({
    data: initialCards,
    renderer: (cardData) => {
        cardList.addItem(createCard(cardData));
    },
}, ".cards__list");
cardList.renderItems();
const addCardPopup = new PopupWithForm("#new-card-popup", (inputValues) => {
    const name = inputValues["place-name"];
    const link = inputValues.link;
    if (!name || !link) {
        return;
    }
    const newCard = {
        name,
        link,
    };
    cardList.addItem(createCard(newCard));
    addCardPopup.close();
});
addCardPopup.setEventListeners();
// Profile editing
const editProfilePopup = new PopupWithForm("#edit-popup", (inputValues) => {
    const name = inputValues.name;
    const job = inputValues.description;
    const imageLink = inputValues["profile-image"];
    if (!name || !job || !imageLink) {
        return;
    }
    userInfo.setUserInfo({
        name,
        job,
    });
    profileImage.src = imageLink;
    editProfilePopup.close();
});
editProfilePopup.setEventListeners();
// Popup opening
addCardBtn.addEventListener("click", () => {
    addCardForm.resetValidation();
    addCardPopup.open();
});
editProfileBtn.addEventListener("click", () => {
    const { name, job } = userInfo.getUserInfo();
    editProfileNameInput.value = name;
    editProfileDescriptionInput.value = job;
    editProfileImageInput.value = profileImage.src;
    editProfileForm.resetValidation();
    editProfilePopup.open();
});
