import Head from 'next/head'
import React, { useState, useEffect, useCallback } from 'react';
import styles from '@/styles/Home.module.css';
import { useStateContext } from '@/context/StateContext'
import { Navbar, HomeButton, Footer } from '@/components/Components'
import { AnimationOnScroll } from 'react-animation-on-scroll';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Slide from 'react-reveal/Slide';
import Rotate from 'react-reveal/Rotate';
import Zoom from 'react-reveal/Zoom';
import Flip from 'react-reveal/Flip';
import Fade from 'react-reveal/Fade';
import Cookies from 'universal-cookie';
import Link from 'next/link';


export default function Home() {
  const store = new Cookies();
  const { verifyAuthentication, setDisplayDashboard } = useStateContext();
  useEffect(() => { if (!verifyAuthentication()) { location.replace('/') } })
  const [user, setUser] = useState(() => {
    return store.get('user') || 'None'
  });

  const [Nickname, setNickname] = useState('Who are you?')
  useEffect(() => {
    if ((user) && (user !== undefined) && (user !== 'None')) {
      setNickname(user['Nickname'])

    }
  })

  const displayPossibilities = () => {
    toast.info(`Scroll Up`, {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      pauseOnFocusLoss: false
    });
  }

  // const [user, setUser] = useState(null)

  // useEffect(() => {
  //   if (currentUser !== null) {
  //     setNickname(currentUser.Nickname)
  //   }
  // }, currentUser)


  // const Nickname = 'Moussey Moo';
  // useEffect(() => { checkAuthentication() })

  return (
    <>
      <Head>
        <title>PowerShell</title>
        <meta name="description" content="The ECE-461L SP23 PowerShellTeam Site" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.homeBody}, noselect`} id='home-page-body'>
        <div className='navbar' id='homeNav'>
          <Navbar />
        </div>

        <div id={styles.homeContainer} className={`noselect`}>

          <div className={`${styles.HomeScrollContainer}, coverPage`} id={styles.homeWelcomeContainer}>
            <Rotate top right>
              <div className={styles.dashButtonContainer} id={styles.navigateToDashboard} onClick={displayPossibilities}>
                <div className={styles.diamondButton}>
                  <p className={styles.buttonText} id={styles.dashButton}>Dashboard</p>
                </div>
              </div>
            </Rotate>

            <div className={styles.welcomeMessage}>
              <Slide top>
                <h1 className={styles.welcomeText} id={styles.welcomeTo}>
                  Welcome To
                </h1>
              </Slide>
              <Slide left>
                <h1 className={styles.welcomeText} id={styles.welcomeYour}>
                  Your Shell
                </h1>
              </Slide>
              <Slide right>
                <h1 className={styles.welcomeText} id={styles.welcomeUser}>
                  ... {(Nickname != undefined) && (Nickname != null) && Nickname}
                </h1>
              </Slide>
            </div>
          </div>


          <div className={`${styles.HomeScrollContainer}, coverPage`} id={styles.newHomeProjectContainer}>
            <div className={styles.newHomeProjectMessage}>
              <Rotate bottom left>
                <h1 className={styles.newHomeProjectText} id={styles.newHomeProjectConstruct}>
                  Construct
                </h1>
              </Rotate>
              <Slide left>
                <h1 className={styles.newHomeProjectText} id={styles.newHomeProjectYour}>
                  your <i>new</i>
                </h1>
              </Slide>
              <Zoom right>
                <h1 className={styles.newHomeProjectText} id={styles.newHomeProjectProject}>
                  Project ...
                </h1>
              </Zoom>
              <Zoom bottom>
                <h1 className={styles.homeButton} id={styles.homeToHardware} onClick={() => {location.replace('/Projects/Create')}} >here</h1>
              </Zoom>
            </div>
          </div>

          <div className={`${styles.HomeScrollContainer}, coverPage`} id={styles.viewHomeProjectContainer}>
            <div className={styles.newHomeProjectMessage}>
              <Rotate bottom left>
                <h1 className={styles.newHomeProjectText} id={styles.viewHomeProjectConstruct}>
                  Explore
                </h1>
              </Rotate>
              <Slide left>
                <h1 className={styles.newHomeProjectText} id={styles.viewHomeProjectYour}>
                  your <i>current</i>
                </h1>
              </Slide>
              <Zoom right>
                <h1 className={styles.newHomeProjectText} id={styles.viewHomeProjectAssets}>
                  Assets ...
                </h1>
              </Zoom>
              <Zoom bottom>
                <h1 className={styles.homeButton} id={styles.homeToProjects} onClick={() => {setDisplayDashboard(true)}} >here</h1>
              </Zoom>
            </div>
          </div>

          <div className={`${styles.HomeScrollContainer}, coverPage`} id={styles.getMoreRessources}>
            <div className={styles.newHomeResourcesMessage}>
              <Rotate bottom left>
                <h1 className={styles.newHomeResourceText} id={styles.newHomeResourceNeed}>
                  Need
                </h1>
              </Rotate>
              <Slide left>
                <h1 className={styles.newHomeResourceText} id={styles.newHomeResourceMore}>
                  More
                </h1>
              </Slide>
              <Zoom right>
                <h1 className={styles.newHomeResourceText} id={styles.newHomeResourceResources}>
                  Resources?
                </h1>
              </Zoom>
            </div>

            <Flip left>
              <div className={styles.newHomeResourcesButton}>
                <div className={styles.homeCircleButton}>
                  <div className={styles.homeButtonLabel}>
                    <p className={styles.buttonLabel}>Checkout</p>
                    <p className={styles.buttonLabel}><b>more</b></p>
                    <p className={styles.buttonLabel}><b><i>Hardware</i></b></p>
                    <Link href='/'>
                      <p className={styles.buttonLabel}><i><u>Here</u></i></p>
                    </Link>
                  </div>
                </div>
              </div>
            </Flip>

          </div>
        </div>
        <Fade bottom>
          <Footer />
        </Fade>
      </main>
    </>
  )
}
