import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { category, movieType, tvType } from '../api/tmdbApi';
import { OutlineButton } from '../components/button/Button';
import HeroSlide from '../components/hero-slide/HeroSlide';
import MovieList from '../components/movie-list/MovieList'
import mylist from '../assets/mylist.json'
const Home = () => {

    const [popular, setPopular] = useState([]);

    useEffect(() => {
      
    setPopular(mylist[1])
      
    }, []);
    
    return (
        <>
             <HeroSlide/>
             <div className="container">
                {/* <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Trending Movies</h2>
                        <Link to="/movie">
                            <OutlineButton className="small">View more</OutlineButton>
                        </Link>
                    </div>
                    <MovieList category={category.movie} type={movieType.popular}/>
                </div> */}

                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Popular</h2>
                        
                    </div>
                    <MovieList category={category.movie} type="popular" />
                </div>

                {/* <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Trending TV</h2>
                        <Link to="/tv">
                            <OutlineButton className="small">View more</OutlineButton>
                        </Link>
                    </div>
                    <MovieList category={category.tv} type={tvType.popular}/>
                </div>

                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Top Rated TV</h2>
                        <Link to="/tv">
                            <OutlineButton className="small">View more</OutlineButton>
                        </Link>
                    </div>
                    <MovieList category={category.tv} type={tvType.top_rated}/>
                </div> */}
            </div>

        </>
    )
}

export default Home
