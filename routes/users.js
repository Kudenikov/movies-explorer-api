const router = require('express').Router();

const { celebrate, Joi } = require('celebrate');
const { isEmail } = require('validator');

const {
  getCurrentUser,
  updateUser,
} = require('../controllers/users');

router.get('/me', getCurrentUser);

router.patch('/me', celebrate({
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
    name: Joi.string().required().min(2).max(30),
  }),
}), updateUser);

module.exports = router;
