import { querAsync } from './../dbcon';
import mysql from 'mysql';
import express from 'express';
import { conn } from "../dbcon";

export const router = express.Router();

router.get("/", async (req, res) => {
    conn.query(mysql.format(`SELECT * FROM movie WHERE namemovie LIKE ?`, ['%' + req.query.s + '%']), (err, movies) => {
        if (err) throw err;
        
        conn.query(mysql.format(`SELECT * FROM person JOIN stars ON person.pid = stars.pid WHERE stars.mid IN (SELECT mid FROM movie WHERE namemovie LIKE ?)`, ['%' + req.query.s + '%']), (err, stars) => {
            if (err) throw err;

            conn.query(mysql.format(`SELECT * FROM person JOIN creators ON person.pid = creators.pid WHERE creators.mid IN (SELECT mid FROM movie WHERE namemovie LIKE ?)`, ['%' + req.query.s + '%']), (err, creators) => {
                if (err) throw err;

                res.json({
                    movies: movies.map((movie: any) => ({
                        ...movie,
                        Stars: stars.filter((star : any) => star.mid === movie.mid).map((star: any) => ({
                            pid: star.pid,
                        })),
                        Creators: creators.filter((creator: any) => creator.mid === movie.mid).map((creator: any) => ({
                            pid: creator.pid,
                        }))
                    }))
                })
            });
        });
    });
});