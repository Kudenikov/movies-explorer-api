const router = require('express').Router();
const {
  celebrate,
  Joi,
} = require('celebrate');
const { isEmail } = require('validator');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const ErrorNotFound = require('../errors/ErrorNotFound');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom((value, helper) => {
      if (!isEmail(value)) {
        return helper.error('string.notEmail');
      }
      return value;
    }).messages({
      'string.notEmail': 'Email некорректный',
      'any.required': 'Email не указан',
    }),
    password: Joi.string().required().messages({
      'any.required': 'Пароль не указан',
    }),
  }),
}), login);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom((value, helper) => {
      if (!isEmail(value)) {
        return helper.error('string.notEmail');
      }
      return value;
    }).messages({
      'string.notEmail': 'Email некорректный',
      'any.required': 'Email не указан',
    }),
    password: Joi.string().required().messages({
      'any.required': 'Пароль не указан',
    }),
    name: Joi.string().required().min(2).max(30),
  }),
}), createUser);

router.use('/users', auth, require('./users'));
router.use('/movies', auth, require('./movies'));

router.use('/', auth, () => {
  throw new ErrorNotFound('Указан неверный путь');
});

module.exports = router;
