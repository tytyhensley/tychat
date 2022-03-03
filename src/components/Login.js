import React from "react";
import { GoogleOutlined } from '@ant-design/icons';
import "firebase/app";
 import firebase from "firebase/app";
import { auth } from "../firebase";

const Login = () => {

    return (
        <div id='login-page'>
            <div id ="login-card">
                <h2>Welcome to TyChat!</h2>
                <br/><br/>
                <div 
                    className="login-button google"
                    onClick={() => auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())} //user will be redirected to the google sign in page
                >
                    <GoogleOutlined/> Sign In with Google
                </div>
            </div> 
        </div>
    );
}

export default Login;