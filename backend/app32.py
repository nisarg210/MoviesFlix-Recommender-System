from flask import Flask, request, jsonify
import pickle
from flask_cors import CORS
import pandas as pd
import requests
import json
app = Flask(__name__)

cors = CORS(app)

movies_list = pickle.load(open('movies32K.pkl', 'rb'))
movies = pd.DataFrame(movies_list)
print(movies)
similarity = pickle.load(open('latest.pkl', 'rb'))
API_key = '2effdefc3ea56a2c730e827bc2f4e2e2'


def get_data(API_key, Movie_ID):
    query = 'https://api.themoviedb.org/3/movie/'+Movie_ID+'?api_key='+API_key+''
    response = requests.get(query)
    if response.status_code == 200:
        # status code ==200 indicates the API query was successful
        array = response.json()
        # text = json.dumps(array)

        return (array)
    else:
        return ("error")


@app.route('/movies', methods=['GET'])
def recommend_movies():
    id = request.args.get('id')
    index = movies[movies['id'] == int(id)].index[0]
    print(index)
    recommended_movie_names = []
    data = []
    # distances = sorted(
    #     list(enumerate(similarity[index])), reverse=True, key=lambda x: x[1])
    distances = similarity.iloc[index]
    for i in distances:
        recommended_movie_names.append(str(movies.iloc[i[0]].id))
    for movie in recommended_movie_names:
        text = get_data(API_key, movie)
        data.append(text)
    return jsonify(data)


@app.route('/wishlist', methods=['POST'])
def getDetail():
    request_data = request.get_json()

    id = request_data['wishlist']
    data = []
    for movie in id:
        movie = str(movie)
        text = get_data(API_key, movie)
        data.append(text)
    return jsonify(data)


if __name__ == '__main__':
    app.run(port=5000, debug=True)
