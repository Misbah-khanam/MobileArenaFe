import React from 'react'
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar'
import 'virtual-select-plugin/dist/virtual-select.min.css';
import 'virtual-select-plugin/dist/virtual-select.min.js';
import MobileCard from '../components/MobileCard';
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
  TESelect
} from "tw-elements-react";

const Home = () => {

  const [showModalAdd, setShowModalAdd] = useState(false);
  const [modelNo, setModelNo] = useState('')
  const [company, setCompany] = useState('')
  const [processor, setprocessor] = useState('')
  const [mname, setMname] = useState('')
  const [type, setType] = useState('')
  const [memory, setMemory] = useState('')
  const [os, setOs] = useState('')
  const [actualPrice, setActualPrice] = useState(0)
  const [sellingPrice, setSellingPrice] = useState(0)
  const [image, setImage] = useState('')
  const [addMessage, setAddMessage] = useState('')
  const [mobiles, setMobiles] = useState()
  const [retImgs, setRetImgs] = useState()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))
  const [displayFilters, setDisplayFilters] = useState(true)
  const [isMobile, setIsMobile] = useState(false);
  const [filmsg, setFilmsg] = useState('')


  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    fetchMobiles()

    window.VirtualSelect.init({
      ele: '#price-dropdown',
      // search: true,
      selectedValue: '',
      autoSelectFirstOption: false,
    });

    window.VirtualSelect.init({
      ele: '#type-dropdown',
      search: true,
      optionSelectedText: 'type Selected',
      optionsSelectedText: 'types Selected',
      allOptionsSelectedText: 'All types',
      searchPlaceholderText: 'Select all',
      alwaysShowSelectedOptionsCount: true,
    });

    window.VirtualSelect.init({
      ele: '#processor-dropdown',
      search: true,
      optionSelectedText: 'processor Selected',
      optionsSelectedText: 'processors Selected',
      allOptionsSelectedText: 'All processors',
      searchPlaceholderText: 'Select all',
      alwaysShowSelectedOptionsCount: true,
    });

    window.VirtualSelect.init({
      ele: '#memory-dropdown',
      search: true,
      optionSelectedText: 'memory Selected',
      optionsSelectedText: 'memory Selected',
      allOptionsSelectedText: 'All options',
      searchPlaceholderText: 'Select all',
      alwaysShowSelectedOptionsCount: true,
    });

    window.VirtualSelect.init({
      ele: '#os-dropdown',
      search: true,
      optionSelectedText: 'os Selected',
      optionsSelectedText: 'os Selected',
      allOptionsSelectedText: 'All options',
      searchPlaceholderText: 'Select all',
      alwaysShowSelectedOptionsCount: true,
    });


  }, [])

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
    setDisplayFilters(window.innerWidth >= 768)
    console.log(window.innerWidth)
  };

  const handleAddMobile = () => {
    if (modelNo === '' || processor === '' || company === '' || type === '' || mname === '' ||
      memory === '' || os === '' || actualPrice === 0 || sellingPrice === 0 || image === null || image === '' || image === undefined) {
      setAddMessage("Enter All Feilds")
      return
    }
    api.post(
      '/mobile/add-mobile',
      {
        seller_name: user.username,
        modelNO: modelNo,
        processor: processor,
        company: company,
        type: type,
        name: mname,
        memory: memory,
        os: os,
        actual_price: actualPrice,
        selling_price: sellingPrice,
        img: image,
      },
      {
        headers: {
          'Content-Type': "multipart/form-data",
        },
      }
    ).then((response) => {
      console.log(response.data.message)
      setAddMessage(response.data.message)
      setActualPrice(0)
      setCompany('')
      setImage('')
      setMemory('')
      setMname('')
      setModelNo('')
      setOs('')
      setSellingPrice('')
      setType('')
      setprocessor('')
      setTimeout(() => {
        setAddMessage('')
      }, 5000);
      window.location.reload()
    }
    ).catch(error => {
      console.log(error.message)
    })
  }

  const fetchMobiles = () => {
    api.post(
      '/mobile/ret-mobile',
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ).then(response => {
      console.log(response.data.message)
      setMobiles(response.data.mobiles)
      setRetImgs(response.data.imgs)
    }).catch(error => {
      console.log(error.message)
    })
  }

  const handleFilters = () => {
    console.log(document.querySelector('#price-dropdown').value)
    console.log(document.querySelector('#type-dropdown').value)
    console.log(document.querySelector('#processor-dropdown').value)
    console.log(document.querySelector('#memory-dropdown').value)
    console.log(document.querySelector('#os-dropdown').value)

    if
      (document.querySelector('#os-dropdown').value.length === 0 ||
      document.querySelector('#type-dropdown').value.length === 0 ||
      document.querySelector('#processor-dropdown').value.length === 0 ||
      document.querySelector('#memory-dropdown').value.length === 0) {
      setFilmsg("Select values for all the filters")
      setTimeout(() => {
        setFilmsg("")
      }, 5000);
      return
    }

    api.post(
      '/mobile/filter-mobile',
      {
        price: document.querySelector('#price-dropdown').value,
        type: document.querySelector('#type-dropdown').value,
        processor: document.querySelector('#processor-dropdown').value,
        memory: document.querySelector('#memory-dropdown').value,
        os: document.querySelector('#os-dropdown').value
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ).then(response => {
      console.log(response.data.message)
      setMobiles(response.data.mobiles)
      setRetImgs(response.data.imgs)

      if (isMobile) {
        setDisplayFilters(false)
      }
    }).catch(error => {
      console.log(error.message)
    })
  }


  return (
    <div>
      <Navbar display={{ displayFilters, setDisplayFilters }} mobileData={{ isMobile, setIsMobile }} userData = {{user, setUser}} />
      {
        user && (
          <div>
            <button
              className='fixed bottom-10 right-10 bg-primary text-4xl rounded-full w-16 h-16 text-white shadow-[0_4px_9px_-4px_#3b71ca] hover:bg-primary-600 text-white pb-2'
              onClick={() => { setShowModalAdd(true) }}
            >+</button>
          </div>
        )
      }

      <div className={displayFilters ? `w-52 fixed h-screen border-r-4 flex flex-col py-8 bg-white z-0` : `w-52 hidden h-screen border-r-4 flex flex-col py-8 bg-white z-0`} >
        <center>

          <h1>Filters</h1>
          <div className='w-32 mr-6 py-4 '>
            <select id="price-dropdown" name="price" placeholder="price" data-selected="all">
              <option value='0-100000'>Price</option>
              <option value='0-10000'>below 10,000</option>
              <option value='10000-20000'>10,000 - 20,000</option>
              <option value='20000-30000'>20,000 - 30,000</option>
              <option value='30000-40000'>30,000 - 40,000</option>
              <option value='40000-50000'>40,000 - 50,000</option>
              <option value='50000-100000'>50,000 - 1,00,000</option>
            </select>
          </div>
          <div className='w-32 mr-6 py-4'>
            <select id="type-dropdown" name="type" placeholder="type" multiple data-selected="all">
              <option value="basic" >Basic</option>
              <option value="flip" >Flip Phones</option>
              <option value="smartphone" >Smart Phones</option>
              <option value="slider" >Slider</option>
            </select>
          </div>
          <div className='w-32 mr-6 py-4'>
            <select id="processor-dropdown" name="processor" placeholder="processor" multiple data-selected="all">
              <option value="snapdragon" >SnapDragon</option>
              <option value="intelcore" >Intel Core</option>
              <option value="ryzen" >Ryzen</option>
              <option value="apple" >Apple Aseries</option>
            </select>
          </div>
          <div className='w-32 mr-6 py-4'>
            <select id="memory-dropdown" name="memory" placeholder="memory" multiple data-selected="all">
              <option value='64' >64Gb</option>
              <option value='32' >32Gb</option>
              <option value='16' >16Gb</option>
            </select>
          </div>
          <div className='w-32 mr-6 py-4'>
            <select id="os-dropdown" name="os" placeholder="os" multiple data-selected="all">
              <option value="android" >Android</option>
              <option value="ios" >IOS</option>
              <option value="windows" >Windows</option>
            </select>
          </div>
          <TERipple rippleColor="white">
            <button
              type="button"
              className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 mt-1 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              onClick={handleFilters}
            >
              Apply
            </button>
            <div>{filmsg}</div>
          </TERipple>
        </center>
      </div>
      {/* <center>
        <div className="flex items-center w-2/5 justify-center mt-20 ">
          <input type="text" placeholder="Search..." className="border p-2 mr-2 w-4/5 border-slate-500 rounded" />
          <button className="bg-blue-500 text-white p-2 rounded" >Search</button>
        </div>
      </center> */}
      <div className={!isMobile ? `ml-52 flex flex-wrap mt-20 justify-center` : ` flex flex-wrap mt-20 justify-center`}>
        {
          mobiles && (
            mobiles.map((mobile, index) => {
              return (
                <MobileCard mobile={mobile} img={retImgs[index]} />
              )
            })
          )
        }
      </div>

      <TEModal show={showModalAdd} setShow={setShowModalAdd}>
        <TEModalDialog>
          <TEModalContent>
            <TEModalHeader>
              <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                Add Mobile
              </h5>
              <button
                type="button"
                className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                onClick={() => setShowModalAdd(false)}
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
                <div className="mb-3 w-96">
                  <input
                    className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                    type="file"
                    id="formFile"
                    onChange={(e) => { setImage(e.target.files) }}
                  />
                </div>
                <TEInput
                  type="text"
                  id="model_no"
                  label="Enter model no"
                  onChange={(e) => { setModelNo(e.target.value) }}
                  value={modelNo}
                ></TEInput>
                <TEInput
                  type="text"
                  id="company"
                  label="Enter Company"
                  className='mt-5'
                  onChange={(e) => { setCompany(e.target.value) }}
                  value={company}
                ></TEInput>
                <TEInput
                  type="text"
                  id="Name"
                  label="Enter Name"
                  className='mt-5'
                  onChange={(e) => { setMname(e.target.value) }}
                  value={mname}
                ></TEInput>
                <TESelect
                  data={[{ text: "SnapDragon", value: "snapdragon" }, { text: "Intel Core", value: "intelcore" }, { text: "Ryzen", value: "ryzen" }, { text: "Apple Aseries", value: "apple" }]}
                  placeholder="Select Processor"
                  className='mt-5'
                  onValueChange={(e) => { setprocessor(e.value) }}
                  value={processor}
                  preventFirstSelection
                />
                <TESelect
                  data={[{ text: "Basic", value: "basic" }, { text: "Flip Phones", value: "flip" }, { text: "Smart Phones", value: "smartphone" }, { text: "Slider", value: "slider" }]}
                  placeholder="Select Type"
                  className='mt-5'
                  onValueChange={(e) => { setType(e.value) }}
                  value={type}
                  preventFirstSelection
                />
                <TESelect
                  data={[{ text: "64Gb", value: "64" }, { text: "32Gb", value: "32" }, { text: "16Gb", value: "16" }]}
                  placeholder="Select Memory"
                  className='mt-5'
                  onValueChange={(e) => { setMemory(e.value) }}
                  value={memory}
                  preventFirstSelection
                />
                <TESelect
                  data={[{ text: "Android", value: "android" }, { text: "IOS", value: "ios" }, { text: "Windows", value: "windows" }]}
                  placeholder="Select Operating System"
                  className='mt-5'
                  onValueChange={(e) => { setOs(e.value) }}
                  value={os}
                  preventFirstSelection
                />
                <TEInput
                  type="number"
                  id="actual_price"
                  label="Enter Actual Price"
                  className='mt-5'
                  onChange={(e) => { setActualPrice(e.target.value) }}
                  value={actualPrice}
                ></TEInput>
                <TEInput
                  type="number"
                  id="selling_price"
                  label="Enter Selling Price"
                  className='mt-5'
                  onChange={(e) => { setSellingPrice(e.target.value) }}
                  value={sellingPrice}
                ></TEInput>
                <div>{addMessage}</div>
              </div>
            </TEModalBody>
            <TEModalFooter>
              <TERipple rippleColor="light">

                <button
                  type="button"
                  className="ml-1 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  onClick={handleAddMobile}
                >
                  Add Mobile
                </button>
              </TERipple>
            </TEModalFooter>
          </TEModalContent>
        </TEModalDialog>
      </TEModal>
    </div>
  )
}

export default Home