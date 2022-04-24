const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { isURL } = require('validator');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const checkOwner = require('../middlewares/checkOwner');

router.get('/', getMovies);

router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom((value, helper) => {
      if (!isURL(value, { require_protocol: true })) {
        return helper.error('string.notURL');
      }
      return value;
    }).messages({
      'string.notURL': 'Адрес некорректный',
      'any.required': 'Ссылка не указана',
    }),
    trailerLink: Joi.string().required().custom((value, helper) => {
      if (!isURL(value, { require_protocol: true })) {
        return helper.error('string.notURL');
      }
      return value;
    }).messages({
      'string.notURL': 'Адрес некорректный',
      'any.required': 'Ссылка не указана',
    }),
    thumbnail: Joi.string().required().custom((value, helper) => {
      if (!isURL(value, { require_protocol: true })) {
        return helper.error('string.notURL');
      }
      return value;
    }).messages({
      'string.notURL': 'Адрес некорректный',
      'any.required': 'Ссылка не указана',
    }),
    movieId: Joi.required(),
    nameRu: Joi.string().required(),
    nameEn: Joi.string().required(),
  }),
}), createMovie);

router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24),
  }),
}), checkOwner, deleteMovie);

module.exports = router;
