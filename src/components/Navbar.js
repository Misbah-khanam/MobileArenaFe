import React, { useState } from 'react';
import {
  TERipple,
  TEModal,
  TEModalDialog,
  TEModalContent,
  TEModalHeader,
  TEModalBody,
  TEModalFooter,
  TEInput,
} from "tw-elements-react";
import api from '../api/api';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {faFilter} from '@fortawesome/free-solid-svg-icons';

const Navbar = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [login, setLogin] = useState(true);
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [logoutModel, setlogoutModel] = useState(false)
  const user = JSON.parse(localStorage.getItem("user"))

  library.add(faFilter)


  const handleRegister = () => {
    if(username === '' || name === '' || email === '' || phone === '' || password === ''){
      setMessage("enter all required Feilds")
      setTimeout(() => {setMessage('')}, 10000);
      return
    }
    api.post(
      `/user/signup`,
      {
        username: username,
        name: name,
        email: email,
        phone: phone,
        password: password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ).then((response) => {
      setMessage(response.data.message)
      setUsername('')
      setName('')
      setEmail('')
      setPhone('')
      setPassword('')
      setTimeout(() => {setMessage('')}, 10000);
    }).catch(error => {
      console.log(error.message)
      setMessage("couldn't Register try again")
      setTimeout(() => {setMessage('')}, 10000);
    })
  }

  const handleLogin = () => {
    if(email === '' || password === ''){
      setMessage("enter all required Feilds")
      setTimeout(() => {setMessage('')}, 10000);
      return
    }
    api.post(
      `/user/login`,
      {
        email: email,
        password: password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ).then((response) => {
      setMessage(response.data.message)
      setEmail('')
      setPassword('')
      localStorage.setItem("user",JSON.stringify(response.data.result))
      props.userData.setUser(response.data.result)
      setShowModal(false)
      setTimeout(() => {setMessage('')}, 5000);
    }).catch(error => {
      console.log(error.message)
      setMessage("Invalid Details")
      setTimeout(() => {setMessage('')}, 10000);
    })
  }

  const handleLogout = () => {
    localStorage.clear()
    setlogoutModel(false)
    props.userData.setUser()
  }

  return (
    <nav className="bg-gray-800 p-4 shadow-lg fixed w-full top-0 z-10">
      <div className="flex justify-between items-center w-full">
        <div className="text-white font-bold">
          {props.mobileData.isMobile && <span className='mr-2' onClick={() => {props.display.setDisplayFilters(!props.display.displayFilters)}}>
            <FontAwesomeIcon icon="fa fa-filter" />
          </span>}
          <Link to='/'>MobileArena</Link>
        </div>
        <ul className="flex space-x-4">
          {/* <li className="text-white">Home</li>
          <li className="text-white">About</li> */}
          {/* <li className="text-white">Profile</li> */}
          {
            user && (
              <Link to='/profile' className='text-white bold items-center flex'>Hey, {user.username}</Link>
            )
          }
          {
            user === null || user === undefined ? 
            <li className="text-white">
              <TERipple rippleColor="white">
                <button
                  type="button"
                  className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  onClick={() => setShowModal(true)}
                >
                  Login
                </button>
              </TERipple>
            </li>:
            <li className="text-white">
            <TERipple rippleColor="white">
              <button
                type="button"
                className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                onClick={() => setlogoutModel(true)}
              >
                Logout
              </button>
            </TERipple>
          </li>
          }
        </ul>
      </div>

      <TEModal show={showModal} setShow={setShowModal}>
        <TEModalDialog>
          <TEModalContent>
            <TEModalHeader>
              <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                {login ? 'Login' : 'Register'}
              </h5>
              <button
                type="button"
                className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </TEModalHeader>
            <TEModalBody>
              <div>
                {!login &&<TEInput
                  type="text"
                  id="Username"
                  label="Enter Username"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                ></TEInput>}
                {!login && <TEInput
                  type="text"
                  id="name"
                  label="Enter Full Name"
                  className='mt-5'
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                ></TEInput>}
                <TEInput
                  type="email"
                  id="email"
                  label="Enter email"
                  className='mt-5'
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                ></TEInput>
                {!login && <TEInput
                  type="number"
                  id="phone"
                  label="Enter Phone Number"
                  className='mt-5'
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                ></TEInput>}
                <TEInput
                  type="password"
                  id="password"
                  label="Enter Password"
                  className='mt-5'
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                ></TEInput>
              </div>
              <div className='auth-message'>{message}</div>
            </TEModalBody>
            <TEModalFooter>
              <TERipple rippleColor="light">
                <button
                  type="button"
                  className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                  onClick={() => setLogin(!login)}
                >
                  {login ? 'Register' : 'Login'}
                </button>
              </TERipple>
              <TERipple rippleColor="light">
                {login ? <button
                  type="button"
                  className="ml-1 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  onClick={handleLogin}
                >
                  Login
                </button> :
                <button
                  type="button"
                  className="ml-1 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  onClick={handleRegister}
                >
                  Register
                </button>}
              </TERipple>
            </TEModalFooter>
          </TEModalContent>
        </TEModalDialog>
      </TEModal>


      <TEModal show={logoutModel} setShow={setlogoutModel}>
        <TEModalDialog>
          <TEModalContent>
            <TEModalHeader>
              <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                Logout
              </h5>
              <button
                type="button"
                className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                onClick={() => setlogoutModel(false)}
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </TEModalHeader>
            <TEModalBody>
              <div>Are you sure you want to logout? </div>
            </TEModalBody>
            <TEModalFooter>
              <TERipple rippleColor="light">
                <button
                  type="button"
                  className="inline-block rounded bg-danger px-6 pb-2 pt-2.5 text-xs text-white font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </TERipple>
            </TEModalFooter>
          </TEModalContent>
        </TEModalDialog>
      </TEModal>
    </nav>
  );
};

export default Navbar;
