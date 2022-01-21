from flask import Flask, request, jsonify
import pickle
from flask_cors import CORS
import pandas as pd
app = Flask(__name__)

cors = CORS(app)

movies_list = pickle.load(open('movies.pkl', 'rb'))
movies = pd.DataFrame(movies_list)
print(movies)
similarity = pickle.load(open('similarity.pkl', 'rb'))


@app.route('/movies', methods=['GET'])
def recommend_movies():
    id = request.args.get('id')
    index = movies[movies['movie_id'] == int(id)].index[0]
    print(index)
    recommended_movie_names = []
    distances = sorted(
        list(enumerate(similarity[index])), reverse=True, key=lambda x: x[1])
    for i in distances[1:15]:
        recommended_movie_names.append(str(movies.iloc[i[0]].movie_id))

    return jsonify(recommended_movie_names)


if __name__ == '__main__':
    app.run(port=5000, debug=True)
