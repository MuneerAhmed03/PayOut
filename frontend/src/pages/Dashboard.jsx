import { Appbar } from "../components/Appbar"
import { Users } from "../components/Users"
import { Balance } from "../components/balance"
import { useEffect, useState } from "react"
import axios from "axios"

export const Dashboard = () => {
    const [user,setUser]=useState({});
    useEffect(()=>{
        axios.get("https://payout-gvh5.onrender.com/api/v1/account/user-datails",{
            headers:{
                Authorization: "Bearer " + localStorage.getItem("token")
    }}).then(response=>{
        setUser(response.data.account)
    })
},[])
    const balance = Math.floor(user.balance);   
    // const name= user.userId.firstName
    let name = "";
    if (user && user.userId) {
      name = user.userId.firstName;
    }
    return <div>
        <Appbar name = {name}/>
        <div className="m-8">
            <Balance value={balance}/>
            <Users/>
        </div>
        </div>
}