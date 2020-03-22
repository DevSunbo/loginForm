import passport from "passport";
import routes from "../routes";
import User from "../model/User";

export const getJoin = (req, res) => {
   res.render("join", {pagetitle: "Join"});
}

export const postJoin = async (req, res) => {
    const {
        body: {name, email, password, password2}
    } = req;
    if(password !== password2){
        res.status(400);
        res.render("join", {pagetitle: "Join"});
    } else{
        try{
            const user = await User({
                name,
                email
            });
            await User.register(user, password);
            next();
        } catch(error){
            console.log(error);
            res.redirect(routes.home);
        }
    }
}