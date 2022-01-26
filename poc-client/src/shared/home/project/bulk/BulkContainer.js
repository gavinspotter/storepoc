import React, { useEffect, useState } from "react";

import { useHttpClient } from "../../../hooks/http-hook";
import BulkList from "./BulkList";

import "../../../../css/style.css";

const BulkContainer = () => {
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
    <div className="consumerGoods-block">
      {bulk && bulk.length === 0 && (
        <h1 className="consumerGoods-noGoods">Bulk Items Coming Soon!</h1>
      )}
      {bulk && <BulkList items={bulk} />}
    </div>
  );
};

export default BulkContainer;
