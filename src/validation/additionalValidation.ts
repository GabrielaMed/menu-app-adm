import * as yup from 'yup';

export const additionalSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required('Obrigatório informar nome do adicional.')
    .min(3, 'Nome do adicional deve ter pelo menos 3 caracteres.')
    .max(100, 'Nome do produto deve ter no máximo 100 caracteres.')
    .lowercase(),
  price: yup
    .number()
    .typeError('Obrigatório informar um valor.')
    .required('Obrigatório informar um valor.')
    .positive('Valor deve ser positivo e maior que zero.')
    .max(10, 'Valor deve conter no máximo 10 números.'),
});

export type AdditionalSchema = yup.InferType<typeof additionalSchema>;
