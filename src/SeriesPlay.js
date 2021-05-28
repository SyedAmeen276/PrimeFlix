import { useParams } from "react-router"
import "./SeriesPlay.css"
import axios from "axios";
import React, { useEffect, useState } from "react";
import { IMAGE_BASE_URL,BACKDROP_SIZE,POSTER_SIZE,img_300,noPicture } from "./config/config";
import MovieThumb from "./components/MovieThumb/MovieThumb";
import Episode from "./Pages/Series/Episode";
import SingleContent from "./components/SingleContent/SingleContent"
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";



const SeriesPlay = () =>{
    
    const [content, setContent] = useState({});
    const [credits, setCredits] = useState([]);

    const [data, setData] = useState({});
    const [num, setNum] = useState({});
    const {title ,id,id2} = useParams();
    const [seasons, setSeasons] = useState(1);
    const [episode, setEpisode] = useState(1);
    const [similar, setSimilar] = useState([]);



    const fetchData = async () => {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=season/1`
        );
     
    
        setContent(data);
        //  console.log(data);
      
      };
      const fetchDatas = async () => {
        const { data } = await axios.get(
          `
          https://api.themoviedb.org/3/tv/${id}/season/${seasons}?api_key=26ba5e77849587dbd7df199727859189`
        );
     
    
        setData(data);
        // console.log(data);
      
      };
      const fetchSimilar = async () => {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/tv/${id}/similar?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        );
    
          setSimilar(data.results);
          // console.log(data);
      
      };
      const fetchCredits = async () => {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/tv/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        );
        setCredits(data.cast);
         console.log(data)
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
        fetchDatas();
        window.scroll(0, 0);
        fetchSimilar();
        fetchCredits();
        // console.log("effect");
     
      }, [seasons,num]);
      const responsive = {
        0: { items: 1 },
        568: { items: 2 },
        1024: { items: 8 },
    };

      const incEpisode = () =>{
        setEpisode(episode+1);
      }
      const nums = () =>{
        console.log(seasons);
      }

    return (
        <>
            
            {/* <div className="player">
           <iframe class="iframe-embed" width="100%" height="700" scrolling="no" frameborder="0"
  src={"https://www.2embed.ru/embed/tmdb/tv?id="+id+ "&s="+ seasons +"&e="+ episode}
  allowFullScreen="true" webkitallowfullscreen="true"
  mozallowfullscreen="true"></iframe>
    
           </div> */}
           
<iframe src="https://streamtape.to/e/meMOBaYO0RcbbLD/" width="100%" height="490" allowfullscreen allowtransparency allow="autoplay" scrolling="no" frameborder="0"></iframe>
           
           
           {/* { data.episodes && data.episodes.map((e)=>(
             <button key={e.episode_number} onClick={() => setEpisode(e.episode_number)} >{e.name}</button>
           ))} */}
         
        <div className="lists">
           <h1 style={{color:"green"}}>Seasons</h1>
        { (content.seasons  ) && content.seasons.map((s,i)=>(
          <>
          {i!=0 ? <p className="seasons" style={{display: "inline-flex", cursor: "pointer" ,padding:"10px",}} key={s.season_number} onClick={() => {setSeasons(s.season_number)
           setEpisode(1)}} >{s.name} - {s.air_date && s.air_date.split("-")[0]}</p>: " " }
           </>
            
        )) }

        
      
        <h1 style={{color:"green"}}>Episodes</h1>
        { data.episodes && data.episodes.map((e)=>(
             <p className="list episodes" style={{ cursor: "pointer",}} key={e.episode_number} onClick={() => setEpisode(e.episode_number)} >{e.episode_number}.{e.name}</p>
           ))}

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
        <h1 style={{color: "indianred"}}>{content.name}</h1>
        <h3 style={{color: "lightskyblue"}}>PLOT</h3>
        <p style={{color: "honeydew"}}>{content.overview}</p>
        <h3 style={{color: "lightskyblue"}}>IMDB RATING</h3>
        <div className="rmdb-rating">
            <meter min="0" max="100" optimum="100" low="40" high="70" value={content.vote_average * 10}></meter>
        <p className="rmdb-score">{content.vote_average}</p>
      </div>
      <h3 style={{textTransform: "uppercase", paddingBottom: "10px",color: "lightskyblue"}}> Total Duration: <span style={{color: "honeydew"}}> {content.episode_run_time}min </span></h3>
      <h2 style={{color: "lightskyblue"}}> Genre</h2>
      {content.genres && content.genres.map((c)=>(
        <li style={{float: "left" ,listStyle: "none ", paddingRight: "15px",color: "green"}}> {c.name}</li>
      ))}
     
        {/* {content.seasons && content.seasons.map((c)=>(
          <li> {c.episode_count}</li>
        ))} */}

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
         <span className="similar">Similar Series </span>
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
   
    


        </>
    )

}
export default SeriesPlay;