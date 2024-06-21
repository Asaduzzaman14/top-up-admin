import React, { useEffect, useState } from 'react';
import CardDataStats from '../../components/CardDataStats';
import DefaultLayout from '../../layout/DefaultLayout';
import UserIcon from '../../assets/icon/UserIcon';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { PiPackage } from 'react-icons/pi';
import axios from 'axios';
import { getTopUpToken, handleLogout } from '../../hooks/handelAdminToken';

const AdminDashboard: React.FC = () => {
  const [datas, setDatas] = useState<any>([]);
  const [catagorys, setCatagorys] = useState<any>([]);
  const [users, setUsers] = useState<any>([]);
  const [services, setServices] = useState<any>([]);
  const [orders, setOrders] = useState<any>([]);
  const [loding, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const token = getTopUpToken();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        'https://api.ajgameshop.xyz/api/v1/categorys/admin',
        {
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      setLoading(false);

      if (response?.data?.success) {
        setCatagorys(response?.data?.data);
      }
    } catch (error: any) {
      console.log(error);
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        handleLogout();
        navigate('/');
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchServiceData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        'https://api.ajgameshop.xyz/api/v1/products',
        {
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      setLoading(false);

      if (response?.data?.success) {
        setServices(response?.data?.data);
      }
    } catch (error: any) {
      console.error('Error fetching data:', error);
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        handleLogout();
        navigate('/');
      }
    }
  };

  useEffect(() => {
    fetchServiceData();
  }, []);

  const getusers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        'https://api.ajgameshop.xyz/api/v1/user/admin',
        {
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      setLoading(false);

      if (response?.data?.success) {
        setUsers(response?.data?.data);
      }
    } catch (error: any) {
      console.error('Error fetching data:', error);
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        handleLogout();
        navigate('/');
      }
    }
  };

  useEffect(() => {
    getusers();
  }, []);
  console.log(catagorys);

  const fetchOrderData = async () => {
    try {
      const response = await axios.get(
        'https://api.ajgameshop.xyz/api/v1/orders/admin',
        {
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      if (response?.data?.success) {
        setOrders(response?.data?.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchOrderData();
  }, []);

  let totalSell = 0;
  for (let index = 0; index < orders.length; index++) {
    if (orders[index].status == 'complete') {
      totalSell += Number(orders[index].price);
    }
  }

  let balance = 0;
  for (let index = 0; index < users.length; index++) {
    balance += Number(users[index].wallet);
  }
  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <Link to={'/catagory'}>
          <CardDataStats
            title="All Catagory"
            total={`${catagorys ? catagorys?.length : '0'}`}
          >
            <PiPackage className="text-2xl dark:text-white text-primary" />
          </CardDataStats>
        </Link>

        <Link to={'/all-product'}>
          <CardDataStats
            title="All  Products"
            total={`${services ? services?.length : '00'}  `}
          >
            <UserIcon />
          </CardDataStats>
        </Link>

        <Link to={'/all-users'}>
          <CardDataStats
            title="All Users"
            total={`${users ? users?.length : '00'}`}
          >
            <UserIcon />
          </CardDataStats>
        </Link>

        <Link to={'/order/all-orders'}>
          <CardDataStats
            title="All Orders"
            total={`${orders ? orders?.length : '00'}`}
          >
            <UserIcon />
          </CardDataStats>
        </Link>

        <div>
          <CardDataStats
            title="Total Sell"
            total={`${orders ? totalSell : '00'}`}
          >
            <UserIcon />
          </CardDataStats>
        </div>

        <div>
          <CardDataStats
            title="All users wallet"
            total={`${users ? balance : '00'}`}
          >
            <UserIcon />
          </CardDataStats>
        </div>
      </div>

      <div className="mt-5">
        {/* <LastestDeposits /> */}
        <div className="mt-5">{/* <LatestPurchaseHistory /> */}</div>
      </div>
    </DefaultLayout>
  );
};

export default AdminDashboard;
