import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, useParams } from 'react-router';

import './movie-grid.scss';

import MovieCard from '../movie-card/MovieCard';
import Button, { OutlineButton } from '../button/Button';
import Input from '../input/Input'
import mylist from'../../assets/mylist.json'
import tmdbApi, { category, movieType, tvType } from '../../api/tmdbApi';
import { useStateValue } from '../../StateProvider';
import axios from 'axios';
import { actionTypes } from '../../reducer';

const MovieGrid = props => {

    const [items, setItems] = useState([]);

    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [{ wishlist }, dispatch] = useStateValue();
const [search, setSearch] = useState(true);
    const { keyword } = useParams();
    const {category}=props;
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
       const getList=async()=>{
         
               const payload= { "wishlist":wishlist };
               if(wishlist!=null){
                const response = await axios.post("http://127.0.0.1:5000/wishlist",payload)
                console.log(response.data);
                setItems(response.data)
               }
               
       }
       if(category=='wishlist'){
        getList();
        setSearch(false)
       }
       else{
        setItems(mylist[0])
       }
       
       
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

    return (
        <>
            <div className="section mb-3">
               {search?(<MovieSearch category={props.category} keyword={keyword}/>):('')} 
            </div>
            <div className="movie-grid">
                {
                    items.map((item, i) => <MovieCard category="movie" item={item} key={i}/>)
                }
            </div>
            {/* {
                page < totalPage ? (
                    <div className="movie-grid__loadmore">
                        <OutlineButton className="small" onClick={loadMore}>Load more</OutlineButton>
                    </div>
                ) : null
            } */}
        </>
    );
}

const MovieSearch = props => {

    const history = useHistory();

    const [keyword, setKeyword] = useState(props.keyword ? props.keyword : '');

    const goToSearch = useCallback(
        () => {
            if (keyword.trim().length > 0) {
                history.push(`/${category[props.category]}/search/${keyword}`);
            }
        },
        [keyword, props.category, history]
    );

    useEffect(() => {
        const enterEvent = (e) => {
            e.preventDefault();
            if (e.keyCode === 13) {
                goToSearch();
            }
        }
        document.addEventListener('keyup', enterEvent);
        return () => {
            document.removeEventListener('keyup', enterEvent);
        };
    }, [keyword, goToSearch]);

    return (
        <div className="movie-search">
            <Input
                type="text"
                placeholder="Enter keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />
            <Button className="small" onClick={goToSearch}>Search</Button>
        </div>
    )
}

export default MovieGrid;
