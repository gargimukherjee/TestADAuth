import { Fragment, useEffect, useState } from 'react';
import { loginRequest, graphConfig, msalInstance } from "./authConfig";

import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser"


function App() {

  const { instance, inProgress, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const { username, setUserName} = useState('');

  //Getting Login Details
  useEffect(() => {
    console.log(`Starting login----`)
    getLoginDetails()
  }, [isAuthenticated, inProgress, instance]);

  useEffect(() => {
    console.log(`Checking if user is authenticated----`)
    if (!isAuthenticated) {
      return;
    }
    console.log(`User Authenticated----`)
    setUserName(accounts[0].username)
  }, [isAuthenticated])

  //If user is not authenticated, then the user will be redirected
  const getLoginDetails = async () => {
    console.log(`User is Authentic----`, isAuthenticated);
    console.log(`InProgress`, inProgress);
    if (!isAuthenticated && inProgress === InteractionStatus.None) {
      console.log(`This will take the user to login panel`)
      await msalInstance.loginRedirect({
        scopes: ['user.read'],
      })
        .then(() => {
          console.log(`Getting Account`)
          getAccount();
        })
        .catch(error => {
          console.log(`This is the error`)
          if (error.errorCode === 'interaction_in_progress') {
          } else {
            console.error(error);
          }
        });
    }
  }

  const getAccount = () => {
    const currentAccounts = msalInstance.getAllAccounts();
    if (currentAccounts === null) {
      console.log("No accounts detected");
      return null;
    }
    if (currentAccounts.length > 1) {
      console.log(
        "Multiple accounts detected, need to add choose account code."
      );
      console.log(`Current Account1`, currentAccounts[0])
      return currentAccounts[0];
    } else if (currentAccounts.length === 1) {
      console.log(`Current Account2`, currentAccounts[0])
      return currentAccounts[0];
    }
    return null;
  }


  

  return (
    <div className="App">
      This is the app
 
    </div >
  );
}

export default App;
