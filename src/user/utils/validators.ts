import Joi from "joi";
import Filter from "bad-words";

const filter = new Filter();
const passwordRegex = new RegExp("^[a-zA-Z0-9~!@#$%^&*()_-+=]{7,50}$");
const schema = Joi.object().keys({
  username: Joi.string().alphanum().min(3).max(15),
  email: Joi.string().email().min(5).max(50),
  password: Joi.string().min(7).max(50).pattern(passwordRegex),
});

export const validateUsername = (username: string) => {
  return schema.validate({ username }) && !filter.isProfane(username);
};

export const validateEmail = (email: string) => {
  return schema.validate({ email });
};

export const validatePassword = (password: string) => {
  return schema.validate({ password });
};
