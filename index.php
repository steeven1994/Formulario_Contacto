<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulario de Contacto</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <header>
        <h1>Contacto</h1>
    </header>

    <main>
        <section id="contact-form-section" class="contact-form-container">
            <h2>Contáctanos</h2>
            <form id="contactForm" method="POST" action="process_form.php">
                <div class="form-group">
                    <label for="name">Nombre:</label>
                    <input type="text" id="name" name="name" required>
                    <span class="error-message" id="nameError"></span>
                </div>

                <div class="form-group">
                    <label for="email">Correo Electrónico:</label>
                    <input type="email" id="email" name="email" required>
                    <span class="error-message" id="emailError"></span>
                </div>

                <div class="form-group">
                    <label for="message">Mensaje:</label>
                    <textarea id="message" name="message" rows="5" required></textarea>
                    <span class="error-message" id="messageError"></span>
                </div>

                <button type="submit">Enviar Mensaje</button>
                <div id="formSuccessMessage" class="success-message"></div>
            </form>
        </section>
    </main>

    <script src="script.js"></script>
</body>
</html>