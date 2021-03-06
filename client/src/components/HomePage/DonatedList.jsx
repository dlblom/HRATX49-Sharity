import React, { useState, useEffect } from 'react';
import styles from '../../styles/lists.css';
import Axios from 'axios';
var _ = require('lodash');


const DonatedList = ({ displayCard }) => {
    //Charity  sorting options and list title
    var title='List of Donations'
    var sortOptions = ['dateCreated', 'name', 'category', 'value'];

    const [donatedData, addToDonatedData] = useState([])
    const [sortType, setSortType] = useState('dateCreated');
    
    useEffect(() => {
        getUserItemsData()
    }, []);

    function getUserItemsData () {

        //if no local storage exists, then do nothing
        if(!localStorage.getItem('user')) {
            return;
        }
        //to push data from get request and tax rows
        var arrayforDonatedData = []

        //user info from local storage
        const userData = JSON.parse(localStorage.getItem('user'))
        var userType = userData.type;

        //if not user then change to donor for db query
        // and then make charity boolean true
        if(userType === "user") {
            userType = "donor"
        }
        //user info to use with get request
        var userDataObj = {
            userType: userType,
            email: userData.email
        }

        Axios.get('/items/items', {params: userDataObj})
        .then(res => {
            //pushed to data array if has been picked up and claimed
            res.data.items.map((item) => {
                if(item.pickedUp === true ) {

                    //makes the date look pretty
                    item.date =  `${item.dateCreated.slice(5,7)}/${item.dateCreated.slice(8,10)}/${item.dateCreated.slice(2,4)} @${item.dateCreated.slice(11,16)}`
                    
                    //fixes null values and sorting bugs
                    if(item.name !== null && item.category !== null) {
                        //assign new keys for sorting rows more easily
                        item.lowerCaseName = item.name.toLowerCase();
                        item.lowerCaseCategory = item.category.toLowerCase();
                    }
                    
                    //to sort values
                    item.value = parseInt(item.estimatedValue)

                    //push data into storage array
                    arrayforDonatedData.push(item);
                }
            })    
        }) //sets state of pickupdata
        .then(res => {
            addToDonatedData(arrayforDonatedData)
        })
        .catch(err => {
            console.log('donated list axios error: ', err)
        })
    }
    //handles the sorting of the selector
    const handleSort = (event, name) => {
        event.preventDefault();
        setSortType(name);
        sortArray(name)
    }

    //object keys for sorting the data
    const sortArray = type => {

        const types = {
            claimedBy: 'claimedBy', 
            dateCreated:'date', 
            value: 'value', 
            name: 'lowerCaseName', 
            category: 'lowerCaseCategory',
            Location: 'Location'
        };
        //defines the option that was selected in the dropdown by user
        const sortProperty = types[type]; 

        //sorting function compares data from the fakeData file           
        const sorted = _.orderBy(donatedData, [sortProperty, 'asc'])
        //updates data to be remapped over
        addToDonatedData(sorted)
    };

    return (
        <div className={styles.listWrap}>
            <div className={styles.listWrapHeader}>
                <span className={styles.listTitle}> {title}</span>

                <select 
                    className={styles.listSelector}  
                    value={sortType} 
                    onChange={(e) => handleSort(e, e.target.value)}
                >
                    {sortOptions.map((item, i) => 
                        <option key={i} value={item}>{item}</option>
                        )
                    }
                </select>

            </div>
            <div className={styles.tableWrap}>
                <table>
                    <thead className={styles.listRowHeaders}>
                        <tr>
                            <th> <i className="far fa-clock"></i></th>
                            <th> <i className="fas fa-heart"></i></th>
                            <th> <i className="fas fa-grip-lines"></i></th>
                            <th> <i className="fa fa-usd" aria-hidden="true"></i></th>
                            
                        </tr>
                    </thead>
                    <tbody className={styles.listRowWrap}>  
                        {donatedData.map((item, i) =>  

                            <tr key={i} className={styles.listItemRow} onClick={ (e) => displayCard(e, item)}>
                                <td>{item.date}</td>
                                <td> {item.name} </td>
                                <td> {item.category} </td>
                                <td> ${item.value} </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                </div>
            <div className={styles.totalPickupWrap}>
                <span className={styles.totalPickup}>Total # of Items Donated: {donatedData.length}</span>
            </div>
        </div>

    )
}

export default DonatedList;
