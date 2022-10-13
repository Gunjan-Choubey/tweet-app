import React from 'react';
import { useForm } from 'react-hook-form';
import { passwordReset } from '../services/newUser';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody
}
  from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function ForgotPassword() {
  let navigate = useNavigate();
  const onClicking = () => {
    navigate("/")
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const forgotP = async (forgotP) => {
    try {
      const passwordResetSuccess = await passwordReset(forgotP);
      if (passwordResetSuccess === "Password Reset is Successfull") {
        toast.success('Password Reset is Successfull', {
          autoClose: 5000
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

                <h2 className="fw-bold mb-2 text-uppercase">Reset Your Password!</h2>
                <p className="text-white-50 mb-5">Enter following details :</p>
                <Form onSubmit={handleSubmit(forgotP)}>
                  <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label> Username </Form.Label>
                    <Form.Control type="username" data-testid="username" placeholder="Enter Username"
                      {...register('username', { required: true })}
                      isInvalid={errors.username?.type === 'required'} />
                    <Form.Control.Feedback type="invalid">
                      Username is required</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label> Password </Form.Label>
                    <Form.Control type="password" data-testid="password" placeholder="Enter New password"
                      {...register('password', { required: true })}
                      isInvalid={errors.password?.type === 'required'} />
                    <Form.Control.Feedback type="invalid">
                      Password is required</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                    <Form.Label> Confirm Password </Form.Label>
                    <Form.Control type="confirmPassword" data-testid="confirmPassword" placeholder="Re-enter New password"
                      {...register('confirmPassword', { required: true })}
                      isInvalid={errors.confirmPassword?.type === 'required'} />
                    <Form.Control.Feedback type="invalid">
                    Please Confirm Password</Form.Control.Feedback>
                  </Form.Group>
                  <div className="text-center pt-1 mb-5 pb-1">
                    <Button className="mb-4 w-100 gradient-custom-2" type="submit"
                      value="Password Reset"
                      data-testid="submitButton"
                    >Submit</Button>
                  </div>
                  <ToastContainer />
                  <div>
                    <a className="text-muted" href="#!" type="submit" value="Go back to Homepage" onClick={onClicking}>Go back to Homepage!</a>
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

export default ForgotPassword