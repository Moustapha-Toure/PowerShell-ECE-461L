import Head from 'next/head'
import React, { useState, useEffect } from 'react';
import styles from '@/styles/login-signup.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useStateContext } from '@/context/StateContext'
import Cookies from 'universal-cookie';
import Link from 'next/link';

export default function Signup() {
    const store = new Cookies();
    const { currentUser, setCurrentUser, isAuthenticated, setIsAuthenticated, checkAuthentication, getUserUpdate, setUserProjects } = useStateContext();

    const [nickname, setNickname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setconfirmPassword] = useState("")

    const signUp = (event) => {
        event.preventDefault(); // prevent submit
        if (
            (password !== confirmPassword)
        ) {
            toast.warning(`Password and Confirm Password do not match!`, {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                pauseOnFocusLoss: false
            });
            return;
        }


        const userForm = {
            'Nickname': event.target.nickname.value,
            'email': event.target.email.value,
            'password': event.target.password.value
        }

        fetch('http://localhost:5000/signup', { method: 'POST', body: JSON.stringify(userForm) }).then((response) => {
            response.json().then((data) => {
                if (data['result'] != 'success') {
                    toast.error(`${data['summary']}`, {
                        position: "bottom-left",
                        autoClose: 10000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        pauseOnFocusLoss: false
                    });
                    toast.info(`Please login if user already exists!`, {
                        position: "bottom-left",
                        autoClose: 8000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        pauseOnFocusLoss: false

                    });
                    return;
                }

                // onUser(data)
                store.set('user', data['user'], { path: '/' });
                console.log(store.get('user'));
                toast.info(`${data['user']['Nickname']}`, {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    pauseOnFocusLoss: false,
                    newestOnTop: false,
                });
                toast.success(`Loggin in`, {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    pauseOnFocusLoss: false,
                    newestOnTop: false,
                });
                setTimeout(function () {
                    location.replace('/Home') // redirect to home page
                }, 1000);
                // alert(`Thank you ${data['user']['Nickname']}!\You have logged in successfully`)
            })
        }).catch((error) => {
            if (error.response) {
                console.log(error.response)
                console.log(error.status)
                console.log(error.headers)
            }
        })

        // 
        toast.info(`Welcome in ${nickname}`, {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            pauseOnFocusLoss: false
        });
        toast.success(`Creating New User`, {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            pauseOnFocusLoss: false
        });
        setTimeout(function () {
            location.replace('/Home') // redirect to home page
        }, 1000);
    }

    const ensureValid = (event) => {
        const key = event.key
        if (key === ' ' || key === '!') {
            toast.warning(`Input does not allow SPACE or '!'`, {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "color",
                pauseOnFocusLoss: false
            });
            event.currentTarget.value = event.currentTarget.value.replace(/[/\s!]/g, "")
            event.currentTarget.value = event.currentTarget.value.replace(/[/\s!]/g, "")
            return false;
        }
        return true;
    }
    return (
        <>
            <Head>
                <title>PowerShell</title>
                <meta name="description" content="The ECE-461L SP23 PowerShellTeam Site" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={`${styles.loginOrSignupBody} noselect`} id=''>
                <div className={styles.authContent}>
                    <h1 className={styles.pageTitle}>Come Join Us</h1>
                    <form onSubmit={signUp} id={styles.LoginForm}>
                        <input
                            required
                            id="loginNicknameInput"
                            className={styles.loginInput}
                            type="text"
                            name="nickname"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            placeholder="Nickname"
                        />
                        <input
                            required
                            id="loginEmailInput"
                            className={styles.loginInput}
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            onKeyUp={ensureValid}
                        />
                        <input
                            autocomplete="new-password"
                            required
                            id="loginPasswordInput"
                            className={styles.loginInput}
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            onKeyUp={ensureValid}
                        />
                        <input
                            autoComplete="off"
                            required
                            id="loginConfirmPasswordInput"
                            className={styles.loginInput}
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setconfirmPassword(e.target.value)}
                            placeholder="Confirm Password"
                        />
                        <input
                            type="submit"
                            value={`Create\nAccount`}
                            className={styles.authSubmitButton}
                        />
                    </form>

                    <Link href='/Login'>
                        <div className={styles.switchAuthContainer}>
                            <p className={styles.switchAuthMethod}>Already have an account?</p>
                            <p className={styles.switchPage}>Login</p>
                        </div>
                    </Link>
                </div>
            </main>
        </>
    )
}