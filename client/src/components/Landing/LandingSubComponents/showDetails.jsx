import React, { useState } from 'react';
import styles from '../ShowDetails.css';
import Item from 'antd/lib/list/Item';

const ShowDetails = ({ card, closeCard }) => {
  console.log(card)
  let arrOfPictures = card.pictures.split(',');
  let thumbnail = arrOfPictures[0];

  
  return (
    <div className={styles.overlay} onClick={closeCard}>
      <div className={styles.cardDetail}>
          <p className={styles.closeBtn} onClick={closeCard}>+</p>
        <div className={styles.leftSide}>
          {/* Left Side */}
          <div className={styles.userArea}>
            {/* User Area and Date Area */}
            {card.donor}
            {card.dateCreated}
          </div>
          <div className={styles.btnArea}>
            {/* BUTTONS */}
            <div className={styles.msgBtn}>
              {/* Message */}
              <button name="message">Message</button>
            </div>
            <div className={styles.claimBtn}>
              {/* Claim */}
              <button name="claim">Claim</button>
            </div>
          </div>
        </div>
        <div className={styles.imgArea}>
          {/* Image */}
          {/* {thumbnail} */}
          <img src="./Alabama.jpg" alt={card.name} className={styles.cardImage}/>
        </div>
        <div className={styles.rightSide}>
          {/* Right Side Details */}
          <div className="">
            {/* X button Item Name and Category */}
            <div className={styles.productName}>
              {/* Item Name */}
              {card.name}
            </div>
            <div className={styles.productCategory}>
              {/* Item Category */}
              {card.category}
            </div>
          </div>
          <div className={styles.conditionAndZipContainer}>
            {/* Condition and ZipCode */}
            <div className={styles.condition}> {/* Condtion */} {card.itemCondition} </div>
            <div className={styles.zip}> {/* Zip Code */} {card.Location} </div>
          </div>
          <div className={styles.description}>
            {/* Description */}
            {card.Description}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShowDetails;