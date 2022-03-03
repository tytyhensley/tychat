import React, { useContext, useState, useEffect, } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../firebase';

const AuthContext = React.createContext(); //creates the auth context

export const useAuth = () => useContext(AuthContext); //a function that allows us to call the AuthContext and gain access to it

export const AuthProvider = ({ children }) => { // passing react children in the props as it will render all the jsx you pass into the function
    //initializes two states of the auth provider component, one that holds the user and the other a boolean of whether the auth is loading
    const [loading, setLoading] = useState(true); 
    const [user, setUser] = useState(null); 
    const history = useHistory(); //intiializes a variable history to old the useHistory hook that will allows us to redirect to a new page

    useEffect(()=> {
        auth.onAuthStateChanged ((user) => { // whenever a user logins in the auth state will change and this will then become the user prop
            setUser(user); //sets the user state of component to user gotten from the auth changed
            setLoading(false); //stops loading
            if (user) {
                history.push('/chats');//if we have a user, then go to chats page
            }

        })
    }, [user, history] ); // when the dependacy array changes the callback fucntion will be called; so when the user is changed or the page has changed, the callback funciton will be rendered

    const value = { user }; //set value to user

    return (
        <AuthContext.Provider value= {value}> {/*has a value prop that is need but this will be set to user*/}
            {!loading && children} {/* if not loading, then show children*/}
        </AuthContext.Provider>
    );

}