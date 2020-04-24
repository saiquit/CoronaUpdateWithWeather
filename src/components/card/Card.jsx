import React from "react";
import "./card.css";
const Card = ({ props }) => {
  const getData = () => {
    const { date, global, countries } = props;
    console.log(props);

    return (
      <div className="card">
        <div className="card-image">
          <div className="background-image"></div>
          <div className="publication-details">
            <a href="#" className="author">
              <i className="fa fa-user"></i>
              Last Updated
            </a>
            <span className="date">
              <i className="fas fa-calendar-alt"></i> {date}
            </span>
          </div>
        </div>

        <div className="card-content">
          <h1 className="title">Global Summery</h1>
          <h2 className="subtitle">From CORONAVIRUS COVID19 API</h2>
          <ul className="global_inf">
            <li>
              Total Confirmed: <span>{global.TotalConfirmed}</span>
            </li>
            <li>
              New Confirmed: <span>{global.NewConfirmed}</span>
            </li>
            <li>
              Total Recovered: <span>{global.TotalRecovered}</span>
            </li>
            <li>
              Total Deaths: <span>{global.TotalDeaths}</span>
            </li>
          </ul>
          <div className="cta"></div>
        </div>
      </div>
    );
  };

  return <div>{getData()}</div>;
};

export default Card;
