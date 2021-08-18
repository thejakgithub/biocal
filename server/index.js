const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const port = process.env.port || 4000;
const articleContent = require("./routes/api/articleContent");
const articles = require("./routes/api/articles");
const login = require("./routes/api/login");
const logout = require("./routes/api/logout");
const news = require("./routes/api/news");
const newsContent = require("./routes/api/newsContent");
const payment = require("./routes/api/payment");
const projectContent = require("./routes/api/projectContent");
const projects = require("./routes/api/projects");
const userproject = require("./routes/api/userproject");
const countProject = require("./routes/api/countProject");
const countNews = require("./routes/api/countNews");
const countArticle = require("./routes/api/countArticle");
const countUser = require("./routes/api/countUser");
const countPayment = require("./routes/api/countPayment");

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24 * 1000,
    },
  })
);

app.use("/articleContent" ,articleContent);
app.use("/newsContent" ,newsContent);
app.use("/projectContent" ,projectContent);
app.use("/login" ,login);
app.use("/logout" ,logout);
app.use("/articles" ,articles);
app.use("/news" ,news);
app.use("/projects" ,projects);
app.use("/userproject" ,userproject);
app.use("/payment" ,payment);
app.use("/countProject" ,countProject);
app.use("/countNews" ,countNews);
app.use("/countArticle" ,countArticle);
app.use("/countUser" ,countUser);
app.use("/countPayment" ,countPayment);


