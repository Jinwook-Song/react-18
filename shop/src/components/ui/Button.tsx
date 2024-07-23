interface ButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}
export default function Button({ text, onClick, disabled }: ButtonProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className='bg-brand text-white px-4 py-2 rounded-sm hover:brightness-105'
    >
      {text}
    </button>
  );
}
