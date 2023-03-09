import React from 'react'
import styles from '@/styles/Hardware.module.css'
import Fade from 'react-reveal/Fade'

// backgroundImage : 'url(' + '../Assets/Images/Hardware/Wrenches.jpg' +')',

const HardwareDisplay = ({ hardwareName, hardwareQTY, imageURL }) => {
    const imageStyle = {
        backgroundImage: 'url(' + imageURL + ')',
    };

    return (
        <>
            <Fade>
                <div className={styles.hardwareSetDisplay} id={`hardwareSetDisplay-${hardwareName}`}>
                    <div className={styles.hardwareShowcase} style={imageStyle}>
                        <p className={styles.hardwareQty}>{hardwareQTY}</p>
                    </div>
                    <div className={styles.hardwareDetails}>
                        <p className={styles.hardwareName}>{hardwareName}</p>
                    </div>
                </div>
            </Fade>
        </>
    )
}

export default HardwareDisplay