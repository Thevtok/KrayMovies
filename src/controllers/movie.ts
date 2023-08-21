import axios from 'axios';
import * as https from 'https';
import { userAgent } from './config';
import { NextFunction as Next, Request, Response } from 'express';
import { scrapeMovieDetails, scrapeMovies } from '@/scrapers/movie';

type TController = (req: Request, res: Response, next?: Next) => Promise<void>;

/**
 * Controller for `/movies` route
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 */

export const latestMovies: TController = async (req, res) => {
    try {
        const { page = 0 } = req.query;

        const headers = {
            'User-Agent': userAgent,
            // Header lain sesuai kebutuhan
        };

        // Set opsi untuk mengabaikan verifikasi SSL
        const axiosRequest = await axios.get(
            `${process.env.LK21_URL}/latest${
                Number(page) > 1 ? `/page/${page}` : ''
            }`,
            {
                httpsAgent: new https.Agent({
                    rejectUnauthorized: false, // Ini akan mengabaikan verifikasi SSL
                }),
                headers: headers, // Menambahkan headers ke permintaan
            }
        );

        const payload = await scrapeMovies(req, axiosRequest);

        res.status(200).json(payload);
    } catch (err) {
        console.error(err);

        res.status(400).json(null);
    }
};

/**
 * Controller for `/popular/movies` route
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 */
export const popularMovies: TController = async (req, res) => {
    try {
        const { page = 0 } = req.query;
        const headers = {
            'User-Agent': userAgent,
            // Header lain sesuai kebutuhan
        };

        const axiosRequest = await axios.get(
            `${process.env.LK21_URL}/populer${
                Number(page) > 1 ? `/page/${page}` : ''
            }`,
            {
                httpsAgent: new https.Agent({
                    rejectUnauthorized: false, // Ini akan mengabaikan verifikasi SSL
                }),
                headers: headers, // Menambahkan headers ke permintaan
            }
        );

        // scrape popular movies
        const payload = await scrapeMovies(req, axiosRequest);

        res.status(200).json(payload);
    } catch (err) {
        console.error(err);

        res.status(400).json(null);
    }
};

/**
 * Controller for `/recent-release/movies` route
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 */
export const recentReleaseMovies: TController = async (req, res) => {
    try {
        const { page = 0 } = req.query;
        const headers = {
            'User-Agent': userAgent,
            // Header lain sesuai kebutuhan
        };

        const axiosRequest = await axios.get(
            `${process.env.LK21_URL}/release${
                Number(page) > 1 ? `/page/${page}` : ''
            }`,
            {
                httpsAgent: new https.Agent({
                    rejectUnauthorized: false, // Ini akan mengabaikan verifikasi SSL
                }),
                headers: headers, // Menambahkan headers ke permintaan
            }
        );

        const payload = await scrapeMovies(req, axiosRequest);

        res.status(200).json(payload);
    } catch (err) {
        console.error(err);

        res.status(400).json(null);
    }
};

/**
 * Controller for `/top-rated/movies` route
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 */
export const topRatedMovies: TController = async (req, res) => {
    try {
        const { page = 0 } = req.query;
        const headers = {
            'User-Agent': userAgent,
            // Header lain sesuai kebutuhan
        };

        const axiosRequest = await axios.get(
            `${process.env.LK21_URL}/rating${
                Number(page) > 1 ? `/page/${page}` : ''
            }`,
            {
                httpsAgent: new https.Agent({
                    rejectUnauthorized: false, // Ini akan mengabaikan verifikasi SSL
                }),
                headers: headers, // Menambahkan headers ke permintaan
            }
        );

        const payload = await scrapeMovies(req, axiosRequest);

        res.status(200).json(payload);
    } catch (err) {
        console.error(err);

        res.status(400).json(null);
    }
};

/**
 * Controller for `/movies/{movieId}` route
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 */
export const movieDetails: TController = async (req, res) => {
    try {
        const { id } = req.params;
        const headers = {
            'User-Agent': userAgent,
            // Header lain sesuai kebutuhan
        };

        const axiosRequest = await axios.get(`${process.env.LK21_URL}/${id}`, {
            httpsAgent: new https.Agent({
                rejectUnauthorized: false, // Ini akan mengabaikan verifikasi SSL
            }),
            headers: headers, // Menambahkan headers ke permintaan
        });

        const payload = await scrapeMovieDetails(req, axiosRequest);

        res.status(200).json(payload);
    } catch (err) {
        console.error(err);

        res.status(400).json(null);
    }
};
