import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { Navbar, HomeButton, Footer } from '../components/Components'
import { AnimationOnScroll } from 'react-animation-on-scroll';
import Slide from 'react-reveal/Slide';
import Rotate from 'react-reveal/Rotate';
import Zoom from 'react-reveal/Zoom';
import Flip from 'react-reveal/Flip';
import Link from 'next/link';


export default function Home() {

  return (
    <>
      <Head>
        <title>PowerShell</title>
        <meta name="description" content="The ECE-461L SP23 PowerShellTeam Site" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.loginOrSignupBody}, ${styles.noselect}`} id='login-or-signup-page-body'>
        <div className='navbar' id='homeNav'>
          <Navbar />
        </div>

        <div id={styles.homeContainer} className={`noselect`}>

          <div className={styles.HomeScrollContainer} id={styles.homeWelcomeContainer}>
            <Rotate top right>
              <div className={styles.dashButtonContainer} id={styles.navigateToDashboard}>
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
                  ... Nickname
                </h1>
              </Slide>
            </div>
          </div>


          <div className={styles.HomeScrollContainer} id={styles.newHomeProjectContainer}>
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
                <h1 className={styles.homeButton} id={styles.homeToHardware}>Add Button Component</h1>
              </Zoom>
            </div>
          </div>

          <div className={styles.HomeScrollContainer} id={styles.viewHomeProjectContainer}>
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
                <h1 className={styles.homeButton} id={styles.homeToProjects}>here</h1>
              </Zoom>
            </div>
          </div>

          <div className={styles.HomeScrollContainer} id={styles.getMoreRessources}>
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
        <Flip bottom>
          <Footer />
        </Flip>
      </main>
    </>
  )
}
