import React, { useState, useEffect } from 'react';
import styles from '../styles/AddItemForm.css';
import axios from 'axios';
// import { addAchievement } from './addAchievement';



const NewItem = (props) => {
    const [condition, onConditionChange] = useState('')
    const [selectedFile, addImageHandler] = useState(null);
    const [image, setImageUrl] = useState('')
    const [itemName, setItemName] = useState('')
    const [description, setDescript] = useState('')
    const [estVal, setEstVal] = useState('')
    const [zipcode, setZip] = useState('')
    const [category, setCategory] = useState('')

    // const [userEmail, setUserEmail] = useState('')
    // const [userName, setUserName] = useState('')
    const date = new Date();

    // setUserEmail('test')
    // setUserName('test')

    const uploadHandler = (selectedFile) => {
        const data = new FormData();
        // If file selected
        if (selectedFile.name) {
            data.append('charityCurrentAvatar', selectedFile, selectedFile.name);
            axios.post('/api/profile/profile-img-upload', data, {
                headers: {
                    'accept': 'application/json',
                    'Accept-Language': 'en-US,en;q=0.8',
                    'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                }
            })
                .then((response) => {
                    if (200 === response.status) {
                        // If file size is larger than expected.
                        if (response.data.error) {
                            if ('LIMIT_FILE_SIZE' === response.data.error.code) {
                                console.log('Max size: 2MB', 'red');
                            } else {
                                console.log(response.data);
                                // If not the given file type
                                console.log(response.data.error, 'red');
                            }
                        } else {
                            // Success
                            let fileName = response.data;
                            console.log('fileName', fileName.location);
                            console.log('File Uploaded');
                            // localStorage.setItem('currentUploadUrl', fileName.location)
                            setImageUrl(fileName.location)
                        }
                    }
                }).catch((error) => {
                    // If another error
                    console.log(error, 'red');
                });
        } else {
            // if file not selected throw error
            console.log('Please upload file', 'red');
        }
    };

    function onDonateSubmit() {
        if (!localStorage.getItem('user')) {
            return;
        }
        const userData = JSON.parse(localStorage.getItem('user'))
        const userName = userData.name
        const email = userData.email
        //console.log(userName, email)
        //console.log("image", image)
        var data = {
            donor: userName,
            name: itemName,
            Description: description,
            pictures: image,
            estimatedValue: estVal || 0,
            itemCondition: condition,
            Location: zipcode,
            dateCreated: date,
            category: category,
            email: email
        };

        axios.post('/items', data)
        .then(res=> {
            props.closeModal()
            //console.log('your item has been added', res.data)
        })
        .catch(err => {
            console.log('error posting on axios post request: ', err)
        })
    }

    return (
        <div className={styles.addItemFormWrapper}>
            <div className={styles.addedItemImageWrapper}>
                <img className={styles.addedItemImage} src={image} alt=''></img>
            </div>

            <div className={styles.inputFieldWrapper}>

                <input
                    className={styles.addNameInputField}
                    value={itemName}
                    onChange={(event) => setItemName(event.target.value)}
                    placeholder="item name"
                    type="text"
                    required
                ></input>
                <input
                    className={styles.addCategoryInputField}
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                    placeholder="item category"
                    type="text"
                    required
                ></input>

                <div>

                    <input
                        className={styles.addValueInputField}
                        value={estVal}
                        onChange={(event) => setEstVal(event.target.value)}
                        placeholder="Estimated Value"
                        type="number"
                        required
                    ></input>
                    <input
                        className={styles.addZipInputField}
                        value={zipcode}
                        onChange={(event) => setZip(event.target.value)}
                        placeholder="zipcode"
                        type="number"
                        required
                    ></input>
                </div>

                <input
                    className={styles.addDescriptionInputField}
                    value={description}
                    type="text"
                    onChange={(event) => setDescript(event.target.value)}
                    placeholder="brief description of your item"
                    required
                ></input>
                <select
                    className={styles.addConditionInputField}
                    name="condition"
                    // this line was breaking the condition dropdown
                    // value={condition}
                    type="text"
                    defaultValue='default'
                    required
                    // grabs condition from the dropdown box
                    onBlur={(event) => {
                        onConditionChange(event.target.value);
                        console.log(event.target.value);
                    }}
                >
                    <option className={styles.conditionOptions} value='default' disabled>condition</option>
                    <option className={styles.conditionOptions} value='New'>New</option>
                    <option className={styles.conditionOptions} value='Excellent'>Excellent</option>
                    <option className={styles.conditionOptions} value='Good'>Good</option>
                    <option className={styles.conditionOptions} value='Rough'>Rough</option>
                    <option className={styles.conditionOptions} value='Trash'>Trash</option>
                </select >
                {/* ************************************* */}
                {/* ************Upload Image************* */}
                <div className={styles.addItemUploadBody}>
                    <input
                        className={styles.addItemUploadInputButton}
                        type="file"
                        onChange={() => { addImageHandler(event.target.files[0]) }} />
                    <br />
                    <button
                        className={styles.addItemUploadSubmitButton}
                        onClick={() => { uploadHandler(selectedFile) }}>Upload!</button>
                </div>
                <div>
                    <button
                        className={styles.addItemCancelButton}
                        onClick={() => props.closeModal()}>
                        Cancel
                    </button>
                    <button
                        className={styles.addItemSubmitButton}
                        onClick={() => onDonateSubmit()}
                    >
                        Donate
                    </button>
                </div>

            </div>
        </div>

    )
}

export default NewItem;
