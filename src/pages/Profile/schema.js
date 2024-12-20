import * as Yup from 'yup'

const schema = Yup.object({
  name: Yup.string().required('Nome é obrigatório'),
  email: Yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  password: Yup.string(),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('password')],
    'As senhas não conferem',
  ),
})

export default schema
