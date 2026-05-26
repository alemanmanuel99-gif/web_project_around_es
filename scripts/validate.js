/* ==========================================================================
   MÓDULO DE VALIDACIÓN DE FORMULARIOS - REQUISITO SPRINT 6
   ========================================================================== */

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(
    `.${inputElement.id}-input-error`,
  );
  if (errorElement) {
    inputElement.classList.add("popup__input_type_error");
    errorElement.textContent = errorMessage;
    errorElement.classList.add("popup__input-error_active");
  }
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(
    `.${inputElement.id}-input-error`,
  );
  if (errorElement) {
    inputElement.classList.remove("popup__input_type_error");
    errorElement.textContent = "";
    errorElement.classList.remove("popup__input-error_active");
  }
};

/* >>> AJUSTE: Control de mensaje personalizado para campos vacíos <<< */
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    // Si el error es porque el campo está totalmente vacío (required)
    if (inputElement.validity.valueMissing) {
      showInputError(
        formElement,
        inputElement,
        "Por favor, rellena este campo",
      );
    } else {
      // Para cualquier otro error (ej: URL inválida o texto muy corto), usa el nativo
      showInputError(formElement, inputElement, inputElement.validationMessage);
    }
  } else {
    hideInputError(formElement, inputElement);
  }
};

function hasInvalidInput(inputList) {
  return Array.from(inputList).some((input) => {
    return !input.validity.valid;
  });
}

export function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
  }
}

export function setEventListeners(formElement) {
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

export function resetValidation(formElement) {
  const inputs = formElement.querySelectorAll(".popup__input");
  const submitButton = formElement.querySelector(".popup__button");

  inputs.forEach((input) => {
    hideInputError(formElement, input);
  });

  submitButton.disabled = true;
}
