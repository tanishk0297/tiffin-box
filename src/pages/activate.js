import React from 'react'
import UserService from '../services/UserService';
import { useLocation } from 'react-router-dom';
import { useState,useEffect } from 'react';

export const Activate = () => {
    const location= useLocation()
    const[Success, setSucess]=useState(null)
    useEffect(() => {
        ActivateAccount()
        .then(response => {
            setSucess(response)
        })
      
      }, []);

    const ActivateAccount = async () => {
        let sucess = false
        const queryParams=new URLSearchParams(location.search);
        
        let data = { activationKey: queryParams.get('key') }
        
        await UserService.Activate(data)
            .then(response => {
                sucess = response.data
            })
            .catch(e => {
               
                console.log(e);
            })
        return sucess
    }   
  return (
    <div>
    {Success == true &&  <div>Your account successfully Activated. Please login</div>}
    {Success == false && 'your account already activated'}   
  </div>
  )
}
