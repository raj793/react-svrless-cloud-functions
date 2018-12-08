import React, { Component, Fragment } from 'react';
import { Form } from 'antd';
import './Root.css';
import CustomForm from './components/form/CustomForm'

class Root extends Component {

  render() {
    const WrappedForm = Form.create()(CustomForm)
    return(
      <Fragment>
        <div className="main">
          <div className="form-container">
            <WrappedForm />
          </div>
        </div>
      </Fragment>
    )
  }
}

export default Root;
