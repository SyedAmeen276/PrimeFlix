import axios from "axios";
import { useParams } from "react-router";
import React, { useEffect, useState } from "react";
import MovieThumb from "./components/MovieThumb/MovieThumb"
import "./MoviePlay.css";
import { IMAGE_BASE_URL,BACKDROP_SIZE,POSTER_SIZE,img_300,noPicture } from "./config/config";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import SingleContent from "./components/SingleContent/SingleContent"
import { Link } from "react-router-dom";
import ReactHlsPlayer from 'react-hls-player';

import ReactPlayer from 'react-player'

export default function TransitionsModal() {
    // console.log(media_type);
    // console.log(id);
    const [credits, setCredits] = useState([]);
    const [content, setContent] = useState({});
    const [similar, setSimilar] = useState([]);
    const [movie, setMovie] = useState();
    const {title,id} = useParams()
      
    const fetchData = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );
   
  
      setContent(data);
        // console.log(data);
    
    };

    const fetchSimilar = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );
  
        setSimilar(data.results);
        console.log(data);
    
    };

    
  const fetchCredits = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setCredits(data.cast);
    // console.log(data)
  };


  const items = credits.map((c) => (
    <div className="carousel">
      <img
        src={c.profile_path ? `${img_300}/${c.profile_path}` : noPicture}
        alt={c?.name}
        className="carouselItem__img"
      />
      <p className="carouselItem__name">{c?.name}</p>
    </div>
  ));


    useEffect(() => {
      fetchData();
      fetchCredits();
      fetchSimilar();
      window.scroll(0, 0);
   
    }, []);

    const responsive = {
      0: { items: 1 },
      568: { items: 2 },
      1024: { items: 8 },
  };
    


  return(
        <>
          
           <div className="player">
           <iframe class="iframe-embed" width="100%" height="700" scrolling="no" frameborder="0"
  src={"https://www.2embed.ru/embed/tmdb/movie?id="+id}
  allowFullScreen="true" webkitallowfullscreen="true"
  mozallowfullscreen="true"></iframe>
           </div>
         
          <div className="rmdb-movieinfo"
      style={{
        background: content.backdrop_path ? `url('${IMAGE_BASE_URL}${BACKDROP_SIZE}${content.backdrop_path}')` : '#000'
      }}
      >
        <div className="rmdb-movieinfo-content">
        <div className="rmdb-movieinfo-thumb">
        <MovieThumb
           image={content.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${content.poster_path}` : './images/no_image.jpg'}
           clickable={false}
           />
        </div>
        <div className="rmdb-movieinfo-text">
        <h1>{content.original_title}</h1>
        <h3>PLOT</h3>
        <p>{content.overview}</p>
        <h3>IMDB RATING</h3>
        <div className="rmdb-rating">
            <meter min="0" max="100" optimum="100" low="40" high="70" value={content.vote_average * 10}></meter>
        <p className="rmdb-score">{content.vote_average}</p>
      </div>
      <h3 style={{textTransform: "uppercase", paddingBottom: "10px"}}> Total Duration: <span> {content.runtime}min </span></h3>
      <h3 style={{textTransform: "uppercase", paddingBottom: "10px"}}> Release Date: <span> {content.release_date} </span></h3>
      <h2> Genre</h2>
      {content.genres && content.genres.map((c)=>(
        <li style={{float: "left" ,listStyle: "none ", paddingRight: "15px",color: "green"}}> {c.name}</li>
      ))}
     
    </div>
    
    </div>
    </div>
    
 
        <div className="cast">
          <AliceCarousel
          mouseTracking
          items={items}
          responsive={responsive}
          controlsStrategy="alternate"
        autoPlay
        infinite
          disableButtonsControls
          disableDotsControls
            />
  
        </div>
        <div>
        <span className="similar">Similar Movies </span>
        <div className="trending">
        {similar  && similar.map((s) => (
            <SingleContent
              key={s.id}
              id={s.id}
              poster={s.poster_path}
              title={s.title || s.name}
              date={s.first_air_date || s.release_date}
              media_type={s.media_type==="movie"? "Movies":"Series"}
              vote_average={s.vote_average}
            />
          ))}
      </div>
        </div>
        

        
       
          
           
        </>
    )

  
  }
  