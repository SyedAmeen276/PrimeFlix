import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import SimpleBottomNavigation from "./components/MainNav";
import Movies from "./Pages/Movies/Movies";
import Series from "./Pages/Series/Series";
import Trending from "./Pages/Trending/Trending";
import Search from "./Pages/Search/Search";
import MoviesPlay from "./MoviesPlay";
import SeriesPlay from "./SeriesPlay";
import Tv from "./Tv";
import { Place } from "@material-ui/icons";
import Play from "./Play"
// import { Container } from "@material-ui/core";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="app">
        
          <Switch>
            <Route path="/" component={Trending} exact />
            <Route exact path="/movies/:title/:id" component={MoviesPlay} />
            <Route path="/movies" component={Movies} />
            <Route exact path="/series/:title/:id" component={SeriesPlay} />
            <Route path="/series" component={Series} />
            <Route path="/search" component={Search} />
            <Route path="/tv" component={Tv}/>
            {/* <Route path= "/Play" component={Play} /> */}
           
          </Switch>
      
      </div>
      
    </BrowserRouter>
  );
}

export default App;
