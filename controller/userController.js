import passport from "passport";
import routes from "../routes";
import User from "../model/User";

export const getHome = (req, res) => {
    res.render("home", {pagetitle: "Home"});
}

export const getJoin = (req, res) => {
//    res.render("join", {pagetitle: "Join"});
    res.send("join success");
}

export const postJoin = async (req, res, next) => {
    const {
        body: {username, email, password, password2}
    } = req;
    console.log("body " + username);
    if(password !== password2){
        res.status(400);
        // res.render("join", {pagetitle: "Join"});
        res.send("Join fail");
    } else{
        try{
            console.log("1");
            const user = await User({
                username,
                email
            });
            await User.register(user, password);
            next();
        } catch(error){
            console.log(error);
            // res.redirect(routes.home);
            res.send(error);
        }
    }
}

export const getLogin = (req, res) => res.send("login success");

export const postLogin = passport.authenticate('local', {
    failureRedirect: routes.login,
    successRedirect: routes.home
})

export const logout = (req, res) => {
    req.logout();
    res.redirect(routes.home)
}