import express from "express";
import {authenticate} from "../middleware/authenticate.js";
import {authorizeModification} from "../middleware/authorize.js";
import { addMovie, deleteMovie, getWatchlist, updateMovie } from "../utils/db.js";

const router = express.Router();

router.get("/:userId", authenticate, (req, res) => {
    const { userId } = req.params;

    const data = getWatchlist(userId);

    res.status(200).json(data);

});

router.post("/:userId/movies", authenticate, authorizeModification, (req, res) => {

    const { userId } = req.params;

    const movieData = req.body;

    const movie = addMovie(userId, movieData);

    res.status(201).json(movie);
    
});

router.put("/:userId/movies/:movieId", authenticate, authorizeModification, (req, res) => {
    const { userId } = req.params;
    const movieId = Number(req.params.movieId);

    const update = req.body;

    const movie = updateMovie(userId, movieId, update);

    res.status(200).json(movie);
});

router.delete("/:userId/movies/:movieId", authenticate, authorizeModification, (req, res)=> {
    const {userId} = req.params;
    const movieId = Number(req.params.movieId);

    const deleted = deleteMovie(userId, movieId);
    
    res.status(200).json({message: "ok"});
});

export default router;
