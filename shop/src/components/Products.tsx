import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../api/firebase';
import ProductCard from './ProductCard';

export default function Products() {
  const {
    isPending,
    error,
    data: products,
  } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  if (isPending) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4'>
      {products?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ul>
  );
}
