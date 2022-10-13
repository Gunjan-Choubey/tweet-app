import React from 'react';
import { useNavigate } from 'react-router-dom'
import { loginD } from '../services/newUser';
import '../css/Homepage.css'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {
        MDBBtn,
        MDBContainer,
        MDBRow,
        MDBCol
}
        from 'mdb-react-ui-kit';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Homepage() {
        const {
                register,
                handleSubmit,
                formState: { errors },
        } = useForm();
        const login = async (login) => {
                console.log(login, " Sign IN")
                try {
                        const loginSuccess = await loginD(login);
                        console.log(loginSuccess, "Login")
                        if (loginSuccess === true) {

                                navigate("/Welcome", { state: { name: login.username } })
                        }
                        else if (loginSuccess === false) {
                                toast.error('Invalid Login Credentials', {
                                        autoClose: 500
                                });
                        }
                }
                catch (error) {
                        toast.error('Invalid Login Credentials', {
                                autoClose: 500
                        });
                }

        }

        let navigate = useNavigate();

        const onClicking = () => {
                console.log("Register Button Clicked")
                navigate("/RegistrationPage")
        }

        const onClickingFP = () => {
                console.log("Forgot Password Button Clicked")
                navigate("/forgotPassword")
        }

        return (
                <>
                        <MDBContainer className="my-5 gradient-form" >
                                <MDBRow>
                                        <MDBCol col='6' className="mb-5">
                                                <div className="d-flex flex-column ms-5">

                                                        <div className="text-center">
                                                                <img src="https://popmenucloud.com/cdn-cgi/image/width=640,height=640,format=auto,fit=scale-down/uimnxhka/bac2df01-35a0-4f65-9622-c3f3bb4d0327.png"
                                                                        style={{ width: '185px' }} alt="logo" />
                                                                <h4 className="mt-1 mb-5 pb-1">We are the Twitter Team</h4>
                                                        </div>

                                                        <p>Please login to your account</p>
                                                        <Form onSubmit={handleSubmit(login)}>
                                                                <Form.Group className="mb-3" controlId="formBasicUsername">
                                                                        <Form.Label>Username </Form.Label>
                                                                        <Form.Control type="username" data-testid="username" placeholder="Enter Username"
                                                                                {...register('username', { required: true })}
                                                                                isInvalid={errors.username?.type === 'required'} />
                                                                        <Form.Control.Feedback type="invalid">
                                                                                Username is required</Form.Control.Feedback>
                                                                </Form.Group>
                                                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                                                        <Form.Label>Password </Form.Label>
                                                                        <Form.Control type="password" data-testid="password" placeholder="Password"
                                                                                {...register('password', { required: true })}
                                                                                isInvalid={errors.password?.type === 'required'} />
                                                                        <Form.Control.Feedback type="invalid">
                                                                                Password is required</Form.Control.Feedback>
                                                                </Form.Group>

                                                                <ToastContainer />
                                                                <div className="text-center pt-1 mb-5 pb-1">
                                                                        <Button type="submit" className="mb-4 w-100 gradient-custom-2"
                                                                        >Sign In
                                                                        </Button>
                                                                        <a className="text-muted" href="#!" type="submit"
                                                                                value="Forgot Password"
                                                                                onClick={onClickingFP}>Forgot password?</a>
                                                                </div>
                                                        </Form>

                                                        <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                                                                <p className="mb-0">Don't have an account?</p>
                                                                <MDBBtn outline className='mx-2' color='danger' type="submit"
                                                                        value="Register"
                                                                        onClick={onClicking}>
                                                                        Register
                                                                </MDBBtn>
                                                        </div>
                                                </div>
                                        </MDBCol>

                                        <MDBCol col='6' className="mb-5">
                                                <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-100 mb-4">

                                                        <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                                                                <h1 class="mb-4"><b>TWEET APP</b></h1>
                                                                <p class="small mb-0"><h2>Social Networking Service</h2>
                                                                </p>
                                                        </div>
                                                </div>
                                        </MDBCol>
                                </MDBRow>
                        </MDBContainer>
                </>
        );
}

export default Homepage