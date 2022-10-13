import React from 'react';
import { useForm } from 'react-hook-form';
import { newUser } from '../services/newUser';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon
}
  from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RegistrationPage() {

  let navigate = useNavigate();
  const onClicking = () => {
    console.log("Button Clicked")
    navigate("/")
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: `all`
  });

  const addUser = async (addNewUser) => {
    console.log(addNewUser, "New User")
    try {
      const newUserAdded = await newUser(addNewUser);
      if (newUserAdded === "Successfully Registered") {
        toast.success('Successfully Registered', {
          autoClose: 1000,
          closeOnClick: true
        });
      }
    }
    catch (error) {
    }
  }

  return (
    <>
      <MDBContainer fluid>
        <MDBRow className='d-flex justify-content-center align-items-center h-100'>
          <MDBCol col='12'>
            <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '500px' }}>
              <MDBCardBody className='p-5 w-100 d-flex flex-column'>
                <h2 className="fw-bold mb-2 text-uppercase">Sign UP</h2>
                <p className="text-black-50 mb-5">Please enter your following details!</p>

                <Form onSubmit={handleSubmit(addUser)}>
                  <Form.Group className="mb-3" controlId="formBasicFirstName">
                    <Form.Label>First Name </Form.Label>
                    <Form.Control type="firstName" data-testid="firstName" placeholder="Enter firstName"
                      {...register('firstName', { required: true })}
                      isInvalid={errors.firstName?.type === 'required'} />
                    <Form.Control.Feedback type="invalid">
                      First Name is required</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicLastName">
                    <Form.Label>Last Name </Form.Label>
                    <Form.Control type="lastName" data-testid="lastName" placeholder="Enter lastName"
                      {...register('lastName', { required: true })}
                      isInvalid={errors.lastName?.type === 'required'}
                    />
                    <Form.Control.Feedback type="invalid">
                      Last Name is required</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email Address </Form.Label>
                    <Form.Control type="email" data-testid="email" placeholder="Enter email"
                      {...register('email', { required: true })}
                      isInvalid={errors.email?.type === 'required'}
                    />
                    <Form.Control.Feedback type="invalid">
                      Email is required</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicLoginId">
                    <Form.Label>Login ID </Form.Label>
                    <Form.Control type="loginID" data-testid="loginId" placeholder="Enter loginID"
                      {...register('loginId', { required: true })}
                      isInvalid={errors.loginId?.type === 'required'}
                    />
                    <Form.Control.Feedback type="invalid">
                      LoginId is required</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password </Form.Label>
                    <Form.Control type="password" data-testid="password" placeholder="Password"
                      {...register('password', { required: true })}
                      isInvalid={errors.password?.type === 'required'} />
                    <Form.Control.Feedback type="invalid">
                      Password is required</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="contactNumber">
                    <Form.Label>Contact Number </Form.Label>
                    <Form.Control type="contactNumber" data-testid="contactNumber" placeholder="Enter contact Number"
                      {...register('contactNumber', { required: true })}
                      isInvalid={errors.contactNumber?.type === 'required'}
                    />
                    <Form.Control.Feedback type="invalid">
                      Contact Number is required</Form.Control.Feedback>
                  </Form.Group>

                  <div className="text-center pt-1 mb-5 pb-1">
                    <Button className="mb-4 w-100 gradient-custom-2" type="submit"
                    >Register</Button>
                  </div>
                  <ToastContainer closeOnClick={() => navigate("/")} />
                  <div>
                    <a className="text-muted" href="#!" type="submit" value="Registered? Go with Sign IN" onClick={onClicking}>Registered? Go with Sign IN</a>
                  </div>
                </Form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
}

export default RegistrationPage