export const scope = 'app.screen.ExteriorAuth';

const messages = {
  google: {
    scope: `${scope}.google`,
    options: {
      defaultValue: "S'inscrire avec google",
    },
  },
  facebook: {
    scope: `${scope}.facebook`,
    options: {
      defaultValue: "S'inscrire avec Facebook",
    },
  },

  Mail: {
    scope: `${scope}.facebook`,
    options: {
      defaultValue: "S'inscrire avec E-mail",
    },
  },
  LoginFallback: {
    scope: `${scope}.login`,
    options: {
      defaultValue: 'vous avez un compte ? ',
    },
  },
};

export default messages;
