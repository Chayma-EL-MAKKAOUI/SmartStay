# Sauvegardez ce code dans un fichier recommendation_app.py
import streamlit as st
import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.metrics.pairwise import cosine_similarity
import plotly.express as px

# Configuration de la page
st.set_page_config(
    page_title="Système de Recommandation de Locations",
    layout="wide"
)

# Fonction pour charger les données
@st.cache_data
def load_data():
    data = pd.read_csv('House_Rent_Dataset.csv')
    # Supprimer la colonne 'Posted On' qui n'est pas nécessaire pour les recommandations
    if 'Posted On' in data.columns:
        data = data.drop('Posted On', axis=1)
    return data

# Fonction pour calculer la similarité et obtenir les recommandations
def get_recommendations(data, user_preferences, n_recommendations=5):
    # Créer une copie des données
    df = data.copy()
    
    # Sélectionner uniquement les colonnes pertinentes pour la similarité
    relevant_columns = ['BHK', 'Rent', 'Size', 'Bathroom', 
                       'Furnishing Status', 'Tenant Preferred',
                       'Area Type', 'City']
    
    df = df[relevant_columns]
    
    # Encoder les variables catégorielles
    le = LabelEncoder()
    categorical_columns = ['Furnishing Status', 'Tenant Preferred', 
                         'Area Type', 'City']
    
    for col in categorical_columns:
        df[col] = le.fit_transform(df[col])
    
    # Normaliser les variables numériques
    scaler = StandardScaler()
    numerical_columns = ['BHK', 'Rent', 'Size', 'Bathroom']
    df[numerical_columns] = scaler.fit_transform(df[numerical_columns])
    
    # Créer un vecteur de préférences utilisateur de la même dimension que nos colonnes pertinentes
    user_vector = np.zeros(len(relevant_columns))
    
    # Mettre à jour le vecteur avec les préférences
    for i, feature in enumerate(relevant_columns):
        if feature in user_preferences:
            user_vector[i] = user_preferences[feature]
    
    # Calculer la similarité cosinus
    similarities = cosine_similarity([user_vector], df.values)[0]
    
    # Obtenir les indices des maisons les plus similaires
    similar_indices = similarities.argsort()[-n_recommendations:][::-1]
    
    return data.iloc[similar_indices], similarities[similar_indices]

# Titre de l'application
st.title("🏠 Système de Recommandation de Locations")

try:
    # Charger les données
    data = load_data()
    
    # Interface utilisateur
    st.header("Vos Préférences")
    
    col1, col2 = st.columns(2)
    
    with col1:
        st.subheader("Critères Essentiels")
        
        # Préférences de base
        budget = st.slider("Budget maximum (₹)", 
                         min_value=int(data['Rent'].min()),
                         max_value=int(data['Rent'].max()),
                         value=int(data['Rent'].mean()))
        
        bhk = st.selectbox("Nombre de chambres (BHK)", 
                          sorted(data['BHK'].unique()))
        
        size_preference = st.slider("Taille souhaitée (sq. ft.)", 
                                  min_value=int(data['Size'].min()),
                                  max_value=int(data['Size'].max()),
                                  value=int(data['Size'].mean()))
        
        city = st.multiselect("Villes préférées",
                             options=sorted(data['City'].unique()),
                             default=[data['City'].mode()[0]])
    
    with col2:
        st.subheader("Préférences Supplémentaires")
        
        furnishing = st.selectbox("État d'ameublement",
                                options=sorted(data['Furnishing Status'].unique()))
        
        bathroom = st.selectbox("Nombre de salles de bain",
                              sorted(data['Bathroom'].unique()))
        
        area_type = st.selectbox("Type de zone",
                               sorted(data['Area Type'].unique()))
        
        tenant_type = st.selectbox("Type de locataire préféré",
                                 sorted(data['Tenant Preferred'].unique()))
    
    # Importance des critères
    st.subheader("Importance des critères")
    st.write("Définissez l'importance de chaque critère (0 = pas important, 1 = très important)")
    
    col3, col4 = st.columns(2)
    
    with col3:
        importance_rent = st.slider("Importance du budget", 0.0, 1.0, 0.8)
        importance_size = st.slider("Importance de la taille", 0.0, 1.0, 0.6)
        importance_bhk = st.slider("Importance du nombre de chambres", 0.0, 1.0, 0.7)
        importance_bathroom = st.slider("Importance des salles de bain", 0.0, 1.0, 0.5)
    
    with col4:
        importance_furnishing = st.slider("Importance de l'ameublement", 0.0, 1.0, 0.4)
        importance_area = st.slider("Importance du type de zone", 0.0, 1.0, 0.3)
        importance_tenant = st.slider("Importance du type de locataire", 0.0, 1.0, 0.2)
        importance_city = st.slider("Importance de la ville", 0.0, 1.0, 0.9)
    
    # Création du dictionnaire des préférences
    user_preferences = {
        'BHK': importance_bhk * (1 if bhk else 0),
        'Rent': importance_rent * (-1 if budget else 0),  # -1 pour préférer les prix plus bas
        'Size': importance_size * (1 if size_preference else 0),
        'Bathroom': importance_bathroom * (1 if bathroom else 0),
        'Furnishing Status': importance_furnishing,
        'Tenant Preferred': importance_tenant,
        'Area Type': importance_area,
        'City': importance_city
    }
    
    # Bouton pour obtenir les recommandations
    if st.button("Obtenir les recommandations"):
        # Filtrer d'abord les données selon les critères stricts
        filtered_data = data.copy()
        
        if budget:
            filtered_data = filtered_data[filtered_data['Rent'] <= budget]
        if city:
            filtered_data = filtered_data[filtered_data['City'].isin(city)]
        if bhk:
            filtered_data = filtered_data[filtered_data['BHK'] == bhk]
        
        if len(filtered_data) == 0:
            st.warning("Aucune propriété ne correspond à vos critères stricts. Essayez d'assouplir vos critères.")
        else:
            # Obtenir les recommandations
            recommendations, scores = get_recommendations(filtered_data, user_preferences)
            
            # Afficher les résultats
            st.header("Recommandations")
            
            for i, (_, house) in enumerate(recommendations.iterrows()):
                score = scores[i]
                
                with st.expander(f"Recommandation {i+1} (Score de similarité: {score:.2f})"):
                    col5, col6 = st.columns(2)
                    
                    with col5:
                        st.write(f"**Ville:** {house['City']}")
                        st.write(f"**Prix:** ₹{house['Rent']:,.2f}")
                        st.write(f"**Surface:** {house['Size']} sq. ft.")
                        st.write(f"**BHK:** {house['BHK']}")
                    
                    with col6:
                        st.write(f"**Ameublement:** {house['Furnishing Status']}")
                        st.write(f"**Type de zone:** {house['Area Type']}")
                        st.write(f"**Salles de bain:** {house['Bathroom']}")
                        st.write(f"**Type de locataire:** {house['Tenant Preferred']}")
            

except FileNotFoundError:
    st.error("Erreur: Impossible de trouver le fichier de données 'House_Rent_Dataset.csv'")