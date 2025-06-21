document.addEventListener('DOMContentLoaded', () => {
    const userNameEl = document.getElementById('userName');
    const userEmailEl = document.getElementById('userEmail');
    const userFormationEl = document.getElementById('userFormation');
    const userAvatarEl = document.getElementById('userAvatar');
    const logoutBtn = document.getElementById('logoutBtn');
    const profileForm = document.getElementById('profileForm');
    const passwordForm = document.getElementById('passwordForm');

    // Tab navigation
    const navItems = document.querySelectorAll('.profile-nav .nav-item');
    const tabContents = document.querySelectorAll('.profile-content .tab-content');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Update active nav item
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            // Update active tab content
            const targetTab = item.getAttribute('data-tab');
            tabContents.forEach(tab => {
                tab.style.display = 'none';
                tab.classList.remove('active');
            });
            const activeTab = document.getElementById(targetTab);
            activeTab.style.display = 'block';
            activeTab.classList.add('active');
        });
    });

    // Check user auth state
    auth.onAuthStateChanged(async (user) => {
        if (user) {
            // User is signed in.
            const doc = await db.collection('users').doc(user.uid).get();
            if (doc.exists) {
                const userData = doc.data();
                // Display user info
                userNameEl.textContent = userData.nom;
                userEmailEl.textContent = userData.email;
                userFormationEl.textContent = `Formation: ${userData.formation}`;

                // Populate form fields
                if (profileForm) {
                    profileForm.nom.value = userData.nom;
                    profileForm.telephone.value = userData.telephone;
                    profileForm.formation.value = userData.formation;
                    // You might need to add adresse to your firestore document
                    profileForm.adresse.value = userData.adresse || ''; 
                }
            } else {
                console.log("No such document!");
                // Handle case where user exists in Auth but not in Firestore
                 userNameEl.textContent = 'Utilisateur';
                 userEmailEl.textContent = user.email;
            }
        } else {
            // User is signed out.
            window.location.href = 'connexion.html';
        }
    });

    // Handle logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            try {
                await auth.signOut();
                window.location.href = 'connexion.html';
            } catch (error) {
                console.error("Erreur de déconnexion:", error);
            }
        });
    }

    // Handle profile update
    if (profileForm) {
        profileForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const user = auth.currentUser;
            if (user) {
                const updatedData = {
                    nom: profileForm.nom.value,
                    telephone: profileForm.telephone.value,
                    formation: profileForm.formation.value,
                    adresse: profileForm.adresse.value,
                };
                try {
                    await db.collection('users').doc(user.uid).update(updatedData);
                    alert('Profil mis à jour avec succès !');
                    // Refresh displayed data
                    userNameEl.textContent = updatedData.nom;
                    userFormationEl.textContent = `Formation: ${updatedData.formation}`;

                } catch (error) {
                    console.error("Erreur de mise à jour:", error);
                    alert(`Erreur: ${error.message}`);
                }
            }
        });
    }
    
    // Handle password change - this requires re-authentication, which is complex.
    // For simplicity, this is a basic version. For production, you'd need a more secure flow.
    if (passwordForm) {
        passwordForm.addEventListener('submit', async (e) => {
             e.preventDefault();
             alert("La fonctionnalité de changement de mot de passe n'est pas encore implémentée.");
             // Implementation would require re-authenticating the user first
             // then using user.updatePassword(newPassword)
        });
    }

}); 