import axios from "axios";
import React, { useEffect, useState } from "react";

const Episode = ({ season_number}) =>{
    console.log(season_number);
    const [content, setContent] = useState({});
    const fetchData = async () => {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/tv/1668?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=season/${season_number}`
        );
     
    
        setContent(data);
        //  console.log(data);
      
      };

      useEffect(() => {
        fetchData();
        window.scroll(0, 0);
     
      }, [season_number]);
      return(
          <>
          <p> {content.season/{season_number} && content.season/{season_number}.episodes.map((e)=>(
              <button>{e.episode_number}</button>
          )) }</p>

          </>
      )

}

export default Episode;