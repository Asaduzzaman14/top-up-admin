import { useEffect, useState } from 'react';

import axios from 'axios';
import { getTopUpToken } from '../../hooks/handelAdminToken';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import PaginationButtons from '../../components/Pagination/PaginationButtons';
import { AddPaymentModal } from './AddPaymentModal';

const Payment = () => {
  const [datas, setDatas] = useState<any>([]);
  const [addPaymentModal, setAddPaymentModal] = useState(false);

  const token = getTopUpToken();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://topup-app-server.vercel.app/api/v1/payment',
        {
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
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

  const closeAddModal = () => {
    setAddPaymentModal(false);
  };

  console.log(datas);

  // pagination calculate
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setparePage] = useState(25);

  const from = currentPage * perPage;
  const to = from + perPage;
  //  pagination end

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Payment" />

      <div>
        <button
          type="button"
          onClick={() => setAddPaymentModal(true)}
          className="btn mb-3 flex justify-center rounded bg-strokedark py-2 px-6 font-medium text-gray hover:shadow-1"
        >
          Add Payment
        </button>
      </div>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[90px] py-4 px-4 font-medium text-black dark:text-white">
                  SL NO
                </th>

                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Email
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Name
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  apiKey
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  pannelUrl
                </th>
              </tr>
            </thead>
            <tbody>
              {datas?.slice(from, to).map((packageItem: any, key: any) => (
                <tr key={key}>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {key + 1}
                    </h5>
                  </td>

                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {packageItem?.userId?.email}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {packageItem?.userId?.name}
                    </p>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="my-4">
          <PaginationButtons
            totalPages={Math.ceil(datas.length / perPage)}
            currentPage={2}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>

      <div>
        {addPaymentModal && (
          <AddPaymentModal closeModal={closeAddModal} fetchData={fetchData} />
        )}
      </div>
    </DefaultLayout>
  );
};

export default Payment;
