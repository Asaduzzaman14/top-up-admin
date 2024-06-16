import { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { getTopUpToken } from '../../hooks/handelAdminToken';
import axios from 'axios';
import Swal from 'sweetalert2';
import OrderUpdateModal from './OrderUpdateModal';
import { formatToLocalDate } from '../../hooks/formatDate';
import { PuffLoader } from 'react-spinners';

export type IOrder = {
  _id: string;
  userId: string;
  productName: string;
  img: string;
  price: string;
  diamond: string;
  playerId: string;
  orderNumber: number;
  status: string;
};

const CompleteOrder = () => {
  const [datas, setDatas] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateItem, setUpdateItem] = useState<IOrder>();

  const openModal = (data: IOrder) => {
    setUpdateItem(data);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const token = getTopUpToken();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        'http://localhost:5000/api/v1/orders/admin',
        {
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      setLoading(false);
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

  const deleteServices = async (id: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            `http://localhost:5000/api/v1/orders/${id}`,
            {
              headers: {
                Authorization: token,
                'Content-Type': 'application/json',
              },
            },
          );
          fetchData();
          if (response.data.success) {
            Swal.fire({
              title: 'Deleted!',
              text: 'Order has been deleted.',
              icon: 'success',
            });
          } else {
            Swal.fire({
              title: 'Error!',
              text:
                response.data.message || 'An error occurred while deleting.',
              icon: 'error',
            });
          }
        } catch (error) {
          console.error('Error deleting category:', error);
          Swal.fire({
            title: 'Error!',
            text: 'An error occurred while deleting.',
            icon: 'error',
          });
        }
      }
    });
  };

  const pendingOrders = datas?.filter(
    (order) => order?.status.includes('complete'),
  );
  console.log(datas);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Complete Orders" />

      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[90px] py-4 px-4 font-medium text-black dark:text-white">
                  SL NO
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Image
                </th>

                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Product Name
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Order No
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  User name
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Data
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {pendingOrders?.map((order: any, key: any) => (
                <tr key={key}>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {key + 1}
                    </h5>
                  </td>

                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <img className="w-20 h-20" src={order?.img} alt="" />
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {order?.productName}
                    </p>
                  </td>

                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {order?.orderNumber}
                    </p>
                  </td>

                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {order?.userId.email}
                    </p>
                    <span> {order?.userId.name}</span>
                  </td>

                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black uppercase dark:text-white">
                      {formatToLocalDate(order?.createdAt)}
                    </p>
                  </td>

                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black uppercase dark:text-white">
                      {order?.status}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {datas.length == 0 && loading && (
        <PuffLoader className="mx-auto" color="#00ddff" size={40} />
      )}
      <div>
        {isModalOpen && (
          <OrderUpdateModal
            closeModal={closeModal}
            updateItem={updateItem}
            fetchData={fetchData}
          />
        )}
      </div>
    </DefaultLayout>
  );
};

export default CompleteOrder;
