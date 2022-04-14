import * as actions from './actions';
// @ponicode
describe('actions.signInSuccessAction', () => {
  test('0', () => {
    actions.signInSuccessAction('bed-free@tutanota.de');
  });

  test('1', () => {
    let result: any = actions.signInSuccessAction({
      username: 'ayoub',
      password: 'password',
    });
    expect(result).toEqual({
      type: 'app/SignInScreen/SIGN_IN_SUCCESS',
      user: {
        username: 'ayoub',
        password: 'password',
      },
    });
  });

  test('2', () => {
    let result: any = actions.signInSuccessAction(false);
    expect(result).toEqual({
      type: 'app/SignInScreen/SIGN_IN_SUCCESS',
      user: false,
    });
  });

  test('3', () => {
    let result: any = actions.signInSuccessAction(75);
    expect(result).toEqual({
      type: 'app/SignInScreen/SIGN_IN_SUCCESS',
      user: 75,
    });
  });

  test('4', () => {
    actions.signInSuccessAction('user@host:300');
  });

  test('5', () => {
    actions.signInSuccessAction(19);
  });

  test('6', () => {
    let result: any = actions.signInSuccessAction('bed-free@@tutanota.de');
    expect(result).toEqual({
      type: 'app/SignInScreen/SIGN_IN_SUCCESS',
      user: 'bed-free@@tutanota.de',
    });
  });

  test('7', () => {
    let result: any = actions.signInSuccessAction('email@Google.com');
    expect(result).toEqual({
      type: 'app/SignInScreen/SIGN_IN_SUCCESS',
      user: 'email@Google.com',
    });
  });
});
