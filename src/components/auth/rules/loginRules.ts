

const trigger = blur;

const loginRules = {
  email: [
    {
      required: true,
      message: 'Por favor ingrese su correo electrónico',
      trigger: trigger,
    },
    {
      type: 'email',
      message: 'Por favor ingrese un correo electrónico válido',
      trigger: trigger,
    }
  ],
  password: [
    {
      required: true,
      message: 'Por favor ingrese su contraseña',
      trigger: trigger,
    },
    {
      min: 6,
      message: 'La contraseña debe tener al menos 6 caracteres',
      trigger: trigger,
    },
  ],
} as Record<string, any>;

export default loginRules;