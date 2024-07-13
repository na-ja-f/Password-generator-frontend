import React, { useState } from 'react'
import { LogIn } from 'lucide-react'
import { postLogin } from '../services/apiMethods'
import { Link, useNavigate } from "react-router-dom";
import { loginSuccess } from '../Context/authSlice';
import { toast } from "sonner";
import { useDispatch } from "react-redux";

function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const submit = () => {
        let valid = true;

        if (!username.trim()) {
            setUsernameError("Enter username");
            valid = false;
        } else {
            setUsernameError("");
        }

        if (password.length < 6) {
            setPasswordError("password must be atleast 6 charachters");
            valid = false;
        } else {
            setPasswordError("");
        }

        if (!valid) return;

        const values = {
            username,
            password,
        };

        postLogin(values)
            .then((response) => {
                const data = response.data;
                if (response.status === 200) {
                    toast(data.message);
                    dispatch(loginSuccess({ user: data }));
                    navigate("/");
                } else {
                    console.log(response.message);
                    toast.error(data.message);
                }
            })
            .catch((error) => {
                toast.error(error?.message);
                console.log(error?.message);
            });
    };

    return (
        <>
            <div className='w-full flex flex-col items-center justify-center mt-32'>
                <h1 className='text-2xl font-bold text-yellow'>LOGIN</h1>
                <h1 className='text-sm font-bold text-blue mt-5'>Generate and save all your passwords at one place</h1>
                <div className='w-6/12 mt-10 flex flex-col justify-center'>
                    <input type="text" placeholder='Username' onChange={(e) => setUsername(e.target.value)} value={username} className='bg-boxbg w-11/12 h-12 border border-blue p-3 text-blue' />
                    {usernameError && (<p className="text-red-500 text-sm">{usernameError}</p>)}
                </div>
                <div className='w-6/12 mt-10 flex flex-col justify-center'>
                    <input type="text" value={password} placeholder='Password' onChange={(e) => setPassword(e.target.value)} className='bg-boxbg w-11/12 h-12 border border-blue p-3 text-blue' />
                    {passwordError && (<p className="text-red-500 text-sm">{passwordError}</p>)}
                </div>
            </div>
            <div className='flex flex-col w-full mt-10 items-center justify-center'>
                <button onClick={submit} className='bg-yellow w-3/12 h-16 text-black flex justify-center gap-6 items-center'>Login <LogIn size={20} /></button>
            </div>
            <div className="mt-5 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link to="/signup" className="underline">
                    Sign up
                </Link>
            </div>
        </>
    )
}

export default Login
