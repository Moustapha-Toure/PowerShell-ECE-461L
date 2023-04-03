import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import { useStateContext } from '@/context/StateContext'
import styles from '@/styles/Hardware.module.css'
import { Navbar, Footer, HardwareDisplay } from '@/components/Components'
import { AiFillStar } from 'react-icons/ai'
import { BsBagCheck } from 'react-icons/bs'
import Tada from 'react-reveal/Tada'
import Cookies from 'universal-cookie';
import Slide from 'react-reveal/Slide'

export default function Hardware() {
    const store = new Cookies();

    const { checkAuthentication } = useStateContext();
    useEffect(() => { checkAuthentication() })
    // vvvvvv CHANGE WITH BACKEND LATER vvvvvv //

    const [hardwareSets, setHardwareSets] = useState([]);
    const [fetched, setFetched] = useState(false)



    useEffect(() => {
        if (!fetched) {
            fetch('http://localhost:5000/getHardwareSets', { method: 'POST' }).then((response) => {
                response.json().then((data) => {
                    setHardwareSets(data['hardwareSets']);
                    setFetched(true)
                })
            }).catch((error) => {
                if (error.response) {
                    console.log(error.response)
                    console.log(error.status)
                    console.log(error.headers)
                }
            })
        }
    })

    // let testingHWSets = [
    //     { "SetName": "Hardware Set 1", "Availability": "9", "Capicity": "300", "setImage": { Wrenches } },
    //     { "SetName": "Hardware Set 2", "Availability": "98", "Capicity": "370", "setImage": { Tools } },
    //     { "SetName": "Hardware Set 3", "Availability": "32", "Capicity": "890", "setImage": { Wrenches } },
    //     { "SetName": "Hardware Set 4", "Availability": "34", "Capicity": "500", "setImage": { Tools } },
    //     { "SetName": "Hardware Set 5", "Availability": "78", "Capicity": "500", "setImage": { Wrenches } },
    //     { "SetName": "Hardware Set 6", "Availability": "287", "Capicity": "400", "setImage": { Wrenches } },
    // ]
    // setHardwareSets(testingHWSets);
    // ^^^^^^ CHANGE WITH BACKEND LATER ^^^^^^ //

    return (
        <>
            <Head>
                <title>PowerShell</title>
                <meta name="description" content="The ECE-461L SP23 PowerShellTeam Site" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={`${styles.hardwareBody}, noselect`} id='hardware-page-body'>
                <div className='navbar' id='homeNav'>
                    <Navbar />
                </div>
                <div className='noselect' id={styles.hardwareParent}>
                    <div className={styles.hardwareSets}>

                        {hardwareSets.length >= 1 && hardwareSets.map((hardwareSet) =>
                            <>
                                <div className={styles.setDiv}>
                                    <HardwareDisplay set={hardwareSet} />
                                </div>
                            </>
                        )}

                        {hardwareSets.length === 0 &&
                            <>
                                <p style={{ color: 'whitesmoke', fontSize: '4vw', textAlign: 'center' }}>No Sets Yet</p>
                            </>
                        }


                    </div>
                    <div className={styles.hardwareNavigations}>
                        <div className={styles.createNew}>
                            <div className={styles.createStar}>
                                <AiFillStar className={styles.theStar} />
                                <Slide left>
                                    <p className={styles.theCreateText} onClick={() => { location.replace('/Projects/Join') }}>Join</p>
                                    <p className={styles.theCreateDescription} onClick={() => { location.replace('/Create') }}>Create Project</p>
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