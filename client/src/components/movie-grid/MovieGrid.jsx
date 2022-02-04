import React, { useState, useEffect, useCallback } from "react";
import { useHistory, useParams } from "react-router";
import styled from "tachyons-components";
import "./movie-grid.scss";

import MovieCard from "../movie-card/MovieCard";
import Button, { OutlineButton } from "../button/Button";
import Input from "../input/Input";
import mylist from "../../assets/mylist.json";
import top100 from "../../assets/top100.json";
import tmdbApi, { category, movieType, tvType } from "../../api/tmdbApi";
import { useStateValue } from "../../StateProvider";
import axios from "axios";
import { actionTypes } from "../../reducer";
// import movies from '../../assets/movies32K.json'
import ReactLoading from "react-loading";
import { Dropdown } from "semantic-ui-react";
const MovieGrid = (props) => {
  const [items, setItems] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [{ wishlist,top_100 }, dispatch] = useStateValue();
  const [search, setSearch] = useState(true);
  const { keyword } = useParams();
  const { category } = props;
  const [searchv, setSearchv] = useState("");
  const [load, setLoad] = useState(false);
  let history = useHistory();

  const getmovies = async () => {
    setLoad(!load);
    history.push(`/movie/search/${searchv}`);
    try {
      const response = await axios.get(
        `https://moviesflix-recommend-api.herokuapp.com/search?name=${searchv}`
      );
      setItems(response.data);
    } catch (error) {
      console.error(error);
    }
    setLoad(false);
  };
  const randomList = () => {
    var arr = [];
    while (arr.length < 20) {
      var r = Math.floor(Math.random() * 100) + 1;
      if (arr.indexOf(r) === -1) arr.push(r);
    }
    console.log(arr);
    return arr;
  };
  useEffect(() => {
    // const getList = async () => {
    //     let response = null;
    //     if (keyword === undefined) {
    //         const params = {};
    //         switch(props.category) {
    //             case category.movie:
    //                 response = await tmdbApi.getMoviesList(movieType.upcoming, {params});
    //                 break;
    //             default:
    //                 response = await tmdbApi.getTvList(tvType.popular, {params});
    //         }
    //     } else {
    //         const params = {
    //             query: keyword
    //         }
    //         response = await tmdbApi.search(props.category, {params});
    //     }
    //     setItems(response.results);
    //     console.log(response.results)
    //    console.log(mylist[0],"hlsfdl");
    //     setTotalPage(response.total_pages);
    // }
    // const randomList = () => {
    //   var arr = [];
    //   while (arr.length < 20) {
    //     var r = Math.floor(Math.random() * 100) + 1;
    //     if (arr.indexOf(r) === -1) arr.push(r);
    //   }
    //   console.log(arr);
    //   return arr;
    // };
    const getAllDetail = async () => {
      let response = null;
      setLoad(!load);
      switch (category) {
        case "movie":
          setLoad(true);
          var arr = [];
          while (arr.length < 20) {
            var r = Math.floor(Math.random() * 100) + 1;
            if (arr.indexOf(r) === -1) arr.push(r);
          }
          console.log(arr);
          let res = [];
          arr.forEach((ids) => {
            console.log(top_100[ids].id);
            res.push(top_100[ids].id);
          });
          const resp = await axios.post(
            "https://moviesflix-recommend-api.herokuapp.com/movie/top",
            {
              top: res,
            }
          );
          console.log(resp.data, "newapi");
          response = resp.data;
          setLoad(false);
          break;
        case "wishlist":
          setSearch(false);
          const payload2 = { wishlist: wishlist };
          if (wishlist != null) {
            const res = await axios.post(
              "https://moviesflix-recommend-api.herokuapp.com/wishlist",
              payload2
            );
            response = res.data;
            console.log(response);
          }
      }
      setItems(response);
      setLoad(false);
    };

    getAllDetail();
    // const getList = async () => {
    //   const payload = { wishlist: wishlist };
    //   if (wishlist != null) {
    //     const response = await axios.post(
    //       "https://moviesflix-recommend-api.herokuapp.com/wishlist",
    //       payload
    //     );
    //     console.log(response.data);
    //     setItems(response.data);
    //   }
    // };
    // if (category == "wishlist") {
    //   getList();
    //   setSearch(false);
    // } else {
    //   setItems(mylist[0]);
    // }
  }, []);

  // const loadMore = async () => {
  //     let response = null;
  //     if (keyword === undefined) {
  //         const params = {
  //             page: page + 1
  //         };
  //         switch(props.category) {
  //             case category.movie:
  //                 response = await tmdbApi.getMoviesList(movieType.upcoming, {params});
  //                 break;
  //             default:
  //                 response = await tmdbApi.getTvList(tvType.popular, {params});
  //         }
  //     } else {
  //         const params = {
  //             page: page + 1,
  //             query: keyword
  //         }
  //         response = await tmdbApi.search(props.category, {params});
  //     }
  //     setItems([...items, ...response.results]);
  //     setPage(page + 1);
  // }
  const Article = styled("div")`
    w-25 ma2 h4 items-center justify-center flex flex-column flex-wrap`;
  const Prop = styled("h3")`
  f5 f4-ns mb0 white`;

  return (
    <>
      <div className="section mb-3">
        {search ? (
          <>
            <Input
              type="text"
              placeholder="Enter keyword"
              value={searchv}
              onChange={(e) => setSearchv(e.target.value)}
            />
            <Button className="small" onClick={getmovies}>
              Search
            </Button>
          </>
        ) : (
          ""
        )}
      </div>

      {load ? (
        <div className="loading">
          <ReactLoading
            type="cylon"
            height="500px"
            width="500px"
            color="#999999"
          />
        </div>
      ) : (
        <div className="movie-grid">
          {items.map((item, i) => (
            <MovieCard category="movie" item={item} key={i} />
          ))}
        </div>
      )}

      {}

      {/* {
                page < totalPage ? (
                    <div className="movie-grid__loadmore">
                        <OutlineButton className="small" onClick={loadMore}>Load more</OutlineButton>
                    </div>
                ) : null
            } */}
    </>
  );
};

// const MovieSearch = (props) => {
//   const history = useHistory();

//   const [keyword, setKeyword] = useState(props.keyword ? props.keyword : "");

//   const goToSearch = useCallback(() => {
//     if (keyword.trim().length > 0) {
//       history.push(`/${category[props.category]}/search/${keyword}`);
//     }
//   }, [keyword, props.category, history]);

//   useEffect(() => {
//     const enterEvent = (e) => {
//       e.preventDefault();
//       if (e.keyCode === 13) {
//         goToSearch();
//       }
//     };
//     document.addEventListener("keyup", enterEvent);
//     return () => {
//       document.removeEventListener("keyup", enterEvent);
//     };
//   }, [keyword, goToSearch]);

//   return (
//     <div className="movie-search">
//       <Input
//         type="text"
//         placeholder="Enter keyword"
//         value={keyword}
//         onChange={(e) => setKeyword(e.target.value)}
//       />
//       <Button className="small" onClick={goToSearch}>
//         Search
//       </Button>
//     </div>
//   );
// };

export default MovieGrid;
