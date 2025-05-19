import * as yup from 'yup';

export const userSchema = yup.object({
  login: yup.string().required(),
  password: yup.string().required(),
});