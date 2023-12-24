import React, {useState, useEffect }from 'react'
import Navbar from '../components/Navbar'
import api from '../api/api'

const Profile = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    const [orders, setOrders] = useState([])
    const [orderedMobiles, setOrderedMobiles] = useState([])
    const [displayFilters, setDisplayFilters] = useState(true)
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        retOrders()

        handleResize();
        window.addEventListener('resize', handleResize);
    },[])

    const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
        setDisplayFilters(window.innerWidth >= 768)
        console.log(window.innerWidth)
    };

    const retOrders = () => {
        api.post(
            '/order/ret-order',
            {
                user_id : user._id
            },
            {
                headers: {
                  'Content-Type': 'application/json',
                },
            }
        ).then(response => {
            console.log(response.data)
            setOrders(response.data.orders)
            setOrderedMobiles(response.data.mobile_names)
        })
    }

    return (
        <div>
            <Navbar display = {{displayFilters, setDisplayFilters}} mobileData = {{isMobile, setIsMobile}}/>
            <div className={!isMobile ? 'flex' : ''}>
                <div className={isMobile ? 'bg-slate-100 w-10/12  h-min-content m-5 shadow-lg rounded mt-28 ml-12' : `bg-slate-100 w-2/5  h-56 m-5 shadow-lg rounded mt-28 ml-12`}>
                    <center>
                        <table className='w-11/12 text-left text-sm rounded '>
                            <tbody>
                                <tr className='border-b p-8'>
                                    <th className=" px-3 py-4 w-1/5">Name</th>
                                    <td className=" px-3 py-4 break-all">{user.name}</td>
                                </tr>
                                <tr className='border-b'>
                                    <th className="px-3 py-4">User Name</th>
                                    <td className="px-3 py-4 break-all">{user.username}</td>
                                </tr>
                                <tr className='border-b'>
                                    <th className="px-3 py-4">Email</th>
                                    <td className="px-3 py-4 break-all">{user.email}</td>
                                </tr>
                                <tr className='border-b'>
                                    <th className="px-3 py-4">Phone Number</th>
                                    <td className="px-3 py-4 break-all">{user.phone}</td>
                                </tr>
                            </tbody>
                        </table>
                    </center>
                </div>
                <div className={isMobile ?  'w-10/12 bg-slate-100 m-5 shadow-lg rounded mt-28 ml-12': 'w-1/2 bg-slate-100 m-5 shadow-lg rounded mt-28 ml-12'}>
                    <h1 className='mt-4 text-2xl bold'>Your Orders</h1>
                    <div className='flex flex-wrap'>
                    {
                       orders &&  orders.map((order, i) => {
                            return(
                                <table className='max-w-80 text-left text-sm rounded m-5' >
                                    <tbody>
                                        <tr className='border-b bg-neutral-200 dark:border-neutral-500 dark:bg-neutral-700 p-8'>
                                            <th className="px-6 py-4">Mobile</th>
                                            <td className="px-6 py-4">{orderedMobiles[i].company} {orderedMobiles[i].name}</td>
                                        </tr>
                                        <tr className='border-b bg-white dark:border-neutral-500 dark:bg-neutral-600'>
                                            <th className=" px-6 py-4">Phone Number</th>
                                            <td className="px-6 py-4">{order.phone}</td>
                                        </tr>
                                        <tr className='border-b bg-neutral-200 dark:border-neutral-500 dark:bg-neutral-700'>
                                            <th className="px-6 py-4">Address</th>
                                            <td className="px-6 py-4">{order.address}</td>
                                        </tr>
                                        <tr className='border-b bg-white dark:border-neutral-500 dark:bg-neutral-600'>
                                            <th className="px-6 py-4">Price</th>
                                            <td className="px-6 py-4">{orderedMobiles[i].selling_price}</td>
                                        </tr>
                                        <tr className='border-b bg-neutral-200 dark:border-neutral-500 dark:bg-neutral-700'>
                                            <th className="px-6 py-4">Payment method</th>
                                            <td className="px-6 py-4">{order.payment_type}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            )
                        })
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile