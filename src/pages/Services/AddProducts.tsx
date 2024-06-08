import React, { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import Button from '../../Ui/Button';
import { getTopUpToken } from '../../hooks/handelAdminToken';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Swal from 'sweetalert2';

type IProduct = {
  name: string;
  img: string;
  price: string;
  description: string;
  diamond: string;
  catagoryId: string;
}

const AddProducts = () => {
  const { register, handleSubmit } = useForm<IProduct>();
  const token = getTopUpToken();

  const [catagory, setCatagory] = useState<any>();
  const [datas, setDatas] = useState<any>();
  const [loading, setLoading] = useState<any>(false);
  const [selectedMethod, setSelectedMethod] = useState<any>();

  const getCategory = async () => {
    const token = getTopUpToken();

    try {
      const response = await axios.get(
        'http://localhost:5000/api/v1/categorys/admin',
        {
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      setCatagory(response?.data?.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const onSubmit = async (formData: any) => {
    console.log(formData);
    const token = getTopUpToken();


    try {
      const response = await fetch(
        'http://localhost:5000/api/v1/products',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
          body: JSON.stringify(formData),
        },
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();

      if (responseData.success) {
        Swal.fire({
          title: 'success',
          text: 'Successfully Add Service',
          icon: 'success',
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'error',
        text: 'Something wrong',
        icon: 'error',
      });
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        'http://localhost:5000/api/v1/categorys/admin',
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



  return (
    <DefaultLayout>
      <Breadcrumb pageName="Add Product" />
      <div className="">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full xl:w-1/2">
            <label
              className="mb-2 block text-sm font-medium text-black dark:text-white"
              htmlFor="type"
            >
              Select Catagory
            </label>

            <select
              {...register('catagoryId', { required: true })}
              onClick={(e: any) => setSelectedMethod(e?.target?.value)}
              className="py-3 ps-3 w-full text-black bg-transparent rounded-md border-2 border-boxdark-2 dark:border-boxdark-2dark dark:bg-meta-4 dark:focus:border-primary"
            >
              {/* Map through paymentMethods and render options */}
              {datas?.map((method: any) => (
                <option
                  className="text-black"
                  key={method._id}
                  value={method._id}
                >
                  {method.name}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full xl:w-1/2">
            <label className="mt-2.5 mb-0.5 block text-black dark:text-white">
              Product Name
            </label>
            <input
              type="string"
              {...register('name', { required: true })}
              placeholder="Name"
              className="w-full rounded border-[1.5px] border-boxdark-2 bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          <div className="w-full xl:w-1/2">
            <label className="mt-2.5 mb-0.5 block text-black dark:text-white">
              Product Price
            </label>
            <input
              type="string"
              {...register('price', { required: true })}
              placeholder="Price"
              className="w-full rounded border-[1.5px] border-boxdark-2 bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          <div className="w-full xl:w-1/2">
            <label className="mt-2.5 mb-0.5 block text-black dark:text-white">
              Product Description
            </label>

            <textarea
              className="w-full border-[1.5px] rounded  border-boxdark-2 bg-gray p-2    text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
              id="description"
              rows={6}
              {...register('description', { required: true })}
              placeholder="Write your Service description here"
            ></textarea>
          </div>
          <div className="w-full xl:w-1/2">
            <label className="mt-2.5 mb-0.5 block text-black dark:text-white">
            diamond
            </label>
            <input
              type="string"
              {...register('diamond', { required: true })}
              placeholder="diamond"
              className="w-full rounded border-[1.5px] border-boxdark-2 bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
        
          <div className="w-full xl:w-1/2">
            <label className="mt-2.5 mb-0.5 block text-black dark:text-white">
              Image
            </label>
            <input
              type="string"
              {...register('img', { required: true })}
              placeholder="image link"
              className="w-full rounded border-[1.5px] border-boxdark-2 bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          <Button cs="px-10 my-5 bg-primary" btnName="Submit"></Button>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default AddProducts;
