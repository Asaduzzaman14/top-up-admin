import React, { ChangeEvent, useState } from 'react';
import { getTopUpToken } from '../../hooks/handelAdminToken';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IBanner } from './Banner';
import Swal from 'sweetalert2';
import { PuffLoader } from 'react-spinners';

const Addbanners = ({ fetchData, closeModal }: any) => {
  const token = getTopUpToken();
  const [lodaing, setLoading] = useState(false);

  const { register, handleSubmit } = useForm<IBanner>();

  const onSubmit: SubmitHandler<IBanner> = async (data: IBanner) => {
    setLoading(true);

    try {
      const response = await fetch(
        `https://topup-app-server.vercel.app/api/v1/banners`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
          body: JSON.stringify(data),
        },
      );

      const responseData = await response.json();

      if (!response.ok || !responseData.success) {
        throw new Error(responseData.message || 'Network response was not ok');
      }

      Swal.fire({
        title: 'Success',
        text: 'Successfully banner Added',
        icon: 'success',
      }).then(() => {
        closeModal();
        fetchData(); // Fetch data after closing modal to ensure data is updated correctly
      });
    } catch (error) {
      console.error('Error adding banner:', error); // Log the error for debugging
      Swal.fire({
        title: 'Error',
        text: 'Something went wrong',
        icon: 'error',
      });
    } finally {
      setLoading(false); // Ensure loading state is reset in both success and error cases
    }
  };

  return (
    <div className="fixed left-0 top-0 z-999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 py-5">
      <div
        className="overflow-auto  max-h-[80%] w-full max-w-fit rounded-lg bg-white   dark:bg-boxdark "
        onClick={(e) => {
          const target = e.target as HTMLDivElement;
          if (target.className === 'modal-container') closeModal();
        }}
      >
        <div className="modal rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark overflow-auto">
          <div className="min-w-full w-[370px] lg:w-[600px] border-b border-stroke  dark:border-strokedark">
            <div className="w-full bg-slate-200 flex justify-between  place-items-center p-2 py-3">
              <h2 className="text-xl font-bold text-black dark:text-white">
                Add Banner
              </h2>

              <strong
                className="text-xl px-2 align-center cursor-pointer  hover:text-black dark:hover:text-white"
                onClick={closeModal}
              >
                X
              </strong>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex  flex-col w-full gap-5.5 p-6.5"
            >
              <div>
                <p>Image Link</p>
                <input
                  className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  {...register('img', { required: true })}
                />
              </div>
              <div>
                <p>Others Url</p>
                <input
                  className="w-full rounded border border-stroke bg-gray py-3 pl-3 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  {...register('url', { required: true })}
                />
              </div>

              <div className="flex justify-center gap-4">
                <div>
                  {lodaing ? (
                    <PuffLoader className="mx-auto" color="#36d7b7" size={40} />
                  ) : (
                    <button
                      className="btn flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
                      type="submit"
                    >
                      Submit
                    </button>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => closeModal()}
                  className="btn flex justify-center rounded bg-danger py-2 px-6 font-medium text-gray hover:shadow-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addbanners;
