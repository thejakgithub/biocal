import React, { useState, useEffect } from "react";
import HeaderSidebar from "../../components/HeaderSidebar";
import CalendarEvent from "../../components/CalendarEvent";
import CountDashboard from "../../components/CountDashboard";
import Axios from "axios";
import base_url from "../../config/base_url";

export default function Dashboard() {
  const [countProject, setCountProject] = useState(0);
  const [countNews, setCountNews] = useState(0);
  const [countArticle, setCountArticle] = useState(0);
  const [countUser, setCountUser] = useState(0);
  const [countPayment, setCountPayment] = useState(0);

  useEffect(() => {
    Axios.get(`${base_url}/countProject`).then((res) => {
      setCountProject(res.data[0].countProject);
    });
    Axios.get(`${base_url}/countNews`).then((res) => {
      setCountNews(res.data[0].countNews);
    });
    Axios.get(`${base_url}/countArticle`).then((res) => {
      setCountArticle(res.data[0].countArticle);
    });
    Axios.get(`${base_url}/countUser`).then((res) => {
      setCountUser(res.data[0].countUser);
    });
    Axios.get(`${base_url}/countPayment`).then((res) => {
      setCountPayment(res.data[0].countPayment);
    });
  }, [countProject, countNews, countArticle, countUser, countPayment]);

  return (
    <>
      <div className="flex-column w-100 ">
        <HeaderSidebar />
        <div className="container  d-flex  mt-3  ">
          <div className="ms-1 me-3 ">
            <CountDashboard title="โครงการ/กิจกรรม" count={countProject} />
            <CountDashboard title="ข่าว/ประชาสัมพันธ์" count={countNews} />
            <CountDashboard title="บทความวิชาการ/วิจัย" count={countArticle} />
            <CountDashboard title="รายชื่อสมาชิก" count={countUser} />
            <CountDashboard title="ชำระเงินค่าลงทะเบียน" count={countPayment} />
          </div>
          <CalendarEvent />
        </div>
      </div>
    </>
  );
}
