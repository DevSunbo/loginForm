import express from "express";
import routes from "../routes"
import passport from "passport";
import { getLogin, postLogin, getJoin, postJoin } from "../controller/userController";

const globalRouter = express.Router();

globalRouter.get(routes.login, getLogin);
globalRouter.post(routes.login, postLogin);

globalRouter.get(routes.join, getJoin);
globalRouter.post(routes.join, postJoin);