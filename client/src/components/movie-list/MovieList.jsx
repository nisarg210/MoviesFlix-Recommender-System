import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import "./movie-list.scss";

import { SwiperSlide, Swiper } from "swiper/react";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";

import Button from "../button/Button";

import tmdbApi, { category } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";

import MovieCard from "../movie-card/MovieCard";
import mylist from "../../assets/mylist.json";
import { useStateValue } from "../../StateProvider";
import axios from "axios";
import { actionTypes } from "../../reducer";

const MovieList = (props) => {
  const { id, type } = props;
  const [items, setItems] = useState([]);
  const [{ recommend, top, loading }, dispatch] = useStateValue();
  console.log(recommend, "mine");
  const [load, setLoad] = useState(false);
  useEffect(() => {
    const getRecomendation = async () => {
      if (type !== "similar") {
        dispatch({
          type: actionTypes.SET_RECOMMEND,
          recommend: top,
        });
      } else {
        setLoad(true);
        window.scrollTo(0, 0);
        const response = await axios.get(
          `https://moviesflix-recommend-api.herokuapp.com/movies?id=${id}`
        );
        console.log(response.data, "itsme");
        dispatch({
          type: actionTypes.SET_RECOMMEND,
          recommend: response.data,
        });
        setLoad(false);
        // try {
        //   const response = await axios.get(
        //     `https://moviesflix-recommend-api.herokuapp.com/movies?id=${id}`
        //   );
        //   console.log(response);
        //   let list = [];
        //   const ids = response.data;
        //   console.log(ids);
        //   const e = await ids.forEach(async (id) => {
        //     await axios
        //       .get(
        //         `https://api.themoviedb.org/3/movie/${id}?api_key=2effdefc3ea56a2c730e827bc2f4e2e2`
        //       )
        //       .then(function (response) {
        //         console.log("hihihi");
        //         list.push(response.data);
        //       });
        //   });
        //   console.log(list, "list");
        //   console.log(e);

        //     dispatch({
        //       type: actionTypes.SET_RECOMMEND,
        //       recommend: list,
        //     });

        // } catch (error) {
        //   console.log(error);
        // }
      }
    };
    getRecomendation();
  }, [id]);

  console.log(props.category);
  console.log(items, "in detail");
  return (
    <>
      {load ? (
        <div className="loading">
          <ReactLoading
            type="bubbles"
            height="200px"
            width="200px"
            color="#999999"
          />
        </div>
      ) : (
        <div className="movie-list">
          {" "}
          <Swiper grabCursor={true} spaceBetween={10} slidesPerView={"auto"}>
            {recommend.map((item, i) => (
              <SwiperSlide key={i}>
                <MovieCard item={item} category={props.category} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </>
  );
};

MovieList.propTypes = {
  category: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default MovieList;
