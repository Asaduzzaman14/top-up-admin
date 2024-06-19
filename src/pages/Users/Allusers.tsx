import { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import axios from 'axios';
import { getTopUpToken } from '../../hooks/handelAdminToken';
import PaginationButtons from '../../components/Pagination/PaginationButtons';
import { PuffLoader } from 'react-spinners';
import SearchInput from '../../components/SearchInput';

const Allusers = () => {
  const [datas, setDatas] = useState<any>([]);
  const [loading, setLoading] = useState<any>(false);

  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setparePage] = useState(25);
  const [search, setSearch] = useState('');

  const token = getTopUpToken();

  const fetchData = async () => {
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

      if (response?.data?.success) {
        setLoading(false);

        setDatas(response?.data?.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // pagination calculate

  const from = currentPage * perPage;
  const to = from + perPage;
  //  pagination end
  const filteredData = datas?.filter(
    (data: any) =>
      data?.name?.toLowerCase().includes(search.toLowerCase()) ||
      data?.phone?.toLowerCase().includes(search.toLowerCase()) ||
      data?.email?.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Users" />

      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full w-100 mb-4">
          <SearchInput placeholder="Search..." setSearch={setSearch} />
        </div>
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[90px] py-4 px-4 font-medium text-black dark:text-white">
                  SL NO
                </th>

                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Name
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Email
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Wallet
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Phone
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData
                ?.slice(from, to)
                .map((packageItem: any, key: any) => (
                  <tr key={key}>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      <h5 className="font-medium text-black dark:text-white">
                        {key + 1}
                      </h5>
                    </td>

                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {packageItem?.name}
                      </p>
                    </td>

                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {packageItem?.email}
                      </p>
                    </td>

                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {packageItem?.wallet}
                      </p>
                    </td>

                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {packageItem?.phone}
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
      {loading && <PuffLoader className="mx-auto" color="#00ddff" size={40} />}
    </DefaultLayout>
  );
};

export default Allusers;
