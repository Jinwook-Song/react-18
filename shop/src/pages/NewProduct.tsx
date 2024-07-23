import { useState } from 'react';

import { v4 as uuid } from 'uuid';

import Button from '../components/ui/Button';
import { FaXmark } from 'react-icons/fa6';
import { cls } from '../utils';
import { uploadImage } from '../api/uploader';
import { addNewProduct } from '../api/firebase';
import { useAuthContext } from '../context/AuthContext';
import Toast from '../components/ui/Toast';

export type ProductType = {
  id: string;
  uid: string;
  image: string;
  title: string;
  price: number;
  category: string;
  description: string;
  options: string;
};

export default function NewProduct() {
  const { user } = useAuthContext();

  const [product, setProduct] = useState<Partial<ProductType>>({});
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploading(true);
    try {
      const image = await uploadImage(file!);
      const id = uuid();
      const newProduct = {
        ...product,
        id,
        uid: user!.uid,
        price: +product.price!,
        image,
      } as ProductType;

      await addNewProduct(newProduct);
      setSuccess(true);
      setFile(null);
      setProduct({});
    } catch (error) {
      setSuccess(false);
    } finally {
      setUploading(false);
    }
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
    <section className='w-full max-w-screen-lg h-full flex flex-col justify-center items-center gap-y-4 mx-auto px-2 sm:px-6'>
      <h2 className='text-lg font-bold my-4'>새로운 제품 등록</h2>
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
        id='add-product'
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
        <Button disabled={uploading} text='제품 등록하기' onClick={() => {}} />
      </form>
      {success === true && (
        <Toast
          message={'제품이 업로드 되었습니다.'}
          onClose={() => {
            setSuccess(null);
          }}
        />
      )}
    </section>
  );
}
