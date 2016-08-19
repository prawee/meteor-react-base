import $ from 'jquery';
import 'jquery-validation';
import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import { getInputValue } from './get-input-value';


let component;

const login = () => {
    const email = getInputValue(component.refs.emailAddress);
    const password = getInputValue(component.refs.password);

    Meteor.loginWithPassword(email, password, (error) => {
      if (error) {
        Bert.alert(error.reason, 'warning');
      } else {
        Bert.alert('Logged in!', 'success');

        const { location } = component.props;
        if (location.state && location.state.nextPathname) {
            browserHistory.push(location.state.nextPathname);
        } else {
            browserHistory.push('/');
        }
      }
    });
};


const validate = () => {
  $(component.refs.login).validate({
      rules: {
          emailAddress: {
              required: true,
              email: true
          },
          password: {
              required: true
          }
      },
      messages: {
          emailAddress: {
              required: 'กรอกอีเมล์ด้วยจ๊ะ',
              email: 'รูปแบบต้องอยู่ในรูปแบบอีเมล์แบบนี้นะ admin@meteortricks.com?'
          },
          password: {
              required: 'กรอกรหัสผ่านด้วยสิจ๊ะ'
          }
      },
      submitHandler() {
          login();
      }
  });
};

export const handleLogin = (options) => {
  component = options.component;
  validate();
};

