import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import styles from '@/styles/Account.module.css';
import { Navbar } from '@/components/Components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import Zoom from 'react-reveal/Zoom';
import Cookies from 'universal-cookie';
import { useStateContext } from '@/context/StateContext'



export default function Account() {
    const store = new Cookies();
    const { verifyAuthentication, setDisplayDashboard } = useStateContext();
    useEffect(() => { if (!verifyAuthentication()) { location.replace('/') } })
    const user = store.get('user');
    let Nickname = '';
    let email = '';
    let projects = [];
    if ((user) && (user !== undefined) && (user !== 'None')) {
        Nickname = user['Nickname']
        email = user['email']
        projects = user['projects']
    }
    // const [Nickname, setNickname] = useState(() => {
    //     if (user !== null) {
    //         return currentUser['Nickname']
    //     }
    //     else {
    //         return 'ooo'
    //     }
    // }
    // )

    // const [email, setEmail] = useState(() => {
    //     if (user !== null) {
    //         return currentUser['email']
    //     }
    //     else {
    //         return ''
    //     }
    // }
    // )
    // const [projects, setProjects] = useState(() => {
    //     if (user !== null) {
    //         return currentUser['project']
    //     }
    //     else {
    //         return []
    //     }
    // }
    // )

    // useEffect(() => {
    //     setNickname(currentUser['Nickname'])
    //     setEmail(currentUser['email'])
    //     setProjects(currentUser['projects'])
    // }, [Nickname, email, projects])

    // const projects = [1,2,3,4,5,6]

    const logout = () => {
        store.remove('user');
        store.remove('userProjects');
        toast.info(`See ya ${Nickname}`, {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            pauseOnFocusLoss: false
        });
        toast.success(`Logging out`, {
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
            location.replace('/') // redirect to login or signup
        }, 2000);
        // setCurrentUser({})
        // localStorage.setItem('currentUser', JSON.stringify({}))
        // setIsAuthenticated(false)
        // localStorage.setItem('isAuthenticated', JSON.stringify(false))
        // setUserProjects([])
        // localStorage.setItem('userProjects', JSON.stringify([]))
        // alert(`You have Successfully logged out`)
    }

    return (
        <>
            <Head>
                <title>PowerShell</title>
                <meta name="description" content="The ECE-461L SP23 PowerShellTeam Site" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={`${styles.accountBody}, ${styles.noselect}`} id='account-page-body'>
                <div className='navbar' id='accountNav'>
                    <Navbar />
                </div>
                <div id={styles.accountContainer} className={`noselect`}>
                    <div className={`${styles.HomeScrollContainer}, coverPage`} id={styles.accountNoScroll}>
                        <div className={styles.accountInfoParent} id={styles.userInfoParent}>
                            <h1 className={styles.accountPageUserInfo} id={styles.accountPageUser}>
                                <Zoom top>
                                    <i><b style={{ fontSize: '3.5vw', textDecorationLine: 'underline ', color: 'white' }}>{`${Nickname}`}</b> 's Acount Detail</i>
                                </Zoom>
                            </h1>
                            <div className={styles.accountPageUserInfo}>
                                <div className={styles.accountPageDescription}>
                                    <p style={{ margin: '0' }}><u><i><b>Email</b></i></u> {` ${email}`}</p>
                                </div>
                                <p className={styles.accountPageDescription} id={styles.accountToProjects} onClick={() => setDisplayDashboard(true)}>Manage Projects</p>
                                <p className={styles.accountPageDescription}><u><i><b>Total Projects:</b></i></u> {(projects !== null) && projects.length}</p>
                            </div>
                        </div>
                        <div className={styles.accountInfoParent} id={styles.accountExtraButtonsParent}>
                            <div className={styles.extraButtonContainer} style={{ display: 'flex', alignItems: 'flex-end' }}>
                                <Link href='/Projects/Create'>
                                    <div className={styles.accountCreateNewButton}>
                                        <p>Create New Project</p>
                                    </div>
                                </Link>
                            </div>
                            <div className={styles.extraButtonContainer} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                <div className={styles.accountLogoutButton} onClick={logout}>
                                    <p>Logout</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
