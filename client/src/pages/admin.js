import React, { useEffect, useState } from "react";
import Axios from "axios";
import Sidebar from "../components/Sidebar";
import ProjectManage from "./admin/projectManage";
import NewsManage from "./admin/newsManage";
import ArticleManage from "./admin/articleManage";
import PaymentManage from "./admin/paymentManage";
import { Route, Switch, useHistory } from "react-router-dom";
import AddNews from "./admin/addNews";
import AddArticle from "./admin/addArticle";
import AddProject from "./admin/addProject";
import EditProject from "./admin/editProject";
import EditNews from "./admin/editNews";
import EditArticle from "./admin/editArticle";
import UserManage from "./admin/userManage";
import EditUser from "./admin/editUser";
import base_url from "../config/base_url";
import Dashboard from "./admin/dashboard";

export default function Admin() {
  let history = useHistory();
  Axios.defaults.withCredentials = true;

  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState("");

  useEffect(() => {
    Axios.get(`${base_url}/login`).then((response) => {
      if (response.data.loggedIn === true) {
        setIsLoading(true);
        setUser(response.data.user);
      } else {
        history.push("/");
        setIsLoading(false);
      }
    });
    return () => setIsLoading(false);
  }, [history]);

  const logout = (evt) => {
    evt.preventDefault();

    Axios.get(`${base_url}/logout`).then((response) => {
      if (response) {
        history.push("/");
        setIsLoading(false);
      }
    });
  };

  return (
    <>
      {isLoading && (
        <>
          <div className="d-flex ">
            <Sidebar user={user} logout={logout} />

            <Switch>
              <Route path="/admin/dashboard" >
                <Dashboard />
              </Route>
              <Route path="/admin/projectManage" exact>
                <ProjectManage />
              </Route>
              <Route path="/admin/newsManage" exact>
                <NewsManage />
              </Route>
              <Route path="/admin/articleManage" exact>
                <ArticleManage />
              </Route>
              <Route path="/admin/userManage" exact>
                <UserManage />
              </Route>
              <Route path="/admin/paymentManage" exact>
                <PaymentManage />
              </Route>
              <Route path="/admin/newsManage/addNews">
                <AddNews />
              </Route>
              <Route path="/admin/newsManage/editNews/:id">
                <EditNews />
              </Route>
              <Route path="/admin/articleManage/addArticle">
                <AddArticle />
              </Route>
              <Route path="/admin/articleManage/editArticle/:id">
                <EditArticle />
              </Route>
              <Route path="/admin/projectManage/addProject">
                <AddProject />
              </Route>
              <Route path="/admin/projectManage/editProject/:id">
                <EditProject />
              </Route>
              <Route path="/admin/userManage/editUser/:pjID/:userID">
                <EditUser />
              </Route>
            </Switch>
          </div>
        </>
      )}
    </>
  );
}
