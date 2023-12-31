import { Link } from "react-router-dom";
import {BiUser} from "react-icons/bi";
import {AiOutlineUnlock} from "react-icons/ai";

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
const Signin = () => {
    const [Id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const handleIdInput = (e) => {
        console.info('Id:', e.target.value);
        setId(e.target.value);
    }

    const handlePasswordInput = (e) => {
        console.info('Password:', e.target.value);
        setPassword(e.target.value);
    }

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataToSend = { Id, password };
        console.log('Data to send:', dataToSend);
    
        const response = await fetch('http://localhost:5001/api/DocLogin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
        });
        
        const data = await response.json();
        console.log('API Response:', data);
    
        if (response.ok) {
            // Handle success
            console.log('Login successful!');
            setCookie('userId', data.userId);
            setCookie('AuthToken', data.token);
    
            navigate('/Dashboard');
            

        } else {
            // Handle error
            console.error('Sign-in failed:', data.message);
            // show popup error
            alert(data.message);
        }
    }; 

    return (
        <div className='text-white h-[100vh] flex justify-center items-center bg-cover' style={{"backgroundImage": "url('../src/assets/bg.jpg')"}}>
            <div className="bg-white border border-amber-400 rounded-lg p-10 w-96 box-border shadow-lg backdrop-filter backdrop-blur-lg relative transition-all duration-200" style={{ wIdth: '400px', height: '550px'}}>
               
                <h1 className="text-3xl text-gray-950 font-bold mt-5 mb-5 text-left">Sign in</h1>
                <form action="">
                <div className="relative my-4">
                    <label htmlFor="" for="input" className="absolute text-sm text-neutral-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-3 peer-focus:text-amber-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y peer-placeholder-shown:mt-6 peer-placeholder-shown:left-3 peer-focus:scale-75">Enter your email:</label>              
                    <BiUser className="absolute top-4 right-4 text-neutral-500 duration-300 peer-focus:text-gray-950"/>
                    <input type="text" Id="input" className="rounded-full w-full py-2.5 pl-5 px-0 mt-1 text-sm text-neutral-500 bg-gray-100 bg-opacity-80 appearance-none focus:outline-none focus:ring-0 focus:text-neutral-500 focus:border-amber-400 peer" placeholder="" onChange={handleIdInput}/>
                    
                </div>
                <div className="relative my-4">
                    <label htmlFor="" for="input"  className="absolute text-sm text-neutral-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-3 peer-focus:text-amber-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y peer-placeholder-shown:mt-6 peer-placeholder-shown:left-3 peer-focus:scale-75">Enter your password:</label>
                    <AiOutlineUnlock className="absolute top-4 right-4 text-neutral-500 duration-300 peer-focus:text-gray-950"/>
              
                    <input type="password" className="rounded-full w-full py-2.5 pl-5 px-0 mt-1 text-sm text-neutral-500 bg-gray-100 bg-opacity-80 appearance-none focus:outline-none focus:ring-0 focus:text-neutral-500 focus:border-amber-400 peer" placeholder="" onChange={handlePasswordInput} />
                    
                </div>
                <button className="w-full mb-4 text-[18px] mt-6 rounded-full bg-orange-600 text-white hover:ring-1 ring-amber-400 hover:bg-white hover:text-orange-600 py-2 transition-colors duration-300" type="submit" onClick={handleSubmit}><b>NEXT</b></button>
                
                <div className="relative my-2 text-center">
                <span className="text-neutral-500">New Doctor? <Link className="text-neutral-500 hover:text-orange-600" to='/DocSignin' ><u>Create an account</u></Link></span>
                </div>
                </form>
            </div>
            <div className="absolute my-4 bottom-20 pb-12 text-center">
                <span>Wolfgang: Triple-N © 2023</span>
            </div>
        </div>
    );
};

export default Signin;