import React, { useState, useEffect, useRef } from 'react';

import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import Button, { OutlineButton } from '../button/Button';
import Modal, { ModalContent } from '../modal/Modal';
import top100 from '../../assets/top100.json'
import tmdbApi, { category, movieType } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

import './hero-slide.scss';
import { useHistory } from 'react-router';
import axios from 'axios';

const HeroSlide = () => {

    SwiperCore.use([Autoplay]);

    const [movieItems, setMovieItems] = useState([]);

    useEffect(() => {
        // const getMovies = async () => {
        //     const params = {page: 1}
        //     try {
        //         const response = await tmdbApi.getMoviesList(movieType.popular, {params});
        //         setMovieItems(response.results.slice(1, 4));
        //         console.log(response);
        //     } catch {
        //         console.log('error');
        //     }
        // }
        console.log(top100[10]);
        
        // const top3=top100.slice(0,3);
        // console.log(top3);
       const getMovies = async ()=>{
        //    let random_list=[]
        //    let data20={
        //        "0":[]
        //    }
        //    for (let i = 0; i < 20; i++) {
               
        //     random_list.push(i)
        //    }
        //    random_list.forEach(element => {
        //     axios.get(`https://api.themoviedb.org/3/movie/${top100[element].id}?api_key=2effdefc3ea56a2c730e827bc2f4e2e2`)
        //     .then(function(response) {
        //         data20[0].push(response.data)
        //     })
            
        //    });
        //    console.log(data20)

           
           
           try {
               let items=[]
            let random=Math.floor(Math.random() * (100 - 0 +    1));
               let response = await axios.get(`https://api.themoviedb.org/3/movie/${top100[random].id}?api_key=2effdefc3ea56a2c730e827bc2f4e2e2`)
               items.push(response.data)
                random=Math.floor(Math.random() * (100 - 0 +    1));
                response = await axios.get(`https://api.themoviedb.org/3/movie/${top100[random].id}?api_key=2effdefc3ea56a2c730e827bc2f4e2e2`)
               items.push(response.data)
                random=Math.floor(Math.random() * (100 - 0 +    1));
                response = await axios.get(`https://api.themoviedb.org/3/movie/${top100[random].id}?api_key=2effdefc3ea56a2c730e827bc2f4e2e2`)
               items.push(response.data)
               setMovieItems(items)
            console.log(items);
           } catch (error) {
               console.error(error);
           }
       }
        getMovies();
    }, []);

    return (
        <div className="hero-slide">
            <Swiper
                modules={[Autoplay]}
                grabCursor={true}
                spaceBetween={0}
                slidesPerView={1}
                // autoplay={{delay: 3000}}
            >
                {
                    movieItems.map((item, i) => (
                        <SwiperSlide key={i}>
                            {({ isActive }) => (
                                <HeroSlideItem item={item} className={`${isActive ? 'active' : ''}`} />
                            )}
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            {
                movieItems.map((item, i) => <TrailerModal key={i} item={item}/>)
            }
        </div>
    );
}

const HeroSlideItem = props => {

    let hisrory = useHistory();

    const item = props.item;

    const background = apiConfig.originalImage(item.backdrop_path ? item.backdrop_path : item.poster_path);

    const setModalActive = async () => {
        const modal = document.querySelector(`#modal_${item.id}`);

        const videos = await tmdbApi.getVideos(category.movie, item.id);

        if (videos.results.length > 0) {
            const videSrc = 'https://www.youtube.com/embed/' + videos.results[0].key;
            modal.querySelector('.modal__content > iframe').setAttribute('src', videSrc);
        } else {
            modal.querySelector('.modal__content').innerHTML = 'No trailer';
        }

        modal.classList.toggle('active');
    }

    return (
        <div
            className={`hero-slide__item ${props.className}`}
            style={{backgroundImage: `url(${background})`}}
        >
            <div className="hero-slide__item__content container">
                <div className="hero-slide__item__content__info">
                    <h2 className="title">{item.title}</h2>
                    <div className="overview">{item.overview}</div>
                    <div className="btns">
                        <Button onClick={() => hisrory.push('/movie/' + item.id)}>
                            Watch now
                        </Button>
                        <OutlineButton onClick={setModalActive}>
                            Watch trailer
                        </OutlineButton>
                    </div>
                </div>
                <div className="hero-slide__item__content__poster">
                    <img src={apiConfig.w500Image(item.poster_path)} alt="" />
                </div>
            </div>
        </div>
    )
}

const TrailerModal = props => {
    const item = props.item;

    const iframeRef = useRef(null);

    const onClose = () => iframeRef.current.setAttribute('src', '');

    return (
        <Modal active={false} id={`modal_${item.id}`}>
            <ModalContent onClose={onClose}>
                <iframe ref={iframeRef} width="100%" height="500px" title="trailer"></iframe>
            </ModalContent>
        </Modal>
    )
}

export default HeroSlide;
