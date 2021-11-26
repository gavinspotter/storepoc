import React from "react";

import freightImg from "../../../img/homepage-freight.jpg";

import "../../../css/style.css";

import cloud from "../../../img/generic-cloud.png";

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
        <img
          src={cloud}
          className="home-goods-header-img"
          alt="come shop with us at importbuyz.com"
        />
        <h1 className="home-goods-header-hey">Hey,</h1>
        <h1 className="home-goods-header">Shop with us!</h1>

        <img
          src={cloud}
          className="home-goods-header2-img2"
          alt="come shop with us at importbuyz.com"
        />
        <h1 className="home-goods-header2-hey2">Safe,</h1>
        <h1 className="home-goods-header2">
          {" "}
          <span className="colorGrey">and</span> smart!
        </h1>
      </div>
      <div className="home-inventory"></div>
    </div>
  );
};

export default Home;
