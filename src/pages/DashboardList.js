import React, { useEffect, useState } from "react";
import QRCode from "qrcode";
import styled from "styled-components";

import Dashboard from "../components/Shared/Dashboard";
import { PageTitle, PageContent } from "../components/Base";

const DashboardList = ({ userInfo }) => {
  const [qrUrl, setQrUrl] = useState("");
  const { user_id } = userInfo;

  useEffect(() => {
    const goToURL = async () => {
      const fetchUrl = await QRCode.toDataURL(String(user_id));

      setQrUrl(fetchUrl);
    };

    goToURL();
  }, [userInfo]);

  return (
    <PageContent>
      <PageTitle>Dashboard</PageTitle>

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
    </PageContent>
  );
};

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
