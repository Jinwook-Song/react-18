import { useState } from 'react';
import Button from '../components/ui/Button';
import { FaClosedCaptioning } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';
import { cls } from '../utils';
import { uploadImage } from '../api/uploader';

type ProductType = {
  id: string;
  title: string;
  price: number;
  category: string;
  description: string;
  options: string;
};

export default function NewProduct() {
  const [product, setProduct] = useState<Partial<ProductType>>({});
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    uploadImage(file!).then(console.log);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.currentTarget;
    if (name === 'file') {
      setFile(files && files[0]);
      return;
    }

    setProduct({ ...product, [name]: value });
  };
  return (
    <section className='w-full max-w-screen-lg h-full flex flex-col justify-center items-center gap-y-4 mt-8 mx-auto px-2 sm:px-6'>
      {file && (
        <div className='relative min-w-40 flex justify-center items-center'>
          <img
            className='h-40'
            src={URL.createObjectURL(file)}
            alt='product preview'
          />
          <button
            className='absolute top-0 right-0'
            onClick={() => setFile(null)}
          >
            <FaXmark className='hover:text-brand' />
          </button>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className='w-full flex flex-col items-center gap-y-2 *:w-full'
      >
        {!file && (
          <>
            <label
              htmlFor='file'
              className={cls(
                'h-10 border border-dashed border-slate-900 rounded-sm shadow-md flex justify-center items-center hover:border-brand cursor-pointer hover:text-brand',
              )}
            >
              제품 이미지 등록
            </label>
            <input
              className='sr-only'
              type='file'
              accept='image/*'
              name='file'
              id='file'
              onChange={handleChange}
              required
            />
          </>
        )}
        <input
          type='text'
          name='title'
          value={product.title ?? ''}
          placeholder='제품명'
          onChange={handleChange}
          required
        />
        <input
          type='number'
          name='price'
          value={product.price ?? ''}
          placeholder='가격'
          onChange={handleChange}
          required
        />
        <input
          type='text'
          name='category'
          value={product.category ?? ''}
          placeholder='카테고리'
          onChange={handleChange}
          required
        />
        <input
          type='text'
          name='description'
          value={product.description ?? ''}
          placeholder='제품 설명'
          onChange={handleChange}
          required
        />
        <input
          type='text'
          name='options'
          value={product.options ?? ''}
          placeholder='옴션들(콤마(,)로 구분)'
          onChange={handleChange}
          required
        />
        <Button text='제품 등록하기' onClick={() => {}} />
      </form>
    </section>
  );
}
