import React, { useState } from 'react'
import api from '../api/api';
import {
  TERipple,
  TEModal,
  TEModalDialog,
  TEModalContent,
  TEModalHeader,
  TEModalBody,
  TEModalFooter,
  TEInput,
  TETextarea
} from "tw-elements-react";

const MobileCard = (props) => {
  const [buyModal, setBuyModal] = useState(false)
  const [dAddress, setdAddress] = useState()
  const user = JSON.parse(localStorage.getItem('user'))
  const [dPhone, setdPhone] = useState(user && user.phone)
  const [payMethod, setPayMethod] = useState()
  const [page, setPage] = useState(1)
  const [orderMsg, setOrderMsg] = useState('')
  const [buyMsgModal, setBuyMsgModal] = useState(false)

  const handleBuy = () => {
    console.log(user)
    setPage(1)
    if(user !== null && user !== undefined){
      setBuyModal(true)
    }else{
      setBuyMsgModal(true)
    }
    
  }

  const handleMethodChange = (e) => {
    console.log(e.target.value)
    setPayMethod(e.target.value)
  }

  const handleConfirmOrder = () => {
    api.post(
      '/order/add-order',
      {
        user: user._id ,
        address: dAddress,
        payment_type: payMethod, 
        phone : dPhone,
        mobile: props.mobile._id
      }
    ).then(response => {
      console.log(response.data.message)
      setPage(3)
      setOrderMsg(response.data.message)
    })
  }


  return (
    <div className='-z-10 w-52 h-80 bg-slate-100 m-5 shadow-lg rounded'>
      <center><img src={`data:image/png;base64,${props.img}`} className='w-32 h-28 mt-2' /></center>
      <h3 className='text-success'><del className='text-danger'>{props.mobile.actual_price}</del> {props.mobile.selling_price}</h3>
      <h3>{props.mobile.company} {props.mobile.name}</h3>
      <h3>{props.mobile.modelNO}</h3>
      <h3>{props.mobile.processor}</h3>
      <h3>{props.mobile.os}</h3>
      <h3>{props.mobile.type}</h3>
      <div className='mt-2 '>
        <TERipple rippleColor="white">
          <button
            type="button"
            className=" -z-10 relative  inline-block rounded bg-primary px-6 pb-2 pt-2.5 w-28 mt-1 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            onClick={handleBuy}
          >
            Buy
          </button>
        </TERipple>
      </div>

      <TEModal show={buyModal} setShow={setBuyModal}>
        <TEModalDialog>
          <TEModalContent>
            <TEModalHeader>
              <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                Place Order
              </h5>
              <button
                type="button"
                className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                onClick={() => setBuyModal(false)}
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
              {page === 1 && (<div>
                <h2 className='font-bold mb-2'>Delivery Address</h2>
                <div>
                  <TEInput
                    type="number"
                    id="phone"
                    label="Enter Phone Number"
                    className='mb-2'
                    onChange={(e) => { setdPhone(e.target.value) }}
                    value={dPhone}
                  ></TEInput>
                  <TETextarea
                    id="address"
                    label="Delivery Address"
                    rows={4}
                    onChange={(e) => { setdAddress(e.target.value) }}
                    value={dAddress}
                  ></TETextarea>
                </div>
                <h2 className='font-bold mt-8 mb-2'>Payment method</h2>
                <div className='flex justify-center'>
                  <div className="mb-[0.125rem] mr-4 inline-block min-h-[1.5rem] pl-[1.5rem]">
                    <input
                      className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                      type="radio"
                      name="payment_type"
                      id="cash"
                      value="cash"
                      onChange={(e) => { handleMethodChange(e) }}
                    />
                    <label
                      className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                      htmlFor="inlineRadio1"
                    >
                      Cash On Delivery
                    </label>
                  </div>
                  <div className="mb-[0.125rem] mr-4 inline-block min-h-[1.5rem] pl-[1.5rem]">
                    <input
                      className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                      type="radio"
                      name="payment_type"
                      id="upi"
                      value="upi"
                      onChange={(e) => { handleMethodChange(e) }}
                    />
                    <label
                      className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                      htmlFor="inlineRadio2"
                    >
                      UPI Payments
                    </label>
                  </div>
                  <div className="mb-[0.125rem] mr-4 inline-block min-h-[1.5rem] pl-[1.5rem]">
                    <input
                      className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                      type="radio"
                      name="payment_type"
                      id="banking"
                      value="banking"
                      onChange={(e) => { handleMethodChange(e) }}
                    />
                    <label
                      className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                      htmlFor="inlineRadio2"
                    >
                      Net Banking
                    </label>
                  </div>
                </div>
              </div>)}
              {page === 2 && <div>
                <h2 className='font-bold mb-2'>Order Summary</h2>
                <div>
                  <center>
                    <table className='min-w-full text-left text-sm '>
                      <tbody>
                      <tr className='border-b bg-neutral-200 dark:border-neutral-500 dark:bg-neutral-700 p-8'>
                        <th className="whitespace-nowrap px-6 py-4">Phone Number</th>
                        <td className="whitespace-nowrap px-6 py-4">{dPhone}</td>
                      </tr>
                      <tr className='border-b bg-white dark:border-neutral-500 dark:bg-neutral-600'>
                        <th className="whitespace-nowrap px-6 py-4">Delivery Address</th>
                        <td className="whitespace-nowrap px-6 py-4">{dAddress}</td>
                      </tr>
                      <tr className='border-b bg-neutral-200 dark:border-neutral-500 dark:bg-neutral-700'>
                        <th className="whitespace-nowrap px-6 py-4">Model</th>
                        <td className="whitespace-nowrap px-6 py-4">{props.mobile.modelNO}</td>
                      </tr>
                      <tr className='border-b bg-white dark:border-neutral-500 dark:bg-neutral-600'>
                        <th className="whitespace-nowrap px-6 py-4">Name</th>
                        <td className="whitespace-nowrap px-6 py-4">{props.mobile.name}</td>
                      </tr>
                      <tr className='border-b bg-neutral-200 dark:border-neutral-500 dark:bg-neutral-700'>
                        <th className="whitespace-nowrap px-6 py-4">price</th>
                        <td className="whitespace-nowrap px-6 py-4">{props.mobile.selling_price}</td>
                      </tr>
                      <tr className='border-b bg-white dark:border-neutral-500 dark:bg-neutral-600'>
                        <th className="whitespace-nowrap px-6 py-4">Payment Method</th>
                        <td className="whitespace-nowrap px-6 py-4">{payMethod}</td>
                      </tr>
                      </tbody>
                    </table>
                  </center>
                </div>
              </div>}
              {page === 3 && <div className='test-3xl font-bold'>
                {orderMsg}
              </div>}
            </TEModalBody>
            <TEModalFooter>
              {page === 2 && <TERipple rippleColor="light">
                <button
                  type="button"
                  className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                  onClick={(e) => { setPage(1) }}
                >
                  Back
                </button>
              </TERipple>}
              
              {page === 1 && <TERipple rippleColor="light">
                <button
                  type="button"
                  className="ml-1 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  onClick={(e) => { setPage(2) }}
                >
                  Next
                </button>
              </TERipple>}

              {page === 2 && <TERipple rippleColor="light">
                <button
                  type="button"
                  className="ml-1 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  onClick={handleConfirmOrder}
                >
                  confirm
                </button>
              </TERipple>}
            </TEModalFooter>
          </TEModalContent>
        </TEModalDialog>
      </TEModal>


      <TEModal show={buyMsgModal} setShow={setBuyMsgModal}>
        <TEModalDialog>
          <TEModalContent>
            <TEModalHeader>
              <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                Note
              </h5>
              <button
                type="button"
                className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                onClick={() => setBuyMsgModal(false)}
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
              <div>You have to login to place an order </div>
            </TEModalBody>
            <TEModalFooter>
              <TERipple rippleColor="light">
                <button
                  type="button"
                  onClick={(e) => setBuyMsgModal(false)}
                  className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs text-white font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                >
                  Close
                </button>
              </TERipple>
            </TEModalFooter>
          </TEModalContent>
        </TEModalDialog>
      </TEModal>
    </div>
  )
}

export default MobileCard