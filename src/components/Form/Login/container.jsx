import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { FORM_NAMES } from '~/configuration';
import { loginWithCognitoUserPool } from '~/state/actions/aws';
import { validateLoginForm as validate } from '~/util/validators';
import View from './view';
import type PropTypes from './view';

class LoginForm extends Component {
  render() {
    let props: PropTypes = this.props;
    return (
      <View {...props} />
    );
  }
}

let mapStateToProps = () => ({});
let mapDispatchToProps = (dispatch: Function) => ({
  dispatch,
  handlers: {
    form: {
      onSubmit: (event: Event) => {
        event.preventDefault();
        dispatch(loginWithCognitoUserPool());
      }
    }
  }
});

let form: string = FORM_NAMES.LOGIN;
let WrappedContainer = connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({form, validate})(LoginForm)
);

export default WrappedContainer;
