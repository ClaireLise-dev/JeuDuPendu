# 🎮 Jeu du Pendu

## 📌 Description

Ce projet est une version numérique du célèbre **Jeu du Pendu**. Le but est simple : deviner un mot **lettre par lettre** ou **proposer directement un mot entier**. L’utilisateur dispose d’un nombre limité de tentatives pour éviter que le pendu ne soit complété !

---

## 🚀 Fonctionnalités

✅ **Jouer en cliquant sur les lettres du clavier virtuel.**  
✅ **Possibilité de proposer un mot entier pour deviner plus rapidement.**  
✅ **Mise à jour dynamique du pendu après chaque erreur.**  
✅ **Barre de progression qui diminue avec les erreurs.**  
✅ **Mode sombre (dark mode) avec mémorisation du choix via `localStorage`.**  
✅ **Option de "Nouvelle partie" pour recommencer immédiatement.**

---

## 🎯 Règles du jeu

1. Un **mot aléatoire** est sélectionné au début de chaque partie.
2. Le joueur peut :
   - **Cliquer sur une lettre** :
     - Si elle est dans le mot → elle s’affiche.
     - Sinon → le joueur **perd un essai** et le pendu se met à jour.
   - **Proposer un mot entier** :
     - Si c'est le bon → **Victoire immédiate** 🎉.
     - Sinon → **Le joueur perd un essai** ❌.
3. Si toutes les lettres sont trouvées → **Le joueur gagne !**
4. Si les essais sont épuisés → **Défaite et affichage du mot mystère.**

## 🔧 Technologies utilisées

- **HTML** → Structure du jeu.
- **CSS** → Styles et animations.
- **JavaScript** → Logique du jeu, gestion du DOM et des événements.
- **Git & GitHub** → Gestion de version et hébergement du projet.

---

## 📂 Installation et utilisation

1️⃣ **Cloner le repository**

```bash
git clone https://github.com/ClaireLise-dev/JeuDuPendu.git
```

2️⃣ **Ouvrir `index.html` dans votre navigateur**

## 🌍 Jouer directement en ligne

🔗 **[Jouer au Pendu 🎮](https://clairelise-dev.github.io/JeuDuPendu/)**
