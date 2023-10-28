"use client"

import { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import AuthModalInputs from './AuthModalInputs';
import useAuth from "../../hooks/useAuth"
import { AuthenticationContext } from '../context/AuthContext';
import { Alert, CircularProgress } from '@mui/material';

export type InputsType = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  password: string;
};

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const renderContent = (isSignIn: boolean, signInContent: string, signUpContent: string) => {
  return isSignIn ? signInContent : signUpContent;
}

export default function AuthModal({isSignIn}: {isSignIn: boolean}) {
  const initInputs: InputsType = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    password: "",
  };
  
  const { data, error, loading } = useContext(AuthenticationContext);
  const [open, setOpen] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [inputs, setInputs] = useState<InputsType>(initInputs);
  const { signin, signup } = useAuth();

  const handleChangeInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  }

  useEffect(() => {
    if (isSignIn) {
      if (inputs.password && inputs.email) {
        return setDisabled(false);
      }
    } else {
      if (inputs.password && 
        inputs.email && 
        inputs.firstName && 
        inputs.lastName && 
        inputs.city &&
        inputs.phone
      ) {
        return setDisabled(false);
      }
    }

    setDisabled(true);
  }, [inputs]);

  const handleClick = () => {
    if (isSignIn) {
      signin({email: inputs.email, password: inputs.password}, handleClose);
    } else  {
      signup(inputs, handleClose);
    }
  }

  return (
    <div>
      <button 
        className={`${renderContent(isSignIn, "bg-blue-400 text-white", "")} border p-1 px-4 mr-3 rounded`}
        onClick={handleOpen}
      >
        {renderContent(isSignIn, "Sign in", "Sign up")}
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {loading ? (
            <div className="py-24 px-2 h-[600px] flex justify-center">
             <CircularProgress />
            </div>
          ) : (
          <div className="p-2 h-[600px]">
            {error ? (
              <Alert severity="error" className="mb-4">
                { error }
              </Alert>
            ) : null}
            <div className="uppercase font-bold text-center pb-2 border-b mb-2">
              <p className="text-sm">
                {renderContent(isSignIn, "Sign In", "Create Account")}
              </p>
            </div>
            <div className="m-auto">
              <h2 className="text-2xl font-light text-center">
                {renderContent(isSignIn, "Log Into Your Account", "Create Account")}
              </h2>
              <AuthModalInputs 
                inputs={inputs} 
                isSignIn={isSignIn}
                handleChangeInputs={handleChangeInputs}
              />
              <button 
                onClick={handleClick}
                disabled={disabled} 
                className="uppercase bg-red-600 w-full text-white p-3 rounded text-sm mb-5 disabled:bg-gray-400">
                {renderContent(isSignIn, "Sign In", "Create Account")}
              </button>
            </div>
          </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}