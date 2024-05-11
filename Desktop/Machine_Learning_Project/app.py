import streamlit as st
import pickle
from sklearn.metrics.pairwise import euclidean_distances
import numpy as np
import pandas as pd

st.title("Fertilizer Preiction")

page = st.sidebar.radio("Navigation",['Home','About us'],index=0)

with open('pipeline.pkl', 'rb') as f:
    fertilizer_model = pickle.load(f)

with open('pipeline2.pkl', 'rb') as f:
    crop_model = pickle.load(f)

with open('kmeans_model.pkl', 'rb') as f:
    kmeans = pickle.load(f)

if page == 'Home':
    st.subheader('Provide the below data')

    temperature = st.number_input("Enter Temperature",step = 0.1)
    humidity = st.number_input("Enter humidity",step = 0.1)
    rainfall = st.number_input("Enter rainfall",step = 0.1)
    ph = st.slider("PH of soil",min_value=0.0,max_value= 14.0,value = 7.0,step =0.5)
    nitrogen = st.number_input("Enter Nitrogen content",step = 0.25)
    phosphorus = st.number_input("Enter phosphorus content",step = 0.25)
    potassium = st.number_input("Enter potassium content",step = 0.25)
    soil = st.selectbox("Choose the soil", ['Clayey', 'laterite', 'silty clay', 'sandy', 'coastal', 'clay loam', 'alluvial'])
    

    if st.button("Submit"): 
        df = {
            'Temperature': [temperature],
            'Humidity': [humidity],
            'Rainfall': [rainfall],
            'pH': [ph],
            'N': [nitrogen],
            'P': [phosphorus],
            'K': [potassium],
            'Soil': [soil]
        }
        data = pd.DataFrame(df)
        X3 = data[[ 'pH', 'N', 'P', 'K' ]]
        st.write(data)
        prediction1 = fertilizer_model.predict(data)
        prediction2 = crop_model.predict(data)
        prediction3 = kmeans.predict(X3)

        st.write("Suggested Fertilizer is: ",prediction1)
        st.write("Suggested Crop is: ",prediction2)
        
        if int(prediction3)==0:
            st.write("The soil is Unfertile an hence add large amount of fertilizer " )
        elif int(prediction3)==1:
            st.write("The soil is fertile an hence add moerate amount of fertilizer " )
        else:
            st.write("The soil is Contaminated an hence add less amount of fertilizer " )
if page == "About us":
    st.text("It is a Machine Learning Project built by - ")
    st.text("1. Vidwan Gowda H M (1MS21IS126)")
    st.text("2. Varshith R (1MS21IS124)")