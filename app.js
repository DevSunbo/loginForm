import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";

const app = express();

const CookieStore = MongoStore(session);

app.use(helmet());
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan("dev"));
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

export default app;