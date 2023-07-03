import { WEBSITE_BASE_URL } from "../../../api/api";
import { Link } from "react-router-dom";
import "./MealItem.css"
const MealItem = (props) => {
  return (
    <>
      <div className="container">
        <div className="content">
          <Link to={`/meals-item/${props.id}`}>
            <div className="content-overlay"></div>
            <img
              className="content-image"
              src={WEBSITE_BASE_URL + props.image}
              alt={props.name}
            />
            <div className="content-details fadeIn-bottom">
              <h3 className="content-title">{props.name}</h3>
              <p className="content-text">{props.description}</p>
            </div>
          </Link>
        <h3 className="title">{props.name}</h3>
        </div>
      </div>
    </>
  );
};

export default MealItem;
