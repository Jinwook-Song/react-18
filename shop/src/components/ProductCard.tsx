import { useNavigate } from 'react-router-dom';
import { ProductType } from '../pages/NewProduct';

type ProductCardProps = {
  product: ProductType;
};

export default function ProductCard({ product }: ProductCardProps) {
  const { id, title, price, category, image } = product;
  const nav = useNavigate();
  return (
    <li
      onClick={() => nav(`/products/${id}`, { state: product })}
      className='rounded-lg shadow-md overflow-hidden cursor-pointer group gap-2 p-2 active:border'
    >
      <img
        className='group-hover:scale-105 w-full aspect-[3/4] transition-transform object-scale-down'
        src={image}
        alt={title}
      />
      <div className='text-lg flex justify-between'>
        <h3 className='truncate'>{title}</h3>
        <p>₩{price}</p>
      </div>
      <p className='text-gray-600'>{category}</p>
    </li>
  );
}
