import {  useState } from 'react';
import { Link } from "react-router-dom";
import {BiUser} from "react-icons/bi";
import {AiOutlineUnlock} from "react-icons/ai";

import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';



const UserSignup = () => {
    const [ID, setId] = useState('');
    const [password, setPassword] = useState('');
    const [cfPassword, setCfPassword] = useState('');
    const [cookies, setCookie, removeCookie] = useCookies(['user']);

    const handleIdInput = (e) => {
        e.preventDefault();
        console.info('ID:', e.target.value);
        setId(e.target.value);
    };
    
    const handlePasswordInput = (e) => {   
        e.preventDefault();
        console.info('Password:', e.target.value);
        setPassword(e.target.value);
    };

    const handlecfPasswordInput = (e) => {
        e.preventDefault();
        console.info('Confirm Password:', e.target.value);
        setCfPassword(e.target.value);
    };

    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== cfPassword) {
            // They are not equal, show an error message and return
            console.error('Passwords do not match');
            return;
        }
        const dataToSend = { ID, password, name, department };
        console.log('Data to send:', dataToSend);

        
    
        const response = await fetch('http://localhost:5001/api/DocSignin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
        }
        
        //TO DO: redirect to UserRegister page
        
        );
        
    
        const data = await response.json();
       
    
        if (response.ok) {
            // Handle success console.log("something" + data);
            
            setCookie('userID', data.userID);
            setCookie('AuthToken', data.token);
            console.log(data.token)
            console.log('API Response:', data);
           
            navigate(`/Register/`);
        } else {
            // Handle error
            console.error('Sign-up failed:', data.message);
        }
    };

  return (
    <div className='text-white h-[100vh] flex justify-center items-center bg-cover' style={{ "backgroundImage": "url('../src/assets/bg.jpg')" }}>
      <div className="bg-white border border-amber-400 rounded-lg p-10 w-96 box-border shadow-lg backdrop-filter backdrop-blur-lg relative transition-all duration-200" style={{ width: '400px', height: '550px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
        </div>
        <h1 className="text-3xl text-gray-950 font-bold mt-5 mb-5 text-left">Sign up</h1>
        <form onSubmit={handleSubmit}>
          <div className="relative my-4">
                    
                    <label htmlFor="" for="input" className="absolute text-sm text-neutral-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-3 peer-focus:text-amber-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y peer-placeholder-shown:mt-6 peer-placeholder-shown:left-3 peer-focus:scale-75">Enter your ID:</label>
                    <BiUser className="absolute top-4 right-4 text-neutral-500 duration-300 peer-focus:text-gray-950"/>
                    <input type="text" className="rounded-full w-full py-2.5 pl-5 px-0 mt-1 text-sm text-neutral-500 bg-gray-100 bg-opacity-80 appearance-none focus:outline-none focus:ring-0 focus:text-neutral-500 focus:border-amber-400 peer" placeholder="" value={ID} onChange={handleIdInput}/>
                    
                </div>
                <div className="relative my-4">
                    <label htmlFor="" for="input" className="absolute text-sm text-neutral-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-3 peer-focus:text-amber-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y peer-placeholder-shown:mt-6 peer-placeholder-shown:left-3 peer-focus:scale-75">Enter your password:</label>
                    <AiOutlineUnlock className="absolute top-4 right-4 text-neutral-500 duration-300 peer-focus:text-gray-950"/>
                    <input type="password" className="rounded-full w-full py-2.5 pl-5 px-0 mt-1 text-sm text-neutral-500 bg-gray-100 bg-opacity-80 appearance-none focus:outline-none focus:ring-0 focus:text-neutral-500 focus:border-amber-400 peer" placeholder="" value={password} onChange={handlePasswordInput}/>
                </div>
                <div className="relative mb-1">
                    <label htmlFor="" for="input" className="absolute text-sm text-neutral-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-3 peer-focus:text-amber-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y peer-placeholder-shown:mt-6 peer-placeholder-shown:left-3 peer-focus:scale-75">Confirm your password:</label>
                    <AiOutlineUnlock className="absolute top-4 right-4 text-neutral-500 duration-300 peer-focus:text-gray-950"/>
                    <input type="password" className="rounded-full w-full py-2.5 pl-5 px-0 mt-1 text-sm text-neutral-500 bg-gray-100 bg-opacity-80 appearance-none focus:outline-none focus:ring-0 focus:text-neutral-500 focus:border-amber-400 peer" placeholder="" value={cfPassword} onChange={handlecfPasswordInput}/>    
                </div>
                <div className="relative mb-1">
                    <label htmlFor="" for="input" className="absolute text-sm text-neutral-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-3 peer-focus:text-amber-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y peer-placeholder-shown:mt-6 peer-placeholder-shown:left-3 peer-focus:scale-75">Enter your name:</label>
                  
                    <input type="text" className="rounded-full w-full py-2.5 pl-5 px-0 mt-1 text-sm text-neutral-500 bg-gray-100 bg-opacity-80 appearance-none focus:outline-none focus:ring-0 focus:text-neutral-500 focus:border-amber-400 peer" placeholder="" value={name} onChange={handleNameInput}/>    
                </div>
                <div className="relative mb-1">
                <label htmlFor="department" className="absolute text-sm text-neutral-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-3 peer-focus:text-amber-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y peer-placeholder-shown:mt-6 peer-placeholder-shown:left-3 peer-focus:scale-75">Select your department:</label>
                
                <select id="department" value={department} onChange={handleDepartmentInput} className="rounded-full w-full py-2.5 pl-5 px-0 mt-1 text-sm text-neutral-500 bg-gray-100 bg-opacity-80 appearance-none focus:outline-none focus:ring-0 focus:text-neutral-500 focus:border-amber-400 peer">
                    <option value="">Select department</option>
                    <option value="cardiology">Cardiology</option>
                    <option value="neurology">Neurology</option>
                    <option value="orthopedics">Orthopedics</option>
                    <option value="pediatrics">Pediatrics</option>
                    {/* Add more options as needed */}
                </select>
                </div>
                    <button className="w-full wtext-[18px] my-4 rounded-full bg-orange-600 text-white hover:ring-1 ring-amber-400 hover:bg-white hover:text-orange-600 py-2 transition-colors duration-300" type="submit"><b>NEXT</b></button>
                    <div className="relative text-center">
                        <span className="text-neutral-500">Already have an account? <Link className="text-neutral-500 hover:text-orange-600" to='/DocLogin'><u>Sign in</u></Link></span>
                </div>
                
                    </form>
                </div>
                <div className="absolute my-4 bottom-20 pb-12 text-center">
                    <span>Wolfgang: Triple-N © 2023</span>
                </div>
    </div>
  );
};

export default UserSignup;