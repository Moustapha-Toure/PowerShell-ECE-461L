import Head from 'next/head'
import styles from '@/styles/login-signup.module.css'
import { RectButton } from '../components/Components'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Link from 'next/link';

export default function Home() {

  const bodyClasses = `${styles.loginOrSignupBody}, noselect`; // This is the other way you can add multiple classes. In the inline simply use {bodyClasses} instead
  const suport = () => {
    toast.warning(`On Lunch Break`, {
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
    toast.warning(`Unavailable`, {
      position: "bottom-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      pauseOnFocusLoss: false
    });
  }
  return (
    <>
      <Head>
        <title>PowerShell</title>
        <meta name="description" content="The ECE-461L SP23 PowerShellTeam Site" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.loginOrSignupBody}, noselect`} id='login-or-signup-page-body'>
        <div className={`${styles.pageContainer}`}>
          <div className={styles.pageHeader}>
            <h1 className={styles.welcomeTitle}>Welcome to <u><b>PowerShell</b></u></h1>
            <h1 className={styles.welcomeSubTitle}>Get The Tools You Need</h1>
          </div>

          <div className={styles.chooseLoginOrSignup}>
            <div className={styles.buttonContainer} style={{ width: '55%', padding: '1vw' }}>
              <Link href='/Login'>
                <RectButton theme='light' label='Login' />
              </Link>
            </div>
            <div className={styles.buttonContainer} style={{ width: '55%', padding: '1vw' }}>
              <Link href='/Signup'>
                <RectButton theme='dark' label='Signup' />
              </Link>
            </div>
          </div>

          <div className={styles.supportContainer} onClick={suport}>
            <p>Need Support?</p>
          </div>
        </div>
      </main>
    </>
  )
}
