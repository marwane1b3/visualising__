export const scope = 'app.screen.ExteriorAuth';

const messages = {
  google: {
    scope: `${scope}.google`,
    options: {
      defaultValue: 'Se connecter avec google',
    },
  },
  facebook: {
    scope: `${scope}.facebook`,
    options: {
      defaultValue: 'Se connecter avec Facebook',
    },
  },

  Mail: {
    scope: `${scope}.facebook`,
    options: {
      defaultValue: 'Se connecter avec E-mail',
    },
  },
  LoginFallback: {
    scope: `${scope}.login`,
    options: {
      defaultValue: "vous n'avez pas de compte ? ",
    },
  },
};

export default messages;
