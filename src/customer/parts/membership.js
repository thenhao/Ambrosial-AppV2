import { useRef } from 'react';
import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import Popup from '../components/popup/popup';
import "./membership.css";

function Membership(){
    const form = useRef();
        //list of things that need to have the tags
        //Form
        //-reply_to
        //-name or firstname/lastname
        //-button to submit

    function handlesubmit(e){
        e.preventDefault();

        emailjs.sendForm('service_rn5pk3c', 'template_jbyy01u', form.current, 'user_AEhO0hVBtk1r9gtd1od2x')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
    }

    const [isOpen, setIsOpen] = useState(false);
 
    const togglePopup = () => {
        setIsOpen(!isOpen);
    }
    
    return <div>

        <button className="join" onClick={togglePopup}>Join Membership</button>
        
        {isOpen && <Popup
        popupType='member-popup'
        content={<>
            <div className='signupcontainer'>
                <div className='formcontainer'>
                    <div className='signuptitle'>Ambrosial</div>
                    <div className='signupsubtitle'>Create an account</div>
                    <br></br>
                    <form className='inputform' ref={form} onSubmit={handlesubmit}>
                        
                        <input className='inputvalue' type="text" placeholder="Your Username" name="username" size="50" autoFocus></input>
                        
                        <input className='inputvalue' type="password" placeholder="Your Password" name="password" size="50"></input>
                        <input className='inputvalue' type="text" placeholder="Your Firstname" name="firstname" size="50"></input>
                        <input className='inputvalue' type="text" placeholder="Your Lastname" name="lastname" size="50"></input>
                        <input className='inputvalue' type="email" placeholder="Your Email" name="reply_to" size="50"></input>
                        
                        <div className='inputcheckboxcontainer'>
                            <div className='inputcheckboxwrapper'>
                                <input className='inputcheckbox' type="checkbox"></input>
                            </div>

                            <div className='agreement'>
                                I <strong>do not</strong> want to receive promotional emails from Ambrosial
                            </div>      
                        </div>
                        <br></br>
                        <div className='signupagreement'>By clicking the "Sign Up" button, you are creating an Ambrosial account, and you agree 
                            to Ambrosial's Terms of Use and Privacy Policy</div>
                        <br></br>    
                        <button className='signupbutton'>Sign Up</button>
                    </form>
                </div>

            </div>
        </>}
        handleClose={togglePopup}
        />}
    </div>
}

export default Membership;