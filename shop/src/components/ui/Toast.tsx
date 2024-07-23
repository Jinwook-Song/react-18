import { useEffect } from 'react';
import { FaXmark } from 'react-icons/fa6';

type ToastProps = {
  message: string;
  duration?: number;
  onClose: () => void;
};

export default function Toast({
  message,
  duration = 4000,
  onClose,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration, onClose]);

  return (
    <div className='fixed bottom-4 right-4 flex gap-x-2 items-center bg-green-500 text-white px-4 py-2 rounded shadow-lg'>
      <p className='font-semibold'>{message}</p>
      <FaXmark onClick={onClose} className='cursor-pointer' />
    </div>
  );
}
