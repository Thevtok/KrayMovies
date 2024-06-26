import axios from 'axios';
import * as https from 'https';
import { userAgent } from './config';
import { NextFunction as Next, Request, Response } from 'express';
import { scrapeSearchedMoviesOrSeries } from '@/scrapers/search';

type TController = (req: Request, res: Response, next?: Next) => Promise<void>;

/**
 * Controller for /search/:title` route
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 */
export const searchedMoviesOrSeries: TController = async (req, res) => {
    try {
        const headers = {
            'User-Agent': userAgent,
            // Header lain sesuai kebutuhan
        };
        const { title = '' } = req.params;

        const axiosRequest = await axios.get(
            `${process.env.ND_URL}/?s=${title}`,
            {
                httpsAgent: new https.Agent({
                    rejectUnauthorized: false, // Ini akan mengabaikan verifikasi SSL
                }),
                headers: headers, // Menambahkan headers ke permintaan
            }
        );

        const payload = await scrapeSearchedMoviesOrSeries(req, axiosRequest);

        res.status(200).json(payload);
    } catch (err) {
        console.error(err);

        res.status(400).json(null);
    }
};
