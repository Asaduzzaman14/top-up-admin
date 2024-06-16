import { useEffect, useState } from 'react';

import axios from 'axios';
import { getTopUpToken } from '../../hooks/handelAdminToken';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { PayUpdateModal } from './PayUpdateModal';

const Payment = () => {
  const [datas, setDatas] = useState<any>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateItem, setUpdateItem] = useState<any>();

  const openModal = (data: any) => {
    setUpdateItem(data);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const token = getTopUpToken();

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/v1/payment', {
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (response?.data?.success) {
        setDatas(response?.data?.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Payment" />

      {/* <div>
        <button
          type="button"
          onClick={() => setAddPaymentModal(true)}
          className="btn mb-3 flex justify-center rounded bg-strokedark py-2 px-6 font-medium text-gray hover:shadow-1"
        >
          Add Payment
        </button>
      </div> */}
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[90px] py-4 px-4 font-medium text-black dark:text-white">
                  SL NO
                </th>

                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  apiKey
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  pannelUrl
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Status
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {datas?.map((packageItem: any, key: any) => (
                <tr key={key}>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {key + 1}
                    </h5>
                  </td>

                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {packageItem?.apiKey}
                    </p>
                  </td>

                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {packageItem?.pannelUrl}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {packageItem?.status}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-3 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      {/* edit btn */}
                      <button
                        onClick={() => openModal(packageItem)}
                        className="hover:text-primary"
                      >
                        <svg
                          className="w-6 h-6 text-gray-800  "
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1"
                            d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        {isModalOpen && (
          <PayUpdateModal
            closeModal={closeModal}
            updateItem={updateItem}
            fetchData={fetchData}
          />
        )}
      </div>
    </DefaultLayout>
  );
};

export default Payment;
