import React from 'react'
import styles from '../styles/general-shared.module.css'

const RectButton = ({theme, label}) => { // Require a button theme and label to write

  // depending on the theme choosen, we have set colors below
  const baseColor = (theme === 'dark') ? "#1e0033" : "#ffffff";
  const labelColor = (theme === 'dark') ? "#ffffff" : "#1e0033";
  

  return (
    <div className={styles.buttonComponent} id={styles.loginButton}>
      <div style={{ backgroundColor: baseColor, width: '100%', padding: '1px', textAlign: 'center', borderRadius: '50px' }}>
        <p className={styles.buttonLabel} style={{ color: labelColor }}>{label}</p>
      </div>
    </div>
  )
}

export default RectButton