import { UserModel } from '../models';

interface AvatarProps {
  user: UserModel;
}
export default function Avatar({
  user: { displayName, photoURL },
}: AvatarProps) {
  return (
    <div className='flex items-center gap-2'>
      <img className='rounded-full size-8' src={photoURL!} alt={displayName!} />
      <span className='hidden md:block'>{displayName}</span>
    </div>
  );
}
