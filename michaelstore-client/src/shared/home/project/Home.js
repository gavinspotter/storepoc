import React, { useState, useEffect } from "react";

import freightImg from "../../../img/homepage-freight.jpg";

import "../../../css/style.css";

import cloud from "../../../img/generic-cloud.png";
import HomeBulkList from "./HomeBulkList";

import { useHttpClient } from "../../hooks/http-hook";
import ErrorModal from "../../UIElements/ErrorModal";

const Home = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [bulk, setBulk] = useState();

  useEffect(() => {
    const fetchBulk = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/admin/getBulk`
        );

        setBulk(responseData.findBulk);
        console.log(responseData.findBulk);
      } catch (err) {}
    };

    fetchBulk();
  }, [sendRequest]);

  return (
    <div>
      <ErrorModal error={error} onClear={clearError} />
      <div className="home-bench">
        <img
          className="home"
          src={freightImg}
          alt="we sell merchandise, welcome"
        />

        {freightImg && (
          <div className="home-header">
            <h1>importbuyz.com</h1>
          </div>
        )}
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
      <div className="home-inventory">
        <div className="home-inventory-bulkTitle">Bulk</div>
        <div className="home-inventory-bulkSlide">
          {bulk && <HomeBulkList items={bulk} />}
        </div>
      </div>
    </div>
  );
};

export default Home;
