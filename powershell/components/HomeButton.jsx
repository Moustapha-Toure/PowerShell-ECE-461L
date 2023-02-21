import React from 'react'
import Link from 'next/link'

const HomeButton = ({ label, whereTo }) => {
    return (
        <>
            <Link href={whereTo}>
                <h1 className={styles.homeButton} id={styles.homeToHardware}>{label}</h1>
            </Link>
        </>
    )
}

export default HomeButton