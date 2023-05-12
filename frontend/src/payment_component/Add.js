import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function Add() {
   
    const [inputdata,setInputdata]=useState({
        "name":"",
        "email":"",
        "contact":""
    })
    
    //onchange function
    const setstud=(e)=>{
        console.log(e.target.value);
        setInputdata({ ...inputdata, [e.target.name]: e.target.value });   
    }
    //onclick event
    const addinpdata = async (e) => {
        e.preventDefault();
    
        const { name, email, contact } = inputdata;
    
        // Check if name is not empty
        if (!name || !/^[a-zA-Z.]+$/.test(name)) {
            toast.error('Please enter a valid name (letters and periods only)', {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true, 
              progress: undefined,
            });
            return;
          }
          
    
        // Check if email is valid
        const emailRegex = /^[\w.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        //const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        if (!emailRegex.test(email)) {
            toast.error('Please enter a valid email address', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true, 
                progress: undefined,
            });
            return;
        }
    
        // Check if contact number is valid
        const contactRegex = /^\d{10}$/;
        if (!contactRegex.test(contact)) {
            toast.error('Please enter a valid 10-digit contact number', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true, 
                progress: undefined,
            });
            return;
        }
    
        const res = await fetch("http://localhost:5000/addstud", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, contact
            })
        });
    
        const data = await res.json();
        console.log(data);
    
        if (!res.ok || !data) {
            console.log("error ");
            alert("error");
    
        } else {
            setInputdata(data);
            toast.success('Please wait  !', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true, 
                progress: undefined,
                });
            setTimeout(() => {
                window.location.href = 'http://localhost:3001/pay';
              }, 3000);
    
        }
        
    }
    
    return (
        
        
        <div className='container mt-5'>
            <center><h4>Payment</h4>
            <div className='underline1'></div></center>
            
            <form  className='mt-5 shadow p-5'>

                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Name</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter Name" 
                    onChange={setstud} name="name" value={inputdata.name}/>                   
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Email</label>
                    <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Enter Email" 
                    onChange={setstud} name="email" value={inputdata.email} />
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Mobile Number</label>
                    <input type="number" className="form-control" id="exampleFormControlInput1" placeholder="Enter Mobile Number"
                    onChange={setstud} name="contact" value={inputdata.contact} />
                </div>

                <div className='d-flex'>
                         <button className='btn btn-primary' onClick={addinpdata} >Next</button>
                         <ToastContainer />
                         <NavLink className='btn btn-primary ms-auto' to="/">Cancel</NavLink>
                </div>
              

            </form>
            
        </div>
        
    )
}
