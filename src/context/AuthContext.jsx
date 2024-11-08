import { createContext, useContext, useState, useReducer } from "react";


const FAKE_USER = {
    name: "Jack",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
  };




const AuthContext  = createContext(null);

const intialState = {
    user: null,
    isAuthenticated : false,
}


function reducer(state, action) {
    switch(action.type){
        case "login": {
            return {...state, user: action.payload, isAuthenticated : true};
        }
        case "logout": {
            return {...state, user: null, isAuthenticated : false}
        }
    }
}


function AuthProvider({children}) {

    const [{user, isAuthenticated}, dispatch] = useReducer(reducer, intialState);

    function login(userData) {
        if(userData.email === FAKE_USER.email && userData.password === FAKE_USER.password ){
            dispatch({type: "login", payload:FAKE_USER});

        } 
    }

    function logout() {
        dispatch({type: "logout"});
    }

    return <AuthContext.Provider value={{user, login, logout, isAuthenticated}}>
    {children}
    </AuthContext.Provider>
}


function useAuth() {
    const context  = useContext(AuthContext);
    if(!context) throw new Error('Auth Context was used outside the context');
    return context;
}

export {useAuth, AuthProvider};
