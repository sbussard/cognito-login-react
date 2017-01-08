import { combineReducers } from 'redux';
import { reducer as formReducer, formValueSelector } from 'redux-form';
import { FORM_NAMES } from '~/configuration';

let rootReducer = combineReducers({
  form: formReducer
});

export default rootReducer;

// root selectors (function of entire state)
export let getSerializedLoginForm = (state) => {
  let selector: string = formValueSelector(FORM_NAMES.LOGIN);
  return selector(state, 'username', 'password');
};
