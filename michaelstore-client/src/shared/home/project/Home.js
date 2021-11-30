import React, { useState, useEffect, useRef } from "react";

import freightImg from "../../../img/homepage-freight.jpg";

import "../../../css/style.css";

import cloud from "../../../img/generic-cloud.png";
import HomeBulkList from "./HomeBulkList";

import { useHttpClient } from "../../hooks/http-hook";
import ErrorModal from "../../UIElements/ErrorModal";
import HomeConsumerGoodsList from "./HomeConsumerGoodsList";
import ConsumerGoodsList from "./consumerGoods/ConsumerGoodsList";

const Home = (props) => {
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

  const [consumerGoodsList, setConsumerGoodsList] = useState();

  useEffect(() => {
    const fetchcg = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/admin/getConsumerItems`
        );

        setConsumerGoodsList(responseData.findConsumerItems);
      } catch (err) {}
    };

    fetchcg();
  }, [sendRequest]);

  const [height, setHeight] = useState(0);
  const ref = useRef(null);

  //   useEffect(() => {
  //     setHeight(ref.current.clientHeight)
  //   })

  console.log(ref);

  const cloudWrapper = useRef(null);

  console.log(cloudWrapper);

  const cloud1 = useRef(null);

  useEffect(() => {
    if (cloudWrapper.current != null) {
      console.log(cloudWrapper);
      const observer = new IntersectionObserver((entrys) => {
        entrys.forEach((entry) => {
          if (entry.isIntersecting) {
            cloud1.current.classList.add("cloudAnimation");
            return;
          }
        });
      });

      observer.observe(cloud1.current);
    }
  });

  return (
    <div className="ignore">
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
      <div ref={cloudWrapper} className="home-goods">
        <img
          ref={cloud1}
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
          <span className="colorGrey">and</span> easy!
        </h1>
      </div>
      <div className="home-inventory">
        <div className="home-inventory-bulkTitle">Bulk</div>
        <div className="home-inventory-bulkSlide">
          {bulk && <HomeBulkList items={bulk} />}
        </div>
        <div className="home-inventory-goodsTitle">Retail</div>
        <div className="home-of">
          <div className="home-inventory-goodsSlide">
            {consumerGoodsList && (
              <HomeConsumerGoodsList items={consumerGoodsList} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
