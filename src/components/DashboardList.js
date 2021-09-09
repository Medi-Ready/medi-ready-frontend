import React, { useEffect, useState } from "react";
import Dashboard from "./Shared/Dashboard";
import QRCode from "qrcode";

import styled from "styled-components";

const DashboardList = ({ userInfo }) => {
  const [src, setSrc] = useState("");
  const { user_id } = userInfo;

  useEffect(() => {
    const goToURL = async () => {
      const fetchUrl = await QRCode.toDataURL(`${process.env.REACT_APP_BASE_URL}/api/qrcode/${user_id}`);

      setSrc(fetchUrl);
    };

    goToURL();
  }, [src]);

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
        <img src={src} />
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
  width: 100px;
  height: 100px;

  img {
    max-width: 100%;
  }
`;

export default DashboardList;
