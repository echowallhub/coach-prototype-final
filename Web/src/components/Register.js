import React from "react";
import { browserHistory } from "react-router";
import { Link } from 'react-router';
import cookie from 'react-cookie';

export class Register extends React.Component {

    constructor (props){
        super(props);
        this.state = {
            username : "",
            email: "",
            password: "",
            loading: false,
            errors: {},
            return_msg: ""
        };
    }


    render() {
        var style={
            page__wrapper:{
                'height': '100%',
                'width': '100%',
                'justify-content': 'center',
                'align-items': 'center',
                'display': 'flex',
                'padding-top':'40px'
            },
            form_wrapper:{
                'max-width': '325px',
                'width': '100%',
                'border': '2px solid #337AB5',
                'border-radius': '3px',
                'box-shadow': '0 1px 3px rgba(0,0,0,.25)',
                'backgroundColor': '#fff'
            },
            form_header:{
                'padding': '1em'
            },
            form_heading:{
                'text-align': 'center',
                'font-size': '1em',
                'user-select': 'none'
            },
            field_wrapper:{
                'width': '100%',
                'position': 'relative',
                'padding-top': '1.75em',
                'border-top': '2px solid #337AB5',
                'border-bottom': '2px solid #337AB5',
                'backgroundColor': '#fff'
            },
            field_wrapper2:{
                'width': '100%',
                'position': 'relative',
                'padding-top': '1.75em',
                'border-bottom': '2px solid #337AB5',
                'backgroundColor': '#fff'
            },
            field_input:{
                'position': 'relative',
                'padding': '1.625em 16px',
                'width': '100%',
                'color': 'black',
                'border': 'none',
                'outline': '0',
                'letter-spacing': '.05em'
            },
            field_label:{
                'position': 'absolute',
                'top': '0',
                'left': '0',
                'width': '100%',
                'padding': '16px',
                'padding-top': '20px',
                'padding-bottom': '0',
                'margin': '0',
                'z-index': '1',
                'font-size': '.8em',
                'color': 'black',
                'font-weight': '400',
                '-webkit-user-select': 'none',
                '-moz-user-select': 'none',
                '-ms-user-select': 'none',
                'user-select': 'none',
                'cursor': 'text'
            },
            submit_btn:{
                'border': '1px solid #337ab7',
                'padding': '.5em 1em',
                'border-radius': '3px',
                'backgroundColor': '#337ab7',
                'color': 'black',
                'display': 'block',
                'margin': '0 auto',
                'position': 'relative'
            },
            submit_btn_wrapper:{
                'width': '100%',
                'backgroundColor': '#fff',
                'padding': '2em 1em',
                'display': 'flex',
                'justify-content': 'center'
            },
            help_block:{
                'color': 'red',
                'fontSize': '20px',
                'textAlign': 'center',
                'fontWeight': '600'
            },
            help_block2:{
                'color': 'red',
                'textAlign': 'center',
                'fontWeight': '600'
            }
        };
        return (

            <div className="form-page__wrapper" style={style.page__wrapper}>

                <h1 style={style.help_block2}>{this.state.return_msg}</h1>

                <div className="form-page__form-wrapper" style={style.form_wrapper}>

                    <div className="form-page__form-header" style={style.form_header}>
                        <h2 className="form-page__form-heading" style={style.form_heading}>Register Page</h2>
                    </div>

                    <form className="form" onSubmit={this._onSubmit.bind(this)}>

                        <div className="form__field-wrapper" style={style.field_wrapper}>

                            <input type="text" name="username" id="username" onChange={this._onChange.bind(this)} className="form__field-input" placeholder="Enter..." style={style.field_input}/>

                            <label className="form__field-label" for="username" style={style.field_label}>Username</label>

                            <div className="help_block" style={style.help_block}>{this.state.errors.username}</div>

                        </div>

                        <div className="form__field-wrapper" style={style.field_wrapper2}>

                            <input type="password" name="password" id="password" onChange={this._onChange.bind(this)}  className="form__field-input" placeholder="••••••••••" style={style.field_input}/>

                            <label className="form__field-label" for="password" style={style.field_label}>Password</label>

                            <div className="help_block" style={style.help_block}>{this.state.errors.password}</div>

                        </div>

                        <div className="form__submit-btn-wrapper"  style={style.submit_btn_wrapper}>

                            <button className="form__submit-btn"
                                    type="submit"
                                    style={style.submit_btn}
                                    >Register</button>

                        </div>

                    </form>

                </div>

            </div>

        );
    }



    getInitialState() {
        return {username: "", password: "", loading: false, errors: {}}
    }

    _create() {

        return $.ajax({
            url: 'http://dev.syudo.site/auth/register',
            type: 'post',
            data: {
                user_name: this.state.username,
                password: this.state.password
            },
            dataType: 'JSON',
            beforeSend: function () {
                this.setState({loading: true});
            }.bind(this)
        })
    }

    _onSubmit(e) {
        e.preventDefault();
        var errors = this._validate();
        if(Object.keys(errors).length != 0) {
            this.setState({
                errors: errors
            });
            return;
        }
        var xhr = this._create();
        xhr.done(this._onSuccess.bind(this))
            .fail(this._onError.bind(this))
            .always(this.hideLoading.bind(this))
    }
    hideLoading() {
        // this.setState({loading: false});
    }
    _onSuccess(data) {


        console.log(data.is_success);

        if(data.is_success){


            this.props.router.push('/login');

        }else{

            this.setState({return_msg: data.msg});
        }


        //
        // this.refs.user_form.getDOMNode().reset();
        // this.setState(this.getInitialState());
        // show success message

    }
    _onError(data) {
        var message = "Failed to create the user";
        var res = data.responseJSON;
        if(res.message) {
            message = data.responseJSON.message;
        }
        if(res.errors) {
            this.setState({
                errors: res.errors
            });
        }
    }
    _onChange(e) {
        var states = {};
        states[e.target.name] = $.trim(e.target.value);
        this.setState(states);
    }
    _validate() {
        var errors = {};
        if(this.state.username == "") {
            errors.username = "Username is required";
        }
        // if(this.state.email == "") {
        //     errors.email = "Email is required";
        // }
        if(this.state.password == "") {
            errors.password = "Password is required";
        }
        return errors;
    }
    _formGroupClass(field) {
        var className = "form-group ";
        if(field) {
            className += " has-error"
        }
        return className;
    }


}