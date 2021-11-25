import React from "react";

import freightImg from "../../../img/homepage-freight.jpg";

import "../../../css/style.css";

const Home = () => {
  return (
    <div>
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
      <div className="home-goods">
        <h1 className="home-goods-header">Shop with us!</h1>
        <div>Bulk</div>
        <div></div>
      </div>
    </div>
  );
};

export default Home;
