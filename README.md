Voici une suggestion de description pour votre projet GitHub intitulé "🏠 Système de Recommandation de Locations avec K-Nearest Neighbors". Elle inclut des instructions sur la façon d'entraîner le modèle et de lancer l'application Streamlit.

---

# 🏠 Système de Recommandation de Locations avec K-Nearest Neighbors

Ce projet est un système de recommandation pour aider les utilisateurs à trouver des propriétés locatives basées sur leurs préférences. Il utilise un algorithme K-Nearest Neighbors (KNN) pour calculer la similarité entre les propriétés et fournir des suggestions pertinentes.

## Fonctionnalités

- Chargement et prétraitement des données à partir d'un fichier CSV (`House_Rent_Dataset.csv`).
- Encodage des colonnes catégoriques pour les transformer en données numériques.
- Normalisation des données à l'aide d'un scaler pour améliorer la performance du modèle.
- Calcul de la similarité entre les propriétés à l'aide de `cosine_similarity`.
- Interface utilisateur intuitive créée avec Streamlit pour interagir avec le système.

---

## Structure du projet

Voici les fichiers principaux inclus dans ce projet :

- `app.py` : Script principal contenant l'application Streamlit.
- `House_Rent_Dataset.csv` : Jeu de données des propriétés locatives.
- Fichiers PKL (optionnels) : Contiennent des encodages et des modèles enregistrés (peuvent être supprimés pour réentraîner le modèle).

---

## Installation et exécution

1. **Cloner le dépôt :**

   ```bash
   git clone https://github.com/votre-utilisateur/nom-du-projet.git
   cd nom-du-projet
   ```

2. **Installer les dépendances :**

   Assurez-vous que Python 3.7+ est installé. Ensuite, installez les bibliothèques nécessaires avec :

   ```bash
   pip install -r requirements.txt
   ```

3. **(Optionnel) Supprimer les fichiers PKL existants :**

   Si vous souhaitez réentraîner le modèle depuis le début, supprimez les fichiers `*.pkl` :

   ```bash
   rm *.pkl
   ```

4. **Exécuter l'application :**

   Lancer l'application Streamlit avec la commande suivante :

   ```bash
   streamlit run app.py
   ```

   Une interface web s'ouvrira dans votre navigateur par défaut, où vous pourrez interagir avec le système.

---

## Réentraîner le modèle

Pour entraîner un nouveau modèle, suivez ces étapes dans `app.py` :
- Chargez les données avec la fonction `load_data`.
- Appliquez les transformations nécessaires, comme l'encodage des colonnes catégoriques et la normalisation.
- Entraînez un modèle KNN en fonction des préférences utilisateur.
- Sauvegardez le modèle dans un fichier `.pkl` si nécessaire.

---

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à soumettre des demandes de fusion ou à ouvrir des issues pour signaler des bugs ou suggérer des améliorations.

---

## Licence

Ce projet est sous licence [MIT](LICENSE).

---

Si vous avez besoin d'aide pour des sections spécifiques, faites-le-moi savoir. 😊
