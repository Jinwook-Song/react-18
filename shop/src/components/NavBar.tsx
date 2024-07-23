import { BsFillPencilFill } from 'react-icons/bs';
import { FiShoppingBag } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { login, logout, onUserStateChange } from '../api/firebase';
import { useEffect, useState } from 'react';
import Avatar from './Avatar';
import { UserModel } from '../models';
import Button from './ui/Button';

export default function NavBar() {
  const [user, setUser] = useState<UserModel | null>(null);

  useEffect(() => {
    onUserStateChange((user) => {
      console.log(user);
      setUser(user);
    });
  }, []);

  return (
    <header className='flex justify-between border-b border-gray-300 p-2'>
      <Link to='/' className='flex items-center text-4xl text-brand'>
        <FiShoppingBag />
        <h1 className='hidden sm:block'>Shoppy</h1>
      </Link>
      <nav className='flex items-center gap-4 font-semibold'>
        <Link to='/products'>Products</Link>
        <Link to='/carts'>Carts</Link>
        {user?.isAdmin && (
          <Link to='/products/new'>
            <BsFillPencilFill className='text-2xl' />
          </Link>
        )}
        {user && <Avatar user={user} />}
        {!user && <Button text='Login' onClick={login} />}
        {user && <Button text='Logout' onClick={logout} />}
      </nav>
    </header>
  );
}
