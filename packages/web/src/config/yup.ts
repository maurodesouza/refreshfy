import { setLocale } from 'yup';

export default setLocale({
  mixed: {
    required: 'Esse campo é obrigatório',
  },
  string: {
    email: 'O email esta mal formatado.',
  },
});
