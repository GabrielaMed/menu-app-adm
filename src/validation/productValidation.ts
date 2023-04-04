import * as yup from 'yup';

export const productSchema = yup.object().shape({
  image: yup.mixed(),
  name: yup
    .string()
    .trim()
    .required('Obrigatório informar título')
    .min(3, 'Título deve ter pelo menos 3 caracteres.')
    .max(100, 'Título deve ter no máximo 100 caracteres.')
    .lowercase(),
  description: yup
    .string()
    .trim()
    .required('Obrigatório informar descrição')
    .min(3, 'Descrição do produto deve ter pelo menos 3 caracteres.')
    .max(500, 'Descrição do produto deve ter no máximo 500 caracteres.')
    .transform((description) => description.toLowerCase()),
  price: yup
    .number()
    .typeError('Obrigatório informar um valor.')
    .required('Obrigatório informar um valor')
    .positive('Valor deve ser positivo'),
});
