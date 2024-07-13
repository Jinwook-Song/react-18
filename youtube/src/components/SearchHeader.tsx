import { useEffect, useState } from 'react';
import { BsSearch, BsYoutube } from 'react-icons/bs';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function SearchHeader() {
  const { keyword } = useParams();
  const navigate = useNavigate();
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/videos/${text}`);
  };

  useEffect(() => {
    setText(keyword || '');
  }, [keyword]);
  return (
    <header className='w-full flex p-4 text-2xl border-b border-zinc-600 mb-4'>
      <Link to={'/'} className='flex items-center gap-2'>
        <BsYoutube className='text-4xl text-primary' />
        <h1 className='text-3xl font-bold'>YouTube</h1>
      </Link>
      <form className='w-full flex justify-center' onSubmit={handleSubmit}>
        <input
          className='w-7/12 p-2 outline-none bg-black text-gray-50'
          type='text'
          placeholder='Search...'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className='bg-zinc-600 px-4'>
          <BsSearch />
        </button>
      </form>
    </header>
  );
}
