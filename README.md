# Fertilizer Prediction

## Overview
This project aims to predict the appropriate fertilizer type based on various soil and weather conditions. It utilizes machine learning techniques, specifically Random Forest Classifier and KMeans clustering, to make predictions.

## Installation
1. Clone the repository:

    ```
    git clone https://github.com/your_username/your_project.git
    ```

2. Navigate to the project directory:

    ```
    cd your_project
    ```

3. Install the required dependencies:

    ```
    pip install -r requirements.txt
    ```

## Usage
1. Run the Streamlit application:

    ```
    streamlit run app.py
    ```

2. Provide the required data inputs (temperature, humidity, rainfall, pH, nitrogen content, phosphorus content, potassium content, soil type) and click on the "Submit" button.
   
3. The application will display the suggested fertilizer type and crop based on the provided inputs.

## Files
- `app.py`: Streamlit application code for user interface.
- `Fertilizer_Prediction.csv`: Dataset containing soil and weather conditions.
- `requirements.txt`: List of Python packages required to run the application.
- `pipeline.pkl`: Pickled pipeline containing the trained Random Forest Classifier model for fertilizer prediction.
- `pipeline2.pkl`: Pickled pipeline containing the trained Random Forest Classifier model for crop prediction.
- `kmeans_model.pkl`: Pickled KMeans clustering model for soil classification.

## Credits
This project was created by Vidwan Gowda H M and Varshith R as a part of Machine Learning Assignment.



