import React, { useEffect, useState } from 'react'
import { Copy, Trash } from 'lucide-react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import { deletePassword } from '../services/apiMethods'
import { loginSuccess } from '../Context/authSlice'
import { useDispatch } from 'react-redux'

function Savedpasswords() {
    const selectUser = (state) => state.auth.user
    const user = useSelector(selectUser)
    const userId = user._id || ""
    const dispatch = useDispatch()

    const [passwords, setPasswords] = useState([])

    useEffect(() => {
        if (user && user.savedPasswords) {
            setPasswords(user.savedPasswords);
        }
    }, [user])

    const copyPassword = async (pass) => {
        navigator.clipboard.writeText(pass)
        toast.success('password copied')
    }

    const deletePass = (title) => {
        const values = {
            userId,
            title,
        };
        
        deletePassword(values)
            .then((response) => {
                const data = response.data;
                if (response.status === 200) {
                    toast(data.message);
                    dispatch(loginSuccess({ user: data }));
                } else {
                    toast.error(data.message);
                }
            })
            .catch((error) => {
                toast.error(error?.message);
                console.log(error?.message);
            });
    }

    return (
        <div className='w-9/12 flex flex-col ml-32 mt-12'>
            <h1 className='text-2xl font-bold text-white'>SAVED <br /> PASSWORDS</h1>
            <div className='mt-10'>
                {passwords.map((password, index) => (
                    <div className='mt-6' key={index}>
                        <h1 className='text-yellow font-mono text-xl'>{password.title}</h1>
                        <div className='bg-boxbg border border-blue pl-4 pt-4 pr-4 pb-2 mt-3 flex justify-between'>
                            <div>
                                <h1 className='text-xs'>{password.password}</h1>
                            </div>
                            <div className=''>
                                <button onClick={() => copyPassword(password.password)} className='text-yellow mr-4'><Copy size={20} /></button>
                                <button onClick={() => deletePass(password.title)} className='text-red-900'><Trash size={20} /></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Savedpasswords
