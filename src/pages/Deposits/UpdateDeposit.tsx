import { ChangeEvent, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { PuffLoader } from 'react-spinners';
import { getTopUpToken } from '../../hooks/handelAdminToken';
import { IDeposit } from './Deposits';

export const UpdateDeposti = ({ fetchData, closeModal, updateItem }: any) => {
  const token = getTopUpToken();

  const [lodaing, setLoading] = useState(false);
  const { register, handleSubmit } = useForm<IDeposit>();

  //
  const [selectedOption, setSelectedOption] = useState<any>(updateItem.status);
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

  //
  const onSubmit: SubmitHandler<IDeposit> = async (data: IDeposit) => {
    setLoading(true);
    const statusData = {
      status: selectedOption,
    };

    try {
      const response = await fetch(
        `https://ajgameshop.xyz/api/v1/deposit/${updateItem?._id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
          body: JSON.stringify(statusData),
        },
      );
      fetchData();

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      if (responseData.success) {
        setLoading(false);
        //   fetchData();
        Swal.fire({
          title: 'Success',
          text: 'Successfully Order updated',
          icon: 'success',
        }).then(() => {
          closeModal();
        });
      }
    } catch (error) {
      setLoading(false); // Ensure loading state is reset in case of error
      console.error('Error updating package:', error); // Log the error for debugging
      Swal.fire({
        title: 'Error',
        text: 'Something went wrong',
        icon: 'error',
      });
    }
  };
  const changeTextColor = () => {
    setIsOptionSelected(true);
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
                Update Deposit
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
              <div className="relative z-20 bg-transparent dark:bg-form-input">
                <select
                  name="status"
                  value={selectedOption}
                  onChange={(e) => {
                    setSelectedOption(e.target.value);
                    changeTextColor();
                  }}
                  className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                    isOptionSelected ? 'text-black dark:text-white' : ''
                  }`}
                >
                  <option
                    value=""
                    disabled
                    className="text-body dark:text-bodydark"
                  >
                    Select Status
                  </option>
                  <option
                    value="pending"
                    className="text-body dark:text-bodydark"
                  >
                    Pending
                  </option>
                  <option
                    value="completed"
                    className="text-body dark:text-bodydark"
                  >
                    Complete
                  </option>
                  <option
                    value="rejected"
                    className="text-body dark:text-bodydark"
                  >
                    Rejected
                  </option>
                </select>

                <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                  <svg
                    className="fill-current"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g opacity="0.8">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                        fill=""
                      ></path>
                    </g>
                  </svg>
                </span>
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
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
