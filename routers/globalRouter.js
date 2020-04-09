import express from "express";
import routes from "../routes"
import passport from "passport";
import { getLogin, postLogin, getJoin, postJoin, getHome, logout } from "../controller/userController";

const globalRouter = express.Router();

globalRouter.get(routes.home, getHome);

globalRouter.get(routes.login, getLogin);
globalRouter.post(routes.login, postLogin);

globalRouter.get(routes.join, getJoin);
globalRouter.post(routes.join, postJoin);

globalRouter.get(routes.logout, logout);

export default globalRouter;