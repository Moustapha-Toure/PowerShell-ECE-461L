import Head from 'next/head'
import styles from '@/styles/login-signup.module.css'
import { RectButton } from '../components/Components'
import Link from 'next/link';

export default function Home() {

  const bodyClasses = `${styles.loginOrSignupBody}, ${styles.noselect}`; // This is the other way you can add multiple classes. In the inline simply use {bodyClasses} instead

  return (
    <>
      <Head>
        <title>PowerShell</title>
        <meta name="description" content="The ECE-461L SP23 PowerShellTeam Site" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.loginOrSignupBody}, ${styles.noselect}`} id='login-or-signup-page-body'>
        <div className={styles.pageContainer}>
          <div className={styles.pageHeader}>
            <h1 className={styles.welcomeTitle}>Welcome to <u><b>PowerShell</b></u></h1>
            <h1 className={styles.welcomeSubTitle}>Get The Tools You Need</h1>
          </div>

          <div className={styles.chooseLoginOrSignup}>
            <div className={styles.buttonContainer} style={{ width: '55%', padding: '1vw' }}>
              <Link href='/Home'>
                <RectButton theme='light' label='Login' />
              </Link>
            </div>
            <div className={styles.buttonContainer} style={{ width: '55%', padding: '1vw' }}>
              <Link href='/Account'>
                <RectButton theme='dark' label='Signup' />
              </Link>
            </div>
          </div>

          <div className={styles.supportContainer}>
            <p>Need Support?</p>
          </div>
        </div>
      </main>
    </>
  )
}
