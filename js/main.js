document.addEventListener('DOMContentLoaded', function () {

    // Gestion du menu mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function () {
            mainNav.classList.toggle('active');
        });
    }

    // Données pour les modales de formation
    const formationsData = {
        word: {
            title: 'Formation Microsoft Word',
            image: 'images/formation word.png',
            description: 'Apprenez à maîtriser le traitement de texte le plus populaire au monde. De la mise en page simple aux documents complexes, cette formation vous donnera toutes les clés.',
            program: ['Interface et outils de base', 'Mise en forme de texte et paragraphes', 'Insertion d\'images et de tableaux', 'Publipostage et documents longs', 'Modèles et styles'],
            duration: '15 heures',
            prerequisites: ['Connaissances de base en informatique.']
        },
        excel: {
            title: 'Formation Microsoft Excel',
            image: 'images/formation_excel.png',
            description: 'Devenez un expert des tableurs. Analysez des données, créez des graphiques pertinents et automatisez vos tâches répétitives avec les formules et les macros.',
            program: ['Formules et fonctions essentielles', 'Tableaux croisés dynamiques', 'Graphiques et visualisation de données', 'Gestion de données (tri, filtre)', 'Introduction aux macros (VBA)'],
            duration: '20 heures',
            prerequisites: ['Connaissances de base en informatique.']
        },
        windows: {
            title: 'Maîtrise de Windows',
            image: 'images/formation_windows.png',
            description: 'Explorez en profondeur le système d\'exploitation Windows pour optimiser votre productivité, gérer vos fichiers et sécuriser votre ordinateur.',
            program: ['Gestion des fichiers et dossiers', 'Personnalisation de l\'interface', 'Sécurité et maintenance', 'Raccourcis clavier essentiels', 'Résolution des problèmes courants'],
            duration: '10 heures',
            prerequisites: ['Aucun. Idéal pour les débutants.']
        },
        informatique: {
            title: 'Informatique Générale',
            image: 'images/informaticien.png',
            description: 'Acquérez les compétences fondamentales en informatique, du matériel au logiciel, en passant par la navigation sur Internet et la sécurité.',
            program: ['Composants d\'un ordinateur', 'Principes des systèmes d\'exploitation', 'Navigation et recherche sur Internet', 'Utilisation de la messagerie électronique', 'Bonnes pratiques de sécurité'],
            duration: '25 heures',
            prerequisites: ['Aucun.']
        },
        maintenance: {
            title: 'Maintenance et Réparation',
            image: 'images/personnes-reparant.jpg',
            description: 'Apprenez à diagnostiquer, réparer et entretenir les ordinateurs de bureau et portables. Une compétence très recherchée !',
            program: ['Diagnostic des pannes matérielles', 'Remplacement de composants (RAM, disque dur)', 'Installation et configuration de logiciels', 'Nettoyage et optimisation du système', 'Sauvegarde et récupération de données'],
            duration: '30 heures',
            prerequisites: ['Formation en Informatique Générale ou équivalent.']
        },
        infographie: {
            title: 'Formation en Infographie',
            image: 'images/fomation_infographie.png',
            description: 'Libérez votre créativité et apprenez à créer des visuels percutants avec les outils de design graphique les plus utilisés par les professionnels.',
            program: ['Principes du design (couleur, typographie)', 'Prise en main d\'Adobe Photoshop', 'Création vectorielle avec Adobe Illustrator', 'Mise en page avec Adobe InDesign', 'Création de logos et d\'identités visuelles'],
            duration: '40 heures',
            prerequisites: ['Avoir une sensibilité artistique est un plus.']
        },
        ia: {
            title: 'Introduction à l\'Intelligence Artificielle',
            image: 'images/formation_ia.png',
            description: 'Découvrez les concepts fondamentaux de l\'IA, ses applications concrètes et comment elle transforme notre monde. Aucune connaissance en programmation n\'est requise.',
            program: ['Histoire et grands concepts de l\'IA', 'Machine Learning et Deep Learning', 'Applications de l\'IA (reconnaissance d\'image, NLP)', 'Éthique et enjeux de l\'IA', 'Utiliser des outils IA comme ChatGPT'],
            duration: '18 heures',
            prerequisites: ['Curiosité et intérêt pour les nouvelles technologies.']
        },
        drone: {
            title: 'Pilotage de Drone',
            image: 'images/pilote_drone.png',
            description: 'Apprenez à piloter un drone en toute sécurité, à comprendre la réglementation et à réaliser des prises de vues aériennes de qualité professionnelle.',
            program: ['Réglementation aérienne', 'Principes de vol et mécanique', 'Techniques de pilotage avancées', 'Prise de vue photo et vidéo', 'Maintenance du drone'],
            duration: '25 heures (théorie + pratique)',
            prerequisites: ['Être âgé de 16 ans minimum.']
        }
    };

    const formationModal = document.getElementById('formationModal');
    const formationCards = document.querySelectorAll('.formation-card');
    const closeModalButtons = document.querySelectorAll('.close-modal');

    formationCards.forEach(card => {
        card.addEventListener('click', () => {
            const formationId = card.dataset.id;
            const data = formationsData[formationId];

            if (data && formationModal) {
                document.getElementById('formationModalTitle').textContent = data.title;
                document.getElementById('formationModalImage').src = data.image;
                document.getElementById('formationModalDescription').textContent = data.description;
                document.getElementById('formationModalDuration').textContent = data.duration;

                const programList = document.getElementById('formationModalProgram');
                programList.innerHTML = '';
                data.program.forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = item;
                    programList.appendChild(li);
                });

                const prerequisitesList = document.getElementById('formationModalPrerequisites');
                prerequisitesList.innerHTML = '';
                data.prerequisites.forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = item;
                    prerequisitesList.appendChild(li);
                });

                formationModal.style.display = 'block';
            }
        });
    });

    // Fermeture des modales
    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.closest('.modal').style.display = 'none';
        });
    });

    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });

});