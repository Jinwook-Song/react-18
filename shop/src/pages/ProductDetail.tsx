import { useLocation } from 'react-router-dom';
import { ProductType } from './NewProduct';
import { useState } from 'react';
import Button from '../components/ui/Button';

export default function ProductDetail() {
  const { state: product } = useLocation() as { state: ProductType };
  const {
    title,
    price,
    category,
    image,
    options: stringOptions,
    description,
  } = product;
  const options = stringOptions.split(',');

  const [selected, setSelected] = useState(options && options[0]);

  const handleClick = () => {};

  return (
    <section className='p-4 flex flex-col gap-2'>
      <p className='text-gray-700'>{category}</p>
      <section className='flex flex-col sm:flex-row gap-2'>
        <img className='w-full basis-7/12' src={image} alt={title} />
        <div className='w-full basis-5/12 flex flex-col gap-2'>
          <h2 className='text-3xl font-bold'>{title}</h2>
          <p className='text-2xl font-bold border-b border-gray-400'>
            ₩{price}
          </p>
          <p className='text-lg'>{description}</p>
          <div className='flex items-center gap-4'>
            <label className='text-brand font-bold' htmlFor='select-option'>
              옵션:
            </label>
            <select
              id='select-option'
              className='ring-1 focus:ring-1 ring-gray-400 focus:ring-brand transition'
              onChange={(e) => setSelected(e.currentTarget.value)}
              value={selected}
            >
              {options.map((option, index) => (
                <option key={index}>{option}</option>
              ))}
            </select>
          </div>
          <Button text='장바구니에 추가' onClick={handleClick} />
        </div>
      </section>
    </section>
  );
}
