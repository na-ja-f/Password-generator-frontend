import React, { useEffect, useState } from 'react'
import './styles/slider.css'
import { MoveRight, Save, Copy } from 'lucide-react'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import { savePassword } from '../services/apiMethods'
import { loginSuccess } from '../Context/authSlice'
import { useDispatch } from 'react-redux'

const lowercaseList = 'abcdefghijklmnopqrstuvwxyz'
const uppercaseList = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const numbersList = '01234567890123456789'
const symbolsList = '!@#$%^&*().|?/!@#$%^&*()?'

function PasswordGenerator() {
    const selectUser = (state) => state.auth.user
    const user = useSelector(selectUser)
    const userId = user._id || ""
    const dispatch = useDispatch()

    const [passLength, setPassLength] = useState(8)
    const [password, setpassword] = useState('')
    const [title, setTitle] = useState('')
    const [titleError, setTitleError] = useState('')
    const [lowercase, setLowercase] = useState(true)
    const [uppercase, setUppercase] = useState(true)
    const [numbers, setNumbers] = useState(true)
    const [symbols, setSymbols] = useState(true)

    const [saveBox, setSaveBox] = useState(false)

    useEffect(() => {
        generatePassword()
    }, [passLength])

    const generatePassword = () => {
        let characterList = ''
        if (lowercase) characterList += lowercaseList
        if (uppercase) characterList += uppercaseList
        if (numbers) characterList += numbersList
        if (symbols) characterList += symbolsList

        let tempPass = ''

        for (let i = 0; i < passLength; i++) {
            const characterIndex = Math.round(Math.random() * characterList.length)
            tempPass += characterList.charAt(characterIndex)
        }
        setpassword(tempPass)
    }

    const copyPassword = async () => {
        // const copiedText = await navigator.clipboard.readText()
        if (password.length) {
            navigator.clipboard.writeText(password)
            toast.success('password copied')
        }
    }

    const save = () => {
        let valid = true;

        if (!title.trim()) {
            setTitleError("Enter a title");
            valid = false;
        } else {
            setTitleError("");
        }

        if (!valid) return;

        const values = {
            userId,
            title,
            password,
        };

        console.log(values);

        savePassword(values)
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
        <>
            {saveBox ? (
                <>
                    <div className='w-full flex flex-col items-center justify-center mt-16'>
                        <h1 className='text-2xl font-bold text-yellow'>SAVE YOUR PASSWORD</h1>
                        <div className='w-6/12 mt-10 flex flex-col justify-center'>
                            <input type="text" placeholder='Title for the password' onChange={(e) => setTitle(e.target.value)} value={title} className='bg-boxbg w-11/12 h-12 border border-blue p-3 text-blue' />
                            {titleError && (<p className="text-red-500 text-sm">{titleError}</p>)}
                        </div>
                        <div className='w-6/12 mt-10 flex justify-center'>
                            <input type="text" value={password} className='bg-boxbg w-11/12 h-12 border border-blue p-3 text-blue' />
                        </div>
                    </div>
                    <div className='flex flex-col  w-full mt-10 items-center justify-center'>
                        <button onClick={save} className='bg-yellow w-5/12 h-16 text-black flex justify-center gap-6 items-center'>Save Password <Save size={20} /></button>
                        <button onClick={() => setSaveBox(!saveBox)} className='bg-red-700 w-3/12 h-8 text-black flex justify-center items-center mt-10'>Go back</button>
                    </div>
                </>
            ) : (
                <>
                    <div className='w-9/12 flex flex-col items-start ml-10 mt-10'>
                        <h1 className='text-2xl font-bold text-yellow'>PASSWORD<br />GENERATOR</h1>
                        <div className='w-full mt-10 flex'>
                            <input type="text" disabled value={password} className='bg-boxbg w-full h-12 border border-blue p-3 text-blue' />
                        </div>

                        <div className='flex flex-row w-full mt-10 gap-5'>
                            <button onClick={copyPassword} className='bg-yellow w-6/12 h-16 text-black flex justify-center gap-6 items-center'>Copy Password <Copy size={20} /></button>
                            <button onClick={() => setSaveBox(!saveBox)} className='bg-yellow w-6/12 h-16 text-black flex justify-center gap-6 items-center'>Save Password <Save size={20} /></button>
                        </div>

                        <div className='mt-10 w-6/12 flex flex-col justify-center gap-5'>
                            <div className='flex'>
                                <input type="checkbox" checked={uppercase} onChange={() => setUppercase(!uppercase)} className='custom-checkbox' />
                                <h1 className='ml-5'>Uppercase Letters</h1>
                            </div>
                            <div className='flex'>
                                <input type="checkbox" className='custom-checkbox' checked={numbers} onChange={() => setNumbers(!numbers)} />
                                <h1 className='ml-5'>Numbers</h1>
                            </div>
                            <div className='flex'>
                                <input type="checkbox" className='custom-checkbox' checked={lowercase} onChange={() => setLowercase(!lowercase)} />
                                <h1 className='ml-5'>Lowercase Letters</h1>
                            </div>
                            <div className='flex'>
                                <input type="checkbox" className='custom-checkbox' checked={symbols} onChange={() => setSymbols(!symbols)} />
                                <h1 className='ml-5'>Symbols</h1>
                            </div>
                        </div>

                        <div className='mt-10 gap-3 w-full flex flex-col items-start'>
                            <input type="range" min={6} max={50} defaultValue={passLength} onChange={(e) => setPassLength(e.target.value)} className="custom-range-slider" />
                            <h6>Password Length : <span className='text-yellow'>{passLength}</span></h6>
                        </div>

                        <div className='flex w-full mt-10 gap-10 justify-center'>
                            <button onClick={generatePassword} className='bg-yellow w-full h-16 text-black flex justify-center gap-6 items-center'>Generate Password <MoveRight size={20} /></button>
                        </div>
                    </div>
                </>
            )}
        </>


    )
}

export default PasswordGenerator
