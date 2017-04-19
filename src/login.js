import React, { Component } from 'react';
import { browserHistory } from 'react-router'
import { Form } from 'formsy-react'
import MyInput from './Components'
var auth = require('./auth')

class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            canSubmit:false,
            errors:''
        }
    }

    handleSubmit(data) {
        var lgn = auth.login(data['username'],data['password'])
        console.log(lgn)
        if(lgn===200){
            browserHistory.push('/admin/posts/')
        }else if(lgn===400){
            this.setState({
                errors:"Su usuario o contraseña no son correctos, porfavor verifiquelos"
            })
        }
    }

    enableButton() {
        this.setState({
            canSubmit: true
        })
    }

    disableButton() {
        this.setState({
            canSubmit: false
        })
    }

    render() {
            return (
                <div>
                    <Form onSubmit={this.handleSubmit.bind(this)} onValid={this.enableButton.bind(this)} onInvalid={this.disableButton.bind(this)} className="login">
                        <MyInput value="" name="username" title="Username" type="text" required />
                        <MyInput value="" name="password" title="Password" type="password" required />
                        <button type="submit" disabled={!this.state.canSubmit}>Submit</button>
                    </Form>
                <span>{this.state.errors}</span>
                </div>
            )
        }
}

export default Login;
