import Head from 'next/head'
import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Components';
import styles from '@/styles/Join.module.css'
import Cookies from 'universal-cookie';
import { useStateContext } from '@/context/StateContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function Join() {
    const { verifyAuthentication, setDisplayDashboard } = useStateContext();
    const store = new Cookies();
    const [user, setUser] = useState(() => {
        return store.get('user') || 'None'
    });
    const [projectID, setProjectID] = useState("")
    useEffect(() => { if (!verifyAuthentication()) { location.replace('/') } })

    const onJoin = (event) => {
        event.preventDefault(); // prevent submit
        const send = {
            'user': user,
            'projectID': event.target.projectID.value
        }

        fetch('http://localhost:5000/joinExisting', { method: 'POST', body: JSON.stringify(send) }).then((response) => {
            response.json().then((data) => {
                if (data['result'] != 'success') {
                    toast.info(`${data['summary']}`, {
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
                    toast.error(`Failed To join!`, {
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

                    return;
                }
                
                setDisplayDashboard(true) // open canvas so they can see the new project
                setProjectID("")
                let curUser = store.get('user')
                curUser['projects'].push(data['userUpdate'])
                store.set('user', curUser, { path: '/' })
                toast.info(`${data['summary']}`, {
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
                toast.success(`${data['result']}`, {
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
            <main className={`${styles.accountBody}, ${styles.noselect}`} id='create-page-body'>
                <div className='navbar' id='accountNav'>
                    <Navbar />
                </div>

                <div id={styles.joinContainer} className={`noselect coverPage`}>
                    <h1 className={styles.joinTitle}>Join an Existing Project</h1>
                    <div className={styles.projectHandling}>
                        <p className={styles.inputLabel}>Project ID:</p>
                        <form onSubmit={onJoin} id={styles.LoginForm}>
                            <input
                                required
                                id="joinIDInput"
                                className={styles.loginInput}
                                type="text"
                                name="projectID"
                                value={projectID}
                                onChange={(e) => setProjectID(e.target.value)}
                                placeholder="ENTER/PASTE Project ID"
                            />
                            <input
                                type="submit"
                                value="Join"
                                className={styles.joinButton}
                            />
                        </form>

                    </div>
                </div>
            </main>
        </>
    )
}
