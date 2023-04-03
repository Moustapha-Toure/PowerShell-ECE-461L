import React from 'react'
import styles from '@/styles/Hardware.module.css'
import Fade from 'react-reveal/Fade'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// backgroundImage : 'url(' + '../Assets/Images/Hardware/Wrenches.jpg' +')',
export const Wrenches = new URL('@/Assets/Images/Hardware/Wrenches.jpg', import.meta.url);
export const Tools = new URL('@/Assets/Images/Hardware/Power-tools.jpg', import.meta.url);

const HardwareDisplay = ({ set: { _id, name, capacity, Availability, creator } }) => {

    const value = Math.random(2)
    const image = (value === 0) ? Wrenches : Tools;

    const imageStyle = {
        backgroundImage: 'url(' + image + ')',
    };

    const infoAler = () => {
        toast.info(`This is Hardware Availability`, {
            position: "top-center",
            autoClose: 8000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "",
            pauseOnFocusLoss: false
        });
    }
    return (
        <>
            <Fade>
                <div className={styles.hardwareSetDisplay} id={`hardwareSetDisplay-${_id}`}>
                    <div className={styles.hardwareShowcase} style={imageStyle}>
                        <p className={styles.hardwareQty} onMouseDown={infoAler}>{Availability}</p>
                    </div>
                    <div className={styles.hardwareDetails}>
                        <p className={styles.hardwareName}>{name}</p>
                    </div>
                </div>
            </Fade>
        </>
    )
}

export default HardwareDisplay