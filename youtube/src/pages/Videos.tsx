import { useParams } from 'react-router-dom';

export default function Videos() {
  const { keyword } = useParams();
  return <div className=''>Videos {keyword ?? '🔥'}</div>;
}
