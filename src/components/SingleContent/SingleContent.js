import {Link} from "react-router-dom";
import { img_300, unavailable } from "../../config/config";
import "./SingleContent.css";
import { Badge } from "@material-ui/core";




const SingleContent = ({
  id,
  poster,
  title,
  date,
  media_type,
  vote_average,
}) => {
  
 

  return (
    <div class="media" media_type={media_type} id={id}>
    <Badge
    className="badge"
      badgeContent={vote_average}
      color="secondary"
    />
    
    <Link to={'movies/' + title+ '/'+id} >
      <img
        className="poster"
        src={poster ? `${img_300}${poster}` : unavailable}
        alt={title}
      />
      </Link>  

    
      

      <b className="title">{title}</b>
      <span className="type">  {media_type}
       
      <span style={{paddingLeft:125, color : "Red"}}> {date}</span>
      </span>
    </div>
  );
};

export default SingleContent;
