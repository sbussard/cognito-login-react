import { FORM_NAMES, ROUTES } from '~/configuration';
import { authenticateWithCognito } from '~/util/aws';
import { routeTo } from '~/util/route';
import { getSerializedLoginForm } from '~/state/selectors';

export let loginWithCognitoUserPool = () => (dispatch: Function, getState) => {
  let state = getState();
  let serializedLoginForm = getSerializedLoginForm(state);

  if ('syncErrors' in state.form[FORM_NAMES.LOGIN]) {
    throw new Error('Missing info in login form');
    return;
  }

  let attemptLogin = async () => {
    try {
      await authenticateWithCognito(serializedLoginForm);
      routeTo(ROUTES.DASHBOARD);
    } catch (err) {
      throw new Error(err);
    }
  };

  attemptLogin();
};
