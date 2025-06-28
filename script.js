document.addEventListener('DOMContentLoaded', function() {
    // Referencias a los elementos del formulario y mensajes de error/éxito
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    const formSuccessMessage = document.getElementById('formSuccessMessage');

    /**
     * Valida un campo de entrada específico y muestra/oculta mensajes de error.
     * @param {HTMLElement} inputElement El elemento input o textarea a validar.
     * @param {HTMLElement} errorElement El elemento span donde se mostrará el error.
     * @returns {boolean} true si el campo es válido, false en caso contrario.
     */
    function validateField(inputElement, errorElement) {
        let isValid = true;
        // Obtiene el elemento padre con la clase 'form-group' para aplicar estilos
        const formGroup = inputElement.closest('.form-group');

        // 1. Validación de campo vacío
        if (inputElement.value.trim() === '') {
            errorElement.textContent = 'Este campo es obligatorio.';
            formGroup.classList.remove('valid');
            formGroup.classList.add('invalid');
            isValid = false;
        } else {
            errorElement.textContent = ''; // Limpiar mensaje de error si no está vacío
            formGroup.classList.remove('invalid'); // Quitar estilo de inválido
            formGroup.classList.add('valid'); // Añadir estilo de válido
        }

        // 2. Validación específica para el formato del correo electrónico
        // Solo si el campo es de tipo email y no está ya inválido por estar vacío
        if (isValid && inputElement.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para email básico
            if (!emailRegex.test(inputElement.value.trim())) {
                errorElement.textContent = 'Por favor, introduce un correo electrónico válido.';
                formGroup.classList.remove('valid');
                formGroup.classList.add('invalid');
                isValid = false;
            }
        }
        return isValid;
    }

    // Añadir event listeners para la validación "en vivo" (al salir del campo)
    // Cuando el usuario pierde el foco (blur) de un campo, se valida.
    nameInput.addEventListener('blur', () => validateField(nameInput, nameError));
    emailInput.addEventListener('blur', () => validateField(emailInput, emailError));
    messageInput.addEventListener('blur', () => validateField(messageInput, messageError));

    // Opcional: Validar al escribir (descomenta si quieres esta funcionalidad)
    // nameInput.addEventListener('input', () => validateField(nameInput, nameError));
    // emailInput.addEventListener('input', () => validateField(emailInput, emailError));
    // messageInput.addEventListener('input', () => validateField(messageInput, messageError));


    // Event listener para el envío del formulario
    contactForm.addEventListener('submit', function(event) {
        // Ocultar mensaje de éxito antes de cualquier validación o re-envío
        formSuccessMessage.style.display = 'none';
        formSuccessMessage.textContent = '';

        // Realizar validación de todos los campos al intentar enviar
        // Se llama a validateField para cada campo y se guarda su resultado
        const isNameValid = validateField(nameInput, nameError);
        const isEmailValid = validateField(emailInput, emailError);
        const isMessageValid = validateField(messageInput, messageError);

        // Si ALGÚN campo no es válido, prevenir el envío del formulario
        if (!isNameValid || !isEmailValid || !isMessageValid) {
            event.preventDefault(); // Detiene el envío del formulario al servidor
            // Opcional: Puedes añadir un alert() general aquí si lo deseas
            // alert('Por favor, corrige los errores en el formulario antes de enviar.');
        } else {
            // Si todos los campos son válidos:
            event.preventDefault(); // ¡IMPORTANTE para este ejercicio!
                                    // Prevenimos el envío real del formulario porque
                                    // no estamos implementando la parte del servidor (process_form.php).
                                    // En una aplicación real, **eliminarías esta línea**
                                    // para permitir que el formulario se envíe a PHP.

            // Simular envío exitoso y mostrar mensaje de éxito
            formSuccessMessage.textContent = '¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.';
            formSuccessMessage.style.display = 'block';

            // Limpiar el formulario después de la "simulación" de envío
            contactForm.reset();
            // Quitar las clases 'valid' de los campos para que vuelvan a su estado inicial
            nameInput.closest('.form-group').classList.remove('valid');
            emailInput.closest('.form-group').classList.remove('valid');
            messageInput.closest('.form-group').classList.remove('valid');

            // Opcional: Desplazarse al mensaje de éxito para que el usuario lo vea
            formSuccessMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });
});