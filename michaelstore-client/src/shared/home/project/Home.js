import React from "react";

import freightImg from "../../../img/homepage-freight.jpg";

import "../../../css/style.css";

const Home = () => {
  return (
    <div className="home-bench">
      <img
        className="home"
        src={freightImg}
        alt="we sell merchandise, welcome"
      />
      <div className="home-header">
        {" "}
        <h1>importbuyz.com</h1>
      </div>
    </div>
  );
};

export default Home;
