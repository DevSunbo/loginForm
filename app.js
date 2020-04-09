import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import routes from "./routes";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import globalRouter from "./routers/globalRouter";
import dotenv from "dotenv"
import { localsMiddleware } from "./middlewares";

dotenv.config();

import "./passport";


const app = express();

const CookieStore = MongoStore(session);

const connect = mongoose.connect(
    process.env.MONGO_URL,
    {
        useNewUrlParser: true, useUnifiedTopology: true,
        useCreateIndex: true, useFindAndModify: false
    }
).then(()=> console.log("connect to db"))
.catch(err => console.log(err));

app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan("dev"));
// app.use(express.session);
app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        resave: true,
        saveUninitialized: false,
        store: new CookieStore({
            mongooseConnection: mongoose.connection
        })
    })
);
// app.use(passport.initialize()); 설명
// cookieparser에서 정보가 담긴 cookie가 내려와서 passport는 초기화 되고 
// passport가 스스로 쿠키를 들여다봐서 쿠키 정보에 해당하는 사용자를 찾아줌
app.use(passport.initialize()); 
app.use(passport.session());


// app.use(localsMiddleware)

app.use(routes.home, globalRouter); // 이 구문이 없으면 join 페이지 404에러 왜 필요한 것인지 모르겠음


export default app;