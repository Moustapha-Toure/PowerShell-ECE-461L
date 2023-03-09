import Head from 'next/head'
import styles from '@/styles/Hardware.module.css'
import { Navbar, Footer, HardwareDisplay } from '@/components/Components'
import { AiFillStar } from 'react-icons/ai'
import { BsBagCheck } from 'react-icons/bs'
import Tada from 'react-reveal/Tada'
import Slide from 'react-reveal/Slide'


export const Wrenches = new URL('../Assets/Images/Hardware/Wrenches.jpg', import.meta.url);
export const Tools = new URL('../Assets/Images/Hardware/Power-tools.jpg', import.meta.url);

export default function Hardware() {
    return (
        <>
            <Head>
                <title>PowerShell</title>
                <meta name="description" content="The ECE-461L SP23 PowerShellTeam Site" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={`${styles.hardwareBody}, ${styles.noselect}`} id='hardware-page-body'>
                <div className='navbar' id='homeNav'>
                    <Navbar />
                </div>
                <div className='noselect' id={styles.hardwareParent}>
                    <div className={styles.hardwareSets}>

                        <HardwareDisplay hardwareName='Hardware Set 1' hardwareQTY='87' imageURL={Wrenches} />
                        <HardwareDisplay hardwareName='Hardware Set 2' hardwareQTY='20' imageURL={Tools} />
                        <HardwareDisplay hardwareName='Hardware Set 3' hardwareQTY='11' imageURL={Wrenches} />
                        <HardwareDisplay hardwareName='Hardware Set 4' hardwareQTY='14' imageURL={Tools} />
                        <HardwareDisplay hardwareName='Hardware Set 5' hardwareQTY='77' imageURL={Wrenches} />
                        <HardwareDisplay hardwareName='Hardware Set 6' hardwareQTY='37' imageURL={Tools} />
                        <HardwareDisplay hardwareName='Hardware Set 7' hardwareQTY='478' imageURL={Tools} />
                        <HardwareDisplay hardwareName='Hardware Set 8' hardwareQTY='90' imageURL={Wrenches} />
                        <HardwareDisplay hardwareName='Hardware Set 9' hardwareQTY='78' imageURL={Tools} />
                        <HardwareDisplay hardwareName='Hardware Set 10' hardwareQTY='23' imageURL={Wrenches} />
                        <HardwareDisplay hardwareName='Hardware Set 11' hardwareQTY='84' imageURL={Tools} />
                        <HardwareDisplay hardwareName='Hardware Set 12' hardwareQTY='83' imageURL={Wrenches} />
                        <HardwareDisplay hardwareName='Hardware Set 13' hardwareQTY='36' imageURL={Wrenches} />
                        <HardwareDisplay hardwareName='Hardware Set 14' hardwareQTY='1' imageURL={Tools} />
                        <HardwareDisplay hardwareName='Hardware Set 15' hardwareQTY='7' imageURL={Wrenches} />
                        <HardwareDisplay hardwareName='Hardware Set 16' hardwareQTY='10' imageURL={Wrenches} />
                        <HardwareDisplay hardwareName='Hardware Set 17' hardwareQTY='200' imageURL={Wrenches} />
                        <HardwareDisplay hardwareName='Hardware Set 18' hardwareQTY='40' imageURL={Tools} />
                        <HardwareDisplay hardwareName='Hardware Set 19' hardwareQTY='870' imageURL={Wrenches} />



                    </div>
                    <div className={styles.hardwareNavigations}>
                        <div className={styles.createNew}>
                            <div className={styles.createStar}>
                                <AiFillStar className={styles.theStar} />
                                <Slide left>
                                    <p className={styles.theCreateText}>Create</p>
                                    <p className={styles.theCreateDescription}>New Project</p>
                                </Slide>
                            </div>
                        </div>
                        <div className={styles.updateOld}>
                            <Slide right>
                                <p className={styles.theUpdateDescription}>Checkout to Specific Project</p>
                                <BsBagCheck className={styles.updateIcon} />
                            </Slide>
                        </div>
                    </div>
                </div>
                <Tada>
                    <Footer />
                </Tada>
            </main>
        </>
    );
}