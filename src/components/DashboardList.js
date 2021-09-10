import React, { useEffect, useState } from "react";
import QRCode from "qrcode";

import styled from "styled-components";

import Dashboard from "./Shared/Dashboard";

const DashboardList = ({ userInfo }) => {
  const [qrUrl, setQrSrc] = useState("");
  const { user_id } = userInfo;

  useEffect(() => {
    const goToURL = async () => {
      const fetchUrl = await QRCode.toDataURL(String(user_id));

      setQrSrc(fetchUrl);
    };

    goToURL();
  }, [qrUrl]);

  return (
    <Wrapper>
      <h2>Dashboard</h2>

      <Dashboard
        src="/icon-chart.png"
        color="#EAEDFA"
        number={101}
        text="Total Visitis"
      />

      <Dashboard
        src="/icon-file.png"
        color="#FEF8ED"
        number={135}
        text="Total Prescriptions"
      />

      <QRCodeBox>
        <img src={qrUrl} />
      </QRCodeBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  height: 100%;
  box-sizing: border-box;
`;

const QRCodeBox = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 300px;
  height: 300px;

  img {
    max-width: 100%;
  }
`;

export default DashboardList;
