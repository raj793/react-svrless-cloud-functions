import React from 'react'
import { Form, Icon, Input, Button, Spin, notification } from 'antd';
import './form-base.css'
import { connect } from 'react-redux';
import Recaptcha from 'react-google-invisible-recaptcha';
import {fetchIpAddress} from '../../actions/ipAddressActions'
import {recaptchaSiteKey} from '../../constants/config'
import {sendForm, setFormValues, hideNotification} from '../../actions/formActions'

const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class CustomForm extends React.Component {

    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();

        //Set ip address on page mount
        this.props.dispatch(fetchIpAddress())
      }

      handleSubmit = (e) => {
        e.preventDefault();
        this.recaptcha.reset()
        this.props.form.validateFields((err, values) => {
          if (!err) {
            this.props.dispatch(setFormValues(values))
            this.recaptcha.execute()
          }
        });
      }

      onResolved = () => {
        const token = this.recaptcha.getResponse()
        this.props.dispatch(sendForm(this.props.ip, 
          navigator.userAgent, 
          this.props.values.fName, 
          this.props.values.lName, 
          this.props.values.email, 
          token))
      }

      render() {
        const {
          getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
        } = this.props.form;
        if(this.props.notification)
        {
          notification.open({
            message: 'Server Response',
            description: `${this.props.resp}`
          })
          this.props.dispatch(hideNotification())
        }
        // Only show error after a field is touched.
        const fNameError = isFieldTouched('fName') && getFieldError('fName');
        const lNameError = isFieldTouched('lName') && getFieldError('lName');
        const passwordError = isFieldTouched('email') && getFieldError('email');
        return (
          <Form layout="vertical" onSubmit={this.handleSubmit} className="login-form">
            <FormItem
              validateStatus={fNameError ? 'error' : ''}
              help={fNameError || ''}
            >
              {getFieldDecorator('fName', {
                rules: [{ required: true, message: 'Please input your first name!' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="First Name" />
              )}
            </FormItem>
            <FormItem
              validateStatus={lNameError ? 'error' : ''}
              help={lNameError || ''}
            >
              {getFieldDecorator('lName', {
                rules: [{ required: true, message: 'Please input your last name!' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Last Name" />
              )}
            </FormItem>
            <FormItem
              validateStatus={passwordError ? 'error' : ''}
              help={passwordError || ''}
            >
              {getFieldDecorator('email', {
                rules: [{ required: true, message: 'Please input your email!' }],
              })(
                <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} type="email" placeholder="Email" />
              )}
            </FormItem>
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                disabled={hasErrors(getFieldsError())}
                className="login-form-button"
              >
              <Recaptcha
                  ref={ ref => this.recaptcha = ref }
                  sitekey={recaptchaSiteKey}
                  onResolved={ this.onResolved } />
              {this.props.isLoading?
              <Spin indicator={<Icon type="loading" style={{ fontSize: 24, color: 'white' }} spin />} />:`Submit`}
              </Button>
            </FormItem>
          </Form>
        );
      }
    }

function mapStateToProps(store){
    return{
        ip: store.formReducer.ip,
        values: store.formReducer.values,
        isLoading: store.formReducer.isLoading,
        resp: store.formReducer.response,
        notification: store.formReducer.showNotification
    };
}

export default connect(mapStateToProps)(CustomForm)
