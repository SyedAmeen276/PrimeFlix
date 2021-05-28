import axios from "axios";
import "./Trending.css";
import { useEffect, useState } from "react";
import SingleContent from "../../components/SingleContent/SingleContent";
import SeriesContent from "../../components/SeriesContent/SeriesContent";
import CustomPagination from "../../components/Pagination/CustomPagination";
import MoviesPlay from "../../MoviesPlay";

const Trending = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [series, setSeries] = useState([]);

  const fetchTrendingMovies = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
    );

    setContent(data.results);
    //  console.log(data)
  };

  const fetchTrendingSeries = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
    );

    setSeries(data.results);
     console.log(data)
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchTrendingMovies();
    fetchTrendingSeries();
    // eslint-disable-next-line
  }, [page]);
 

  return (
    <div >
      <span className="pageTitle">Trending Movies</span>
      <div className="trending">
        {content &&
          content.map((c) => (
            
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={c.media_type==="movie"? "Movies":"Series"}
              vote_average={c.vote_average}
            />
            
          ))}
      </div>
      <span className="pageTitle1">Trending Series</span>
      <div className="trending">
        {series &&
          series.map((c) => (
            
            <SeriesContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={c.media_type==="movie"? "Movies":"Series"}
              vote_average={c.vote_average}
            />
            
          ))}
      </div>
      <CustomPagination setPage={setPage} />
    </div>
  );
};

export default Trending;
