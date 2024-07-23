interface ButtonProps {
  text: string;
  onClick: (e: any) => void;
  disabled?: boolean;
}
export default function Button({ text, onClick, disabled }: ButtonProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className='bg-brand text-white px-4 py-2 rounded-sm valid:hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-30 disabled:animate-pulse'
    >
      {text}
    </button>
  );
}
