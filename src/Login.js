import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { auth } from './firebase';
import './login.css'

function Login() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = (e) =>{
        e.preventDefault();


        auth.signInWithEmailAndPassword(email,password)
        .then(auth =>{
            history.push('/');
        })
        .catch(error => alert(error.message));



        //Some fancy firebase login
    }

    const register = (e) =>{
        e.preventDefault();

        auth.createUserWithEmailAndPassword(email,password)
        .then((auth) =>{
            //it successfully created a new user wih email and password
            console.log(auth);
            if(auth){
                history.push('/');
            }
        })
        .catch(error => alert(error.message))

        //Here do some fancy firebase register
    }
    return (
        <div className='login'>
            <Link to='/'>
                <img className='login__logo'
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png' />
            </Link>

            <div className='login__container'>
                <h1>
                    Sign-in
                </h1>

                <form>
                    <h5>E-mail</h5>
                    <input type='text' value={email} onChange={e => setEmail(e.target.value)}/>

                    <h5>Password</h5>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)}/>


                    <button type='submit' onClick={signIn} className='login__signInButton'>Sign In </button>
                
                </form>

                <p>
                    By Signing-in you agree to the Amazon CLONE Conditions of Use & Sale. Please see our Privacy Notice, our Cookies Notice and our Internet-Based Ads Notice
                </p>
                <button onClick={register} className='login__registerButton'>Create your amazon Account</button>
            </div>
        </div>
    )
}

export default Login
