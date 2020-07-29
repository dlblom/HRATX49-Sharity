import React, { useState } from 'react';
import styles from '../../styles/CharityHeader.css';
import Achievement from './Achievement.jsx';

const CharityHeader = () => {

    return (

        <div className={styles.charityHeaderWrapper}>
                <Achievement />

        </div>
    )
}

export default CharityHeader;