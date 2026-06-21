Tripleten web_project_around_es
Descripción del Proyecto

"Around The U.S." es una página web interactiva diseñada como una galería de fotos donde los usuarios pueden compartir imágenes de lugares interesantes. El proyecto se centra en la migración y refactorización de una aplicación existente hacia TypeScript, aplicando principios de Programación Orientada a Objetos (POO) para mejorar la mantenibilidad, escalabilidad y reutilización del código, permitiendo a los usuarios personalizar su perfil y gestionar una colección de tarjetas visuales de manera más eficiente y tipada.

Funcionalidad
Edición de Perfil: Los usuarios pueden actualizar su nombre y descripción mediante un formulario emergente (modal) gestionado por la clase UserInfo.

Gestión de Tarjetas:

Visualización de tarjetas iniciales cargadas dinámicamente desde un array mediante la clase Section.

Añadir nuevas tarjetas personalizadas con nombre y enlace de imagen a través de un formulario modal (PopupWithForm).

Sistema de "Me gusta" (Like) interactivo en cada tarjeta (Card).

Visualizador de Imágenes: Al hacer clic en cualquier imagen de la galería, esta se abre en una ventana emergente a pantalla completa con su título correspondiente utilizando la clase PopupWithImage.

Validación de Formularios: Los formularios de edición y creación cuentan con validación en tiempo real gestionada por la clase FormValidator, que deshabilita el botón de envío hasta que todos los campos sean válidos y muestra mensajes de error visuales.

Interfaz Responsiva: El diseño se adapta a diferentes tamaños de pantalla (móvil, tablet y escritorio) siguiendo la metodología BEM.

Reinicio de Estado: Al cerrar un modal, los formularios se reinician y los errores visuales se limpian automáticamente gracias al método resetValidation().

Tecnologías Utilizadas
HTML5: Estructura semántica y uso de etiquetas <template> para renderizado dinámico de tarjetas.

CSS3: Diseño responsivo, Flexbox, Grid Layout y metodología BEM (Block Element Modifier).

TypeScript: Tipado estático, interfaces, compilación a JavaScript moderno y detección de errores en tiempo de desarrollo.

Programación Orientada a Objetos: Uso de clases (FormValidator, Card, Section, Popup, PopupWithImage, PopupWithForm, UserInfo), herencia, encapsulamiento y separación de responsabilidades.

JavaScript : Manipulación del DOM, manejo de eventos tipados, funciones flecha, módulos (import/export) y lógica de modales reutilizable.

Modularidad: Cada clase se encuentra en su propio archivo .ts, promoviendo un código limpio, organizado y fácilmente extensible.

Arquitectura del Proyecto
Estructura de Carpetas:

src/: Contiene el código fuente en TypeScript.

public/: Archivos estáticos como HTML, CSS, imágenes y el código compilado por TypeScript.

Configuración: Archivo tsconfig.json con rootDir: "./src" y outDir: "./public" para una compilación organizada.

Flujo de Trabajo: Migración gradual desde JavaScript a TypeScript, permitiendo que el proyecto siga funcionando mientras se refactorizan los archivos uno por uno.

Enlace al Proyecto
Puedes ver el proyecto en vivo aquí:
[👉 Haz clic aquí para ver mi proyecto en GitHub Pages] https://alemanmanuel99-gif.github.io/web_project_around_es/

Desarrollado por Juan Manuel Aleman Muñoz como parte del Sprint 8 del Bootcamp de Desarrollo Web.
