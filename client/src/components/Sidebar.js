import React from "react";
import { NavLink, Link } from "react-router-dom";
import "../styles/styles.components/Sidebar.css";

export default function Sidebar({ user, logout }) {
  return (
    <>
      <h1 className="visually-hidden">Sidebars</h1>
      <div
        id="sidebarMenu"
        className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark sidebar"
      >
        <Link
          to="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white  px-2 "
        >
          <img src="/img/logo.png" alt="logo" width={40} height={40} />
          <span className="fs-4 px-2">BIOCAL</span>
        </Link>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <NavLink to="/admin/dashboard" className="nav-link text-white " >
              <i className="fas fa-home pe-3"></i>
              หน้าแรก
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/projectManage"
              className="nav-link text-white"
            >
              <i className="fab fa-product-hunt me-3"></i>
              โครงการ/กิจกรรม
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/newsManage" className="nav-link text-white">
              <i className="fas fa-newspaper me-3"></i>
              ข่าว/ประชาสัมพันธ์
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/articleManage" className="nav-link text-white">
              <i className="far fa-newspaper me-3"></i>
              บทความวิชาการ/วิจัย
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/userManage" className="nav-link text-white">
              <i className="fas fa-users me-3"></i>
              รายชื่อสมาชิก
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/paymentManage" className="nav-link text-white">
              <i className="fas fa-money-check me-3"></i>
              ชำระเงินค่าลงทะเบียน
            </NavLink>
          </li>
        </ul>
        <hr />
        <div className="d-flex justify-content-between">
          <strong>ADMIN : {user}</strong>
          <Link to="#" className="link fw-bold logout" onClick={logout}>
            logout
          </Link>
        </div>
      </div>
    </>
  );
}
