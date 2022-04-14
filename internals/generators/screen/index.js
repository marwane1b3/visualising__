/**
 * Container Generator
 */

const componentExists = require('../utils/componentExists');

module.exports = {
  description: 'Add a Screen component',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'Form',
      validate: (value) => {
        if (/.+/.test(value)) {
          return componentExists(value)
            ? 'A component or Screen with this name already exists'
            : true;
        }

        return 'The name is required';
      },
    },
    {
      type: 'confirm',
      name: 'memo',
      default: false,
      message: 'Do you want to wrap your component in React.memo?',
    },
    {
      type: 'confirm',
      name: 'wantActionsAndReducer',
      default: true,
      message:
        'Do you want an actions/constants/selectors/reducer tuple for this Screen?',
    },
    {
      type: 'confirm',
      name: 'wantSaga',
      default: true,
      message: 'Do you want sagas for asynchronous flows? (e.g. fetching data)',
    },
    {
      type: 'confirm',
      name: 'wantMessages',
      default: true,
      message: 'Do you want i18n messages (i.e. will this component use text)?',
    },
    {
      type: 'confirm',
      name: 'wantLoadable',
      default: true,
      message: 'Do you want to load resources asynchronously?',
    },
    {
      type: 'confirm',
      name: 'wantShowActivityIndicator',
      default: false,
      message:
        'Do you want to show ActivityIndicator with asynchronous loading?',
    },
  ],
  actions: (data) => {
    // Generate index.js and index.test.js
    const actions = [
      {
        type: 'add',
        path: '../../src/screens/{{properCase name}}/index.tsx',
        templateFile: './screen/index.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../../src/screens/{{properCase name}}/tests/index.test.js',
        templateFile: './screen/test.js.hbs',
        abortOnFail: true,
      },
    ];

    // If component wants messages
    if (data.wantMessages) {
      actions.push({
        type: 'add',
        path: '../../src/screens/{{properCase name}}/messages.ts',
        templateFile: './screen/messages.js.hbs',
        abortOnFail: true,
      });
    }

    // If they want actions and a reducer, generate actions.js, constants.js,
    // reducer.js and the corresponding tests for actions and the reducer
    if (data.wantActionsAndReducer) {
      // Actions
      actions.push({
        type: 'add',
        path: '../../src/screens/{{properCase name}}/actions.ts',
        templateFile: './screen/actions.js.hbs',
        abortOnFail: true,
      });
      actions.push({
        type: 'add',
        path: '../../src/screens/{{properCase name}}/tests/actions.test.js',
        templateFile: './screen/actions.test.js.hbs',
        abortOnFail: true,
      });

      // Constants
      actions.push({
        type: 'add',
        path: '../../src/screens/{{properCase name}}/constants.ts',
        templateFile: './screen/constants.js.hbs',
        abortOnFail: true,
      });

      // Selectors
      actions.push({
        type: 'add',
        path: '../../src/screens/{{properCase name}}/selectors.ts',
        templateFile: './screen/selectors.js.hbs',
        abortOnFail: true,
      });
      actions.push({
        type: 'add',
        path: '../../src/screens/{{properCase name}}/tests/selectors.test.js',
        templateFile: './screen/selectors.test.js.hbs',
        abortOnFail: true,
      });

      // Reducer
      actions.push({
        type: 'add',
        path: '../../src/screens/{{properCase name}}/reducer.ts',
        templateFile: './screen/reducer.js.hbs',
        abortOnFail: true,
      });
      actions.push({
        type: 'add',
        path: '../../src/screens/{{properCase name}}/tests/reducer.test.js',
        templateFile: './screen/reducer.test.js.hbs',
        abortOnFail: true,
      });
    }

    // Sagas
    if (data.wantSaga) {
      actions.push({
        type: 'add',
        path: '../../src/screens/{{properCase name}}/saga.ts',
        templateFile: './screen/saga.js.hbs',
        abortOnFail: true,
      });
      actions.push({
        type: 'add',
        path: '../../src/screens/{{properCase name}}/tests/saga.test.js',
        templateFile: './screen/saga.test.js.hbs',
        abortOnFail: true,
      });
    }

    if (data.wantLoadable && data.wantShowActivityIndicator) {
      actions.push({
        type: 'add',
        path: '../../src/screens/{{properCase name}}/Loadable.tsx',
        templateFile: './component/loadable.js.hbs',
        abortOnFail: true,
      });
    } else if (data.wantLoadable) {
      actions.push({
        type: 'add',
        path: '../../src/screens/{{properCase name}}/Loadable.ts',
        templateFile: './component/loadable.js.hbs',
        abortOnFail: true,
      });
    }

    actions.push({
      type: 'prettify',
      path: '/screens/',
    });

    return actions;
  },
};
