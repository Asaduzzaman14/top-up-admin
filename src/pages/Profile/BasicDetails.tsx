import { SubmitHandler, useForm } from 'react-hook-form';
import { getTopUpToken } from '../../hooks/handelAdminToken';
import { useState } from 'react';
import Swal from 'sweetalert2';

interface UserProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

const BasicDetails = ({ profile, fetchData }: any) => {
  console.log(profile);

  const token = getTopUpToken();

  const [updateLodaing, setUpdateLodaing] = useState(false);

  const [bonusData, setBonusData] = useState<any>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserProfile>();

  const onSubmit: SubmitHandler<UserProfile> = async (data: UserProfile) => {
    setUpdateLodaing(true);

    const newData = { ...data, id: bonusData[0]?.id };
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/user/${profile?._id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
          body: JSON.stringify(newData),
        },
      );
      fetchData();
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      setUpdateLodaing(false);
      if (responseData.success) {
        reset();

        Swal.fire({
          title: 'success',
          text: 'Successfully Updateed',
          icon: 'success',
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Faield',
        text: 'Failed to update settings',
        icon: 'error',
      });
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 px-4 lg:w-[500px]"
      >
        <div className="w-full">
          <label className="mb-2.5 block text-black dark:text-white">
            Name
          </label>
          <input
            type="text"
            placeholder="Enter your last name"
            {...register('name', { required: 'This field is required' })}
            defaultValue={profile?.name as string}
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>

        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">
            Email
          </label>
          <input
            disabled
            type="email"
            {...register('email')}
            defaultValue={profile?.email as string}
            placeholder="Enter your email address"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>

        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">
            Phone
          </label>
          <input
            type="phone"
            {...register('phone')}
            defaultValue={profile?.phone as string}
            placeholder="Phone"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>

        <button className="flex px-7 mx-auto justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
          Submit
        </button>
      </form>
    </>
  );
};

export default BasicDetails;
