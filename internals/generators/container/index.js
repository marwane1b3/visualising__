/**
 * Container Generator
 */

const componentExists = require('../utils/componentExists');

module.exports = {
  description: 'Add a container component',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called?',
      default: 'Form',
      validate: (value) => {
        if (/.+/.test(value)) {
          return componentExists(value)
            ? 'A component or container with this name already exists'
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
      name: 'wantHeaders',
      default: false,
      message: 'Do you want headers?',
    },
    {
      type: 'confirm',
      name: 'wantActionsAndReducer',
      default: true,
      message:
        'Do you want an actions/constants/selectors/reducer tuple for this container?',
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
  ],
  actions: (data) => {
    // Generate index.tsx and index.test.ts
    const actions = [
      {
        type: 'add',
        path: '../../src/containers/{{properCase name}}/index.ts',
        templateFile: './container/index.js.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: '../../src/containers/{{properCase name}}/tests/index.test.ts',
        templateFile: './container/test.js.hbs',
        abortOnFail: true,
      },
    ];

    // If component wants messages
    if (data.wantMessages) {
      actions.push({
        type: 'add',
        path: '../../src/containers/{{properCase name}}/messages.ts',
        templateFile: './container/messages.js.hbs',
        abortOnFail: true,
      });
    }

    // If they want actions and a reducer, generate actions.ts, constants.ts,
    // reducer.ts and the corresponding tests for actions and the reducer
    if (data.wantActionsAndReducer) {
      // Actions
      actions.push({
        type: 'add',
        path: '../../src/containers/{{properCase name}}/actions.ts',
        templateFile: './container/actions.js.hbs',
        abortOnFail: true,
      });
      actions.push({
        type: 'add',
        path: '../../src/containers/{{properCase name}}/tests/actions.test.ts',
        templateFile: './container/actions.test.js.hbs',
        abortOnFail: true,
      });

      // Constants
      actions.push({
        type: 'add',
        path: '../../src/containers/{{properCase name}}/constants.ts',
        templateFile: './container/constants.js.hbs',
        abortOnFail: true,
      });

      // Selectors
      actions.push({
        type: 'add',
        path: '../../src/containers/{{properCase name}}/selectors.ts',
        templateFile: './container/selectors.js.hbs',
        abortOnFail: true,
      });
      actions.push({
        type: 'add',
        path:
          '../../src/containers/{{properCase name}}/tests/selectors.test.ts',
        templateFile: './container/selectors.test.js.hbs',
        abortOnFail: true,
      });

      // Reducer
      actions.push({
        type: 'add',
        path: '../../src/containers/{{properCase name}}/reducer.ts',
        templateFile: './container/reducer.js.hbs',
        abortOnFail: true,
      });
      actions.push({
        type: 'add',
        path: '../../src/containers/{{properCase name}}/tests/reducer.test.ts',
        templateFile: './container/reducer.test.js.hbs',
        abortOnFail: true,
      });
    }

    // Sagas
    if (data.wantSaga) {
      actions.push({
        type: 'add',
        path: '../../src/containers/{{properCase name}}/saga.ts',
        templateFile: './container/saga.js.hbs',
        abortOnFail: true,
      });
      actions.push({
        type: 'add',
        path: '../../src/containers/{{properCase name}}/tests/saga.test.ts',
        templateFile: './container/saga.test.js.hbs',
        abortOnFail: true,
      });
    }

    if (data.wantLoadable) {
      actions.push({
        type: 'add',
        path: '../../src/containers/{{properCase name}}/Loadable.ts',
        templateFile: './component/loadable.js.hbs',
        abortOnFail: true,
      });
    }

    actions.push({
      type: 'prettify',
      path: '/containers/',
    });

    return actions;
  },
};
