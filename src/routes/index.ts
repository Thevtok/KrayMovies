import { Router, IRouter } from 'express';
import { streamSeries, streamMovie } from '@/controllers/stream';
import { moviesByGenre, seriesByGenre, setOfGenres } from '@/controllers/genre';
import { moviesByYear, seriesByYear, setOfYears } from '@/controllers/year';
import { searchedMoviesOrSeries } from '@/controllers/search';
import {
    moviesByCountry,
    seriesByCountry,
    setOfCountries,
} from '@/controllers/country';

import {
    latestMovies,
    movieDetails,
    popularMovies,
    recentReleaseMovies,
    topRatedMovies,
} from '../controllers/movie';

import {
    latestSeries,
    popularSeries,
    recentReleaseSeries,
    seriesDetails,
    topRatedSeries,
} from '../controllers/series';

const router: IRouter = Router();

router.get('/movies/latest/:page', latestMovies);
router.get('/popular/movies/:page', popularMovies);
router.get('/recent-release/movies/:page', recentReleaseMovies);
router.get('/top-rated/movies/:page', topRatedMovies);
router.get('/movies/:id', movieDetails);

router.get('/movies/:id/streams', streamMovie);

router.get('/genres', setOfGenres);
router.get('/movies/genres/:genre/:page', moviesByGenre);
router.get('/series/genres/:genre/:page', seriesByGenre);

router.get('/countries', setOfCountries);
router.get('/movies/countries/:country/:page', moviesByCountry);
router.get('/series/countries/:country/:page', seriesByCountry);

router.get('/years', setOfYears);
router.get('/movies/years/:year/:page', moviesByYear);
router.get('/series/years/:year/:page', seriesByYear);

router.get('/series/latest/:page', latestSeries);
router.get('/popular/series/:page', popularSeries);
router.get('/recent-release/series/:page', recentReleaseSeries);
router.get('/top-rated/series/:page', topRatedSeries);
router.get('/series/:id', seriesDetails);

router.get('/series/:id/streams', streamSeries);

router.get('/search/:title', searchedMoviesOrSeries);

export default router;
