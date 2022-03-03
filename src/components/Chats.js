import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { auth } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import axios from "axios";


const Chats = () => {

    const history = useHistory(); //allows us to use useHistory as a hook
    const { user } = useAuth(); //gets the user object from useAuth and gives us access to it
    const [loading, setLoading] = useState(true);

    const logout = async () => { //logout function given by firebase auth, pushes to login screen wehn signed out
        await auth.signOut();
        history.push('/');
    }

    const getFile = async (url) => { //gets an image for user avatar
        const response = await fetch(url); //fetches the image from the url given
        const data = await response.blob(); //.blob() is used to files 

        return new File([data], "userPhoto.jpg", {type: 'image/jpeg'}); //creates a new file that stores the users photo
    }

    useEffect(()=> {
        if(!user) { //checks if we have a user, if not returns to login page
            history.push('/');
            return; 
        }

        axios.get('https://api.chatengine.io/users/me', { //checks if we already have the user present by makeing a get request for the specific user uid and email
            headers: {
                "project-id": process.env.REACT_APP_CHAT_ENGINE_ID, //using environment variables as aa way to secure important information
                "user-name": user.email,
                "user-secret": user.uid
            }
        }).then(()=> { //if user already has chat, load chat screen
            setLoading(false);
        }).catch(() => { //if not then we will create a new user profile
            let formdata = new FormData(); //allows us to call FormData as a function
            formdata.append('email', user.email);
            formdata.append('username', user.email);
            formdata.append('secret', user.uid);

            getFile(user.photoURL) //gets the photo from the users google account
                .then((avatar) => {
                    formdata.append('avatar', avatar, avatar.name);

                    axios.post('https://api.chatengine.io/users/',  //create user by pushing the form data collected to the specific chat engine project we created 
                        formdata, 
                        {headers: {"private-key": process.env.REACT_APP_CHAT_ENGINE_KEY }}
                    )
                    .then(() => setLoading(false))//when this is done, end the loading
                    .catch((error) => console.log(error))//catch any errors that may occur
                })
        })
    }, [user, history])
 
    if (!user || loading) return 'Loading....'; //if we dont have a user or the loading is still true, then showcase loading...

    return (
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">
                    Tychat
                </div>
                <div onClick={logout} className="logout-tab">
                    Logout
                </div>
            </div>
            <ChatEngine //the actually chat engine element, just specific the project id, and current users email and uid
                height='89vh'
                projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
                userName={user.email}
                userSecret={user.uid}
            />
        </div>
    )
}

export default Chats;