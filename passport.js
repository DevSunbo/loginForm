import passport from "passport";
import User from "./models/User";
import routes from "./routes";

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser(function(user, done){
    done(null, user);
}))
passport.deserializeUser(User.deserializeUser(function(user,done){
    done(null, user);
}))