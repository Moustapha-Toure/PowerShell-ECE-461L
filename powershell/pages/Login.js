import Head from 'next/head'
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '@/styles/login-signup.module.css'
import Link from 'next/link';
import Cookies from 'universal-cookie';
import { useStateContext } from '@/context/StateContext'



export default function Login() {
    // const { currentUser, setCurrentUser, isAuthenticated, setIsAuthenticated, onUser } = useStateContext();
    const store = new Cookies();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [help, setHelp] = useState(false)



    const onLogin = (event) => {
        event.preventDefault(); // prevent submit
        const userForm = {
            'email': event.target.email.value,
            'password': event.target.password.value
        }

        fetch('http://localhost:5000/login', { method: 'POST', body: JSON.stringify(userForm) }).then((response) => {
            response.json().then((data) => {
                if (data['result'] != 'success') {
                    toast.info(`Failure summary: ${data['summary']}`, {
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
                    toast.info(`Please make sure all fields are correct!`, {
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
                    toast.error(`LOGIN Failed`, {
                        position: "bottom-left",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        pauseOnFocusLoss: false

                    });
                    // alert(`LOGIN Failed\nPlease make sure all fields are correct!\nFailure summary: ${data['summary']}`)
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
                    <h1 className={styles.pageTitle}>Welcome Back</h1>
                    <form onSubmit={(event) => onLogin(event)} id={styles.LoginForm}>
                        <input
                            required
                            id="loginEmailInput"
                            className={styles.loginInput}
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                        />
                        <input
                            required
                            id="loginPasswordInput"
                            className={styles.loginInput}
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        />
                        <input
                            type="submit"
                            value="Login"
                            className={styles.authSubmitButton}
                        />
                    </form>
                    <p id={styles.getHelp} onMouseEnter={() => setHelp(true)} onMouseLeave={() => setHelp(false)}>Forgot Password?</p>
                    {help &&
                        <>
                            <p id={styles.helpTxt}>Just try really hard to remember!</p>
                        </>
                    }
                    <Link href='/Signup'>
                        <div className={styles.switchAuthContainer}>
                            <p className={styles.switchAuthMethod}>Don't have an account?</p>
                            <p className={styles.switchPage}>Signup</p>
                        </div>
                    </Link>
                </div>
            </main>
        </>
    )
}


/*

const [help, setHelp] = useState(false)
    const [update, setUpdate] = useState(false)
    const [count, setCount] = useState(0)
    const [test , setTest] = useState('')
    let temp = {}

    useEffect(() => {
        if (update === true && count < 1) {
            // console.log('from effect')
            console.log(temp)
            setCount(1)
            setCurrentUser(temp)
            setIsAuthenticated(true)
            // console.log(currentUser)
        }
    }, currentUser, isAuthenticated)


    const demoGet = (event) => {
        event.preventDefault()
        const userForm = {
            'email': event.target.email.value,
            'password': event.target.password.value,
        }

        fetch('http://localhost:5000/sendForm', { method: 'POST', body: JSON.stringify(userForm) }).then((response) => {
            response.json().then((data) => {
                console.log(data.email)
                setTester(data.email)
            })
        })
    }




const demoSubmit = (event) => {
        event.preventDefault(); // prevent submit
        const userForm = {
            'email': event.target.email.value,
            'password': event.target.password.value
        }
        if (userForm['email'] == 'touremmoustapha@gmail.com') {
            if (userForm['password'] == 'Moussey') {
                const data = {
                    'result': 'success',
                    'summary': 'Login Successful',
                    'user': {
                        '_id': '6416334e8197aaecdab066c0', // This ID is actually a tring and not an ObjectId... it is converted to object ID in the backend
                        'Nickname': 'Mousey Moo',
                        'email': 'touremmoustapha@gmail.com', // in the frontend it is decrypted once logged in but in the backend it is encrypted
                        'password': ':&4460k', // Moussey but encrypted 30,1
                        'projects': ['641639d3393142c2bdaecf25', '64163a316bb8bd8e5965afce']
                    }
                }
                const user = data['user']
                // console.log('from func')
                // temp = user
                // console.log(temp)
                // updateUser(user)
                setCurrentUser(user, () => { })
                setIsAuthenticated(true)
                // setUpdate(true)

                // console.log('from login')
                // alert('bruh')
                alert(`Thank you ${data['user']['Nickname']}!\You have logged in successfully`)
                location.replace('/Home')
                return
            }
            const data = {
                'result': 'fail',
                'summary': 'Incorrect Password',
                'user': {}
            }
            alert(`LOGIN Failed\nPlease make sure all fields are correct!\nFailure summary: ${data['summary']}`)
            return
        }
        const data = {
            'result': 'fail',
            'summary': 'Incorrect Email',
            'user': {}
        }
        alert(`LOGIN Failed\nPlease make sure all fields are correct!\nFailure summary: ${data['summary']}`)
    }

    // useEffect(() => { // logged in user can't be here.. set up like this just for demo
    //     if (isAuthenticated === true) {
    //         location.replace('/Home')
    //     }
    // })





 */