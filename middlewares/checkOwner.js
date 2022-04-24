const Movie = require('../models/movie');
const Forbidden = require('../errors/Forbidden');
const ErrorNotFound = require('../errors/ErrorNotFound');

module.exports = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(() => {
      throw new ErrorNotFound(`Нет фильма с id ${req.params.movieId}`);
    })
    .then((movie) => {
      if (JSON.stringify(movie.owner).replace(/"/g, '') !== req.user._id) {
        throw new Forbidden('Нет прав');
      }
      next();
    })
    .catch(next);
};
