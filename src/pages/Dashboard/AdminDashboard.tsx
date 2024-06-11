import React, { useEffect, useState } from 'react';
import CardDataStats from '../../components/CardDataStats';
import DefaultLayout from '../../layout/DefaultLayout';
import UserIcon from '../../assets/icon/UserIcon';
import { Link } from 'react-router-dom';
import { PiPackage } from 'react-icons/pi';
import axios from 'axios';
import { getTopUpToken } from '../../hooks/handelAdminToken';

const AdminDashboard: React.FC = () => {
  const [datas, setDatas] = useState<any>([]);
  const [catagorys, setCatagorys] = useState<any>([]);
  const [users, setUsers] = useState<any>([]);
  const [services, setServices] = useState<any>([]);
  const [loding, setLoading] = useState<boolean>(false);

  const token = getTopUpToken();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        'https://topup-app-server.vercel.app/api/v1/categorys/admin',
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
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchServiceData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        'https://topup-app-server.vercel.app/api/v1/products',
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
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchServiceData();
  }, []);

  const getusers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        'https://topup-app-server.vercel.app/api/v1/user/admin',
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
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getusers();
  }, []);
  console.log(catagorys);

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

        <Link to={'/all-orders'}>
          <CardDataStats
            title="All Orders"
            total={`${users ? users?.length : '00'}`}
          >
            <UserIcon />
          </CardDataStats>
        </Link>
      </div>

      <div className="mt-5">
        {/* <LastestDeposits /> */}
        <div className="mt-5">{/* <LatestPurchaseHistory /> */}</div>
      </div>
    </DefaultLayout>
  );
};

export default AdminDashboard;
