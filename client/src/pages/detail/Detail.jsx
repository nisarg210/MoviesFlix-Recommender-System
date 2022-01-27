import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import tmdbApi from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";
import { actionTypes } from "../../reducer";
import "./detail.scss";
import CastList from "./CastList";
import VideoList from "./VideoList";

import MovieList from "../../components/movie-list/MovieList";
import axios from "axios";
import { useStateValue } from "../../StateProvider";
import ClipLoader from "react-spinners/ClipLoader";
import Button, { OutlineButton } from "../../components/button/Button";
import { fb } from "../../Firebase/firebase";
const Detail = () => {
  const { category, id } = useParams();

  const [item, setItem] = useState(null);
  const [{ recommend, loading, user, wishlist }, dispatch] = useStateValue();
  const [removed, setremoved] = useState(false);
  const addToList = async (user) => {
    let db = fb.firestore();
    const userRef = db.doc(`wishlist/${user.uid}`);
    if (removed) {
      console.log("entering removie");
      try {
        const arr = wishlist.filter(function (item) {
          return item != id;
        });
        console.log(arr);
        userRef.set({
          ids: arr,
        });
        
      } catch (error) {
        console.error(error);
      }
    } else {
      if (user) {
        console.log(user.uid);
        console.log(db);
        try {
          userRef.set({
            ids: [...wishlist, item.id],
          });
          
          console.log("done");
        } catch (error) {
          console.log(error);
        }
      }
    }
  };
  useEffect(() => {
    const getDetail = async () => {
      const response = await tmdbApi.detail(category, id, { params: {} });
      wishlist.forEach(ids => {
        if(ids==id)
        {
          setremoved(true);
        }
        else{
          setremoved(false)
        }
      });

     
      setItem(response);
      window.scrollTo(0, 0);
    };
    getDetail();
  }, [id, recommend,wishlist]);

  return (
    <>
      {item && (
        <>
          <div
            className="banner"
            style={{
              backgroundImage: `url(${apiConfig.originalImage(
                item.backdrop_path || item.poster_path
              )})`,
            }}
          ></div>
          <div className="mb-3 movie-content container">
            <div className="movie-content__poster">
              <div
                className="movie-content__poster__img"
                style={{
                  backgroundImage: `url(${apiConfig.originalImage(
                    item.poster_path || item.backdrop_path
                  )})`,
                }}
              ></div>
            </div>
            <div className="movie-content__info">
              <h1 className="title">{item.title || item.name}</h1>
              <div className="genres">
                {item.genres &&
                  item.genres.slice(0, 5).map((genre, i) => (
                    <span key={i} className="genres__item">
                      {genre.name}
                    </span>
                  ))}
              </div>
              <p className="overview">{item.overview}</p>
              <div className="cast">
                <div className="section__header">
                  <h2>Casts</h2>
                </div>
                <CastList id={item.id} />
              </div>
              <Button
                className="small"
                onClick={() => {
                  addToList(user);
                }}
              >
                {removed ? "Remove from list" : "Add to my list"}
              </Button>
            </div>
          </div>
          <div className="container">
            <div className="section mb-3">
              <VideoList id={item.id} />
            </div>

            <div className="section mb-3">
              <div className="section__header mb-2">
                <h2>Recommended based on search</h2>
              </div>
              <MovieList category={category} type="similar" id={item.id} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Detail;
