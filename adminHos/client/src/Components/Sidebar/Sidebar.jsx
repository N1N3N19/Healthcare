import React, { useState } from 'react';
import './Sidebar.css'
import {
    FaBars,
    FaUserAlt,
}from "react-icons/fa";
import { NavLink} from 'react-router-dom';
import { IoIosLogOut } from "react-icons/io";
import { FaUserDoctor } from "react-icons/fa6";
import { RiHealthBookFill } from "react-icons/ri";

const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        
        {
            path:"/doctor",
            name:"Doctor",
            icon:<FaUserDoctor />
        },
        {
            path:"/patient",
            name:"Patients",
            icon:<FaUserAlt />
            
        } ,
        {
            path:"/exam",
            name:"Examination",
            icon:<RiHealthBookFill />
            
        } ,
        {
            path:"/login",
            name:"Logout",
            icon:<IoIosLogOut />
            
        }
       

    ]
    return (
        <div className="containerr">
           <div style={{width: isOpen ? "250px" : "90px"}} className="sidebar">
               <div className="top_section">
                   <h1 style={{display: isOpen ? "block" : "none"}} className="icons">Admin</h1>
                  
                
                   <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                  
                       <FaBars onClick={toggle}/>
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                    
                       <NavLink to={item.path} key={index} className="link" activeclassName="active">
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
            
           </div>
           <main>{children}</main>
        </div>
      
    );
};

export default Sidebar;