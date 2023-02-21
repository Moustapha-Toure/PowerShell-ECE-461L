import Head from 'next/head';
import styles from '@/styles/Account.module.css';
import { Navbar } from '@/components/Components';
import Link from 'next/link';
import Zoom from 'react-reveal/Zoom';


export default function Account() {
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
                                <i><b style={{ fontSize: '3.5vw', textDecorationLine: 'underline ', color: 'white' }}>{`{Nickname}`}</b> 's Acount Detail</i>
                            </Zoom>
                                </h1>
                            <div className={styles.accountPageUserInfo}>
                                <div className={styles.accountPageDescription}>
                                    <p style={{ margin: '0' }}><u><i><b>Email</b></i></u> {` {nickname.nameNick@shell.org}`}</p>
                                </div>
                                <Link href='/'>
                                    <p className={styles.accountPageDescription} id={styles.accountToProjects}>Manage Projects</p>
                                </Link>
                                <p className={styles.accountPageDescription}><u><i><b>Total Projects:</b></i></u> {` {13}`}</p>
                            </div>
                        </div>
                        <div className={styles.accountInfoParent} id={styles.accountExtraButtonsParent}>
                            <div className={styles.extraButtonContainer} style={{ display: 'flex', alignItems: 'flex-end' }}>
                                <Link href='/'>
                                    <div className={styles.accountCreateNewButton}>
                                        <p>Create New Project</p>
                                    </div>
                                </Link>
                            </div>
                            <div className={styles.extraButtonContainer} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                <Link href='/'>
                                    <div className={styles.accountLogoutButton}>
                                        <p>Logout</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
