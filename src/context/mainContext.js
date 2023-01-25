import React, { useState } from 'react';
import AppNavigator from "../navigations/AppNavigator";
import AppContext from "./appContext";

const MainContext = () => {
    //IntialState
    const [userData, setUserData] = useState({
        id: "",
        name: "",
        email: "",
        mobileNumber: "",
        didTryAutoLogin: false,
        token: "",
    });

    const userSettings = {
        authDetails: userData,
        setUserData,
    };



    return (
        <>
            <AppContext.Provider value={userSettings}>
                <AppNavigator />
            </AppContext.Provider>
        </>
    )
}

export default MainContext