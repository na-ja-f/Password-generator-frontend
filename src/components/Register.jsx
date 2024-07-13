import React, { useState } from 'react'
import { LogInIcon } from 'lucide-react'
import { Link, useNavigate } from "react-router-dom";
import { postRegister } from '../services/apiMethods';
import { toast } from 'sonner';

function Register() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [nameError, setNameError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const navigate = useNavigate();

    const submit = () => {
        let isValid = true;

        if (!username.trim()) {
            setNameError("Enter your name");
            isValid = false;
        } else {
            setNameError("");
        }
        if (password.length < 6) {
            setPasswordError("password must be at least 6 characters");
            isValid = false;
        } else {
            setPasswordError("");
        }

        if (!isValid) return;

        const values = {
            username,
            password,
        };

        postRegister(values)
            .then((response) => {
                const data = response.data;
                if (response.status === 200) {
                    toast.success(data.message);
                    navigate(`/login`);
                } else {
                    toast.error(data.message);
                }
            })
            .catch((error) => {
                toast.error(error?.message);
            });
    };

    return (
        <>
            <div className='w-full flex flex-col items-center justify-center mt-32'>
                <h1 className='text-2xl font-bold text-yellow'>SIGN UP</h1>
                <h1 className='text-sm font-bold text-blue mt-5'>Generate and save all your passwords at one place</h1>
                <div className='w-6/12 mt-10 flex flex-col justify-center'>
                    <input type="text" placeholder='Username' onChange={(e) => setUsername(e.target.value)} value={username} className='bg-boxbg w-11/12 h-12 border border-blue p-3 text-blue' />
                    {nameError && <p className="text-red-500 text-sm">{nameError}</p>}
                </div>
                <div className='w-6/12 mt-10 flex flex-col justify-center'>
                    <input type="text" value={password} placeholder='Password' onChange={(e) => setPassword(e.target.value)} className='bg-boxbg w-11/12 h-12 border border-blue p-3 text-blue' />
                    {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
                </div>
            </div>
            <div className='flex flex-col w-full mt-10 items-center justify-center'>
                <button onClick={submit} className='bg-yellow w-3/12 h-16 text-black flex justify-center gap-6 items-center'>Register <LogInIcon size={20} /></button>
            </div>
            <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link to="/login" className="underline">
                    Sign in
                </Link>
            </div>
        </>
    )
}

export default Register
