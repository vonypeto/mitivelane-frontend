import React from 'react'

//CSS
import './AdminRegister.css'

//Components 
import AdminRegisterForm1 from '../admin-register-form/form-1';
import AdminRegisterForm2 from '../admin-register-form/form-2';
import AdminRegisterForm3 from '../admin-register-form/form-3';
import AdminRegisterForm4 from '../admin-register-form/form-4';


//Hooks
import QueueAnim from 'rc-queue-anim';

const AdminRegisterForm = (props) => {
    return (
        <div className="sign-up-card">
            {props.current === 0 && (
                <QueueAnim delay={300} duration={1000}>
                    <div key="1">
                        <AdminRegisterForm1 {...props}/>
                    </div>
                </QueueAnim>
            )}
            
            {props.current === 1 && (
                <div>
                    <QueueAnim delay={300} duration={1000}>
                        <div key="1">
                        <AdminRegisterForm2 {...props}/>
                        </div>
                    </QueueAnim>
                    
                </div>

            )}
            {props.current === 2 && (
                <div>
                    <QueueAnim delay={300} duration={1000}>
                        <div key="1">
                        <AdminRegisterForm3 {...props}/>
                        </div>
                    </QueueAnim>
                    
                </div>

            )}
            {props.current === 3 && (
                <div>
                    <QueueAnim delay={300} duration={1000}>
                        <div key="1">
                        <AdminRegisterForm4 {...props}/>
                        </div>
                    </QueueAnim>
                </div>
            )}

        </div>

    )
}

export default AdminRegisterForm
