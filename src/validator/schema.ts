import * as yup from 'yup';

export const userSchema = yup.object({
  login: yup.string().required(),
  type: yup.string().oneOf(['Local', 'LDAP']).required(),
  password: yup.string().when('type', {
    is: () => 'Local',
    then: (schema) => schema.required(),
    otherwise: (schema) => schema.notRequired().nullable(),
  }),
});