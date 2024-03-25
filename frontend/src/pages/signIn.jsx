import { BottomWarning } from "../components/bottomWarning"
import { Button } from "../components/button"
import { Heading } from "../components/heading"
import { InputBox } from "../components/inputBox"
import { SubHeading } from "../components/subheading"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios"


export const Signin = () => {
    const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
    const navigate = useNavigate();
    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p- h-max px-4">
                <Heading label={"Sign in"} />
                <SubHeading label={"Enter your credentials to access your account"} />
                <InputBox onChange={e=>{
                    setUsername(e.target.value);
                }} placeholder="Enetr your email" label={"Email"} />
                <InputBox type="password" onChange={e=>{
                    setPassword(e.target.value);
                }} placeholder="Enter your password" label={"Password"} />
                <div className="pt-4">
                    <Button onClick={async () => {
                          if (!username || !password) {
                            console.error("Username and password are required");
                            return;
                          }
                        try {
                            const response = await axios.post("https://payout-gvh5.onrender.com/api/v1/user/signin", {
                                username,
                                password
                            });

                            localStorage.setItem("token", response.data.token);
                            navigate("/dashboard");
                        } catch (error) {
                            console.error("Error signing in", error);r
                        }
                    }} label={"Sign in"} />
                </div>
                <BottomWarning label = {"Don't have an account?"} buttonText = {"Sign up"} to = {"/signup"}/>
            </div>
        </div>
    </div>
}