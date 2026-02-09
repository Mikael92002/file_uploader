// const passport = require("passport");
// const LocalStrategy = require("passport-local");
// const bcrypt = require("bcryptjs");
// const pool = require("../db/pool");
import passport from "passport";
import {Strategy as LocalStrategy} from "passport-local";
import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";

declare global {
  namespace Express {
    interface User {
      id: number;
    }
  }
}

passport.use(
  new LocalStrategy(async (username: string, password: string, done) => {
    try {
      const user = await prisma.user.findUnique({
        where:{
            username: username,
        }
      })
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }),
);

passport.serializeUser((user,done)=>{
    done(null, user.id);
})

passport.deserializeUser(async (id: number, done)=>{
    try{
        const user = await prisma.user.findUnique({
            where:{
                id: id,
            }
        })
    }catch(err){
        done(err);
    }
})