import axios from "axios";

const Tv = () =>{
    let TMDB = require('tmdb-tv')("26ba5e77849587dbd7df199727859189");
    const fetchTrendingSeries = async () => {
        const { data } = await axios.get(TMDB.Search("Lucifer")
        );
    
        // setSeries(data.results);
         console.log(data)
      };

//     var results = await axios.get();
// //  results returns an array of shows.
// console.log(results);

// var Show = TMDB.Show(results[0].id);
// var show = await Show.GetDetails();
// console.log(show);
// show.seasons.forEach(async(season_no) => {
//     var Season = Show.Season(season_no);
//     var season = await Season.GetDetails();
//     console.log(season);
//     season.episodes.forEach(async(episode_no) => {
//         var Episode = Season.Episode(episode_no);
//         var episode = await Episode.GetDetails();
//         console.log(episode);
//     });
// });

    return(
        <>

        </>
    )
}
export default Tv;