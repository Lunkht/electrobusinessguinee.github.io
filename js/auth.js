document.addEventListener('DOMContentLoaded', () => {
    // --- General ---
    const togglePassword = document.querySelectorAll('.toggle-password');
    togglePassword.forEach(button => {
        button.addEventListener('click', () => {
            const passwordField = button.previousElementSibling;
            if (passwordField.type === 'password') {
                passwordField.type = 'text';
                button.innerHTML = '<i class="fas fa-eye-slash"></i>';
            } else {
                passwordField.type = 'password';
                button.innerHTML = '<i class="fas fa-eye"></i>';
            }
        });
    });

    const displayMessage = (elementId, message, isError = true) => {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = message;
            element.style.display = 'block';
            element.className = isError ? 'error-message' : 'success-message';
        }
    };

    // --- Signup Page ---
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const nom = signupForm.nom.value;
            const email = signupForm.email.value;
            const telephone = signupForm.telephone.value;
            const formation = signupForm.formation.value;
            const password = signupForm.password.value;
            const confirmPassword = signupForm.confirmPassword.value;
            const terms = signupForm.terms.checked;

            const errorMessageDiv = document.getElementById('errorMessage');
            const successMessageDiv = document.getElementById('successMessage');
            errorMessageDiv.style.display = 'none';
            successMessageDiv.style.display = 'none';

            if (password !== confirmPassword) {
                displayMessage('errorMessage', 'Les mots de passe ne correspondent pas.');
                return;
            }
            if (!terms) {
                displayMessage('errorMessage', 'Vous devez accepter les conditions d\'utilisation.');
                return;
            }

            try {
                // Create user with email and password
                const userCredential = await auth.createUserWithEmailAndPassword(email, password);
                const user = userCredential.user;

                // Save additional user info to Firestore
                await db.collection('users').doc(user.uid).set({
                    nom: nom,
                    email: email,
                    telephone: telephone,
                    formation: formation,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                });

                displayMessage('successMessage', 'Inscription réussie ! Vous allez être redirigé...', false);
                setTimeout(() => {
                    window.location.href = 'profil.html';
                }, 2000);

            } catch (error) {
                displayMessage('errorMessage', `Erreur d'inscription: ${error.message}`);
            }
        });
    }

    // --- Login Page ---
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = loginForm.email.value;
            const password = loginForm.password.value;
            
            const errorMessageDiv = document.getElementById('errorMessage');
            const successMessageDiv = document.getElementById('successMessage');
            errorMessageDiv.style.display = 'none';
            successMessageDiv.style.display = 'none';

            try {
                await auth.signInWithEmailAndPassword(email, password);
                displayMessage('successMessage', 'Connexion réussie ! Redirection...', false);
                 setTimeout(() => {
                    window.location.href = 'profil.html';
                }, 1500);
            } catch (error) {
                displayMessage('errorMessage', `Erreur de connexion: ${error.message}`);
            }
        });
    }
}); 