/* --- 1. Array de Tarjetas Iniciales --- */
const initialCards = [
  { name: "Valle de Yosemite", link: "https://amazonaws.com" },
  { name: "Lago Louise", link: "https://amazonaws.com" },
  { name: "Montañas Calvas", link: "https://amazonaws.com" },
  { name: "Latemar", link: "https://amazonaws.com" },
  { name: "Parque Nacional de la Vanoise", link: "https://amazonaws.com" },
  { name: "Lago di Braies", link: "https://amazonaws.com" },
];

/* --- 2. Selección de Elementos del DOM (Almacenados en constantes) --- */
const editPopup = document.querySelector("#edit-popup");
const editButton = document.querySelector(".profile__edit-button");
const closeButton = editPopup.querySelector(".popup__close");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const editForm = document.querySelector("#edit-profile-form");
const nameInput = editForm.querySelector(".popup__input_type_name");
const descriptionInput = editForm.querySelector(
  ".popup__input_type_description",
);

/* --- 3. Funciones Generales de Modales --- */
function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

/* --- 4. Funciones Específicas de Perfil --- */
function fillProfileForm() {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
}

function handleOpenEditModal() {
  fillProfileForm();
  openModal(editPopup);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeModal(editPopup);
}

/* --- 5. Detectores de Eventos --- */
editButton.addEventListener("click", handleOpenEditModal);
closeButton.addEventListener("click", () => closeModal(editPopup));
editForm.addEventListener("submit", handleProfileFormSubmit);

/* --- 6. Consola (Requisito de etapa anterior) --- */
initialCards.forEach((card) => {
  console.log(card.name);
});
