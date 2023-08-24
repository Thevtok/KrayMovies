import axios from 'axios';
import * as https from 'https';
import { userAgent } from './config';
import { NextFunction as Next, Request, Response } from 'express';
import { scrapeMovies } from '@/scrapers/movie';
import { scrapeSetOfYears } from '@/scrapers/year';
import { scrapeSeries } from '@/scrapers/series';

type TController = (req: Request, res: Response, next?: Next) => Promise<void>;

/**
 * Controller for `/years` route
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 */
export const setOfYears: TController = async (req, res) => {
    try {
        const headers = {
            'User-Agent': userAgent,
            // Header lain sesuai kebutuhan
        };

        const axiosRequest = await axios.get(
            `${process.env.LK21_URL}/rekomendasi-film-pintar`,
            {
                httpsAgent: new https.Agent({
                    rejectUnauthorized: false, // Ini akan mengabaikan verifikasi SSL
                }),
                headers: headers, // Menambahkan headers ke permintaan
            }
        );

        const payload = await scrapeSetOfYears(req, axiosRequest);

        res.status(200).json(payload);
    } catch (err) {
        console.error(err);

        res.status(400).json(null);
    }
};

/**
 * Controller for `/years/:year` route
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 */
export const moviesByYear: TController = async (req, res) => {
    try {
        const headers = {
            'User-Agent': userAgent,
            // Header lain sesuai kebutuhan
        };

        const { page = 0 } = req.params;
        const { year } = req.params;

        const axiosRequest = await axios.get(
            `${process.env.LK21_URL}/year/${year}/page/${page}`,
            {
                httpsAgent: new https.Agent({
                    rejectUnauthorized: false, // Ini akan mengabaikan verifikasi SSL
                }),
                headers: headers, // Menambahkan headers ke permintaan
            }
        );

        const payload = await scrapeSeries(req, axiosRequest);

        res.status(200).json(payload);
    } catch (err) {
        console.error(err);

        res.status(400).json(null);
    }
};

/**
 * Controller for `/years/:year` route
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 */
export const seriesByYear: TController = async (req, res) => {
    try {
        const headers = {
            'User-Agent': userAgent,
            // Header lain sesuai kebutuhan
        };

        const { page = 0 } = req.params;
        const { year } = req.params;

        const axiosRequest = await axios.get(
            `${process.env.ND_URL}/year/${year}/page/${page}`,
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
