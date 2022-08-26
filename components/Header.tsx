import { Login } from './Login';

interface Props {
  className?: string;
}
export const Header = ({ className }: Props) => {
  return (
    <div className={`fixed bg-pink-500 w-screen z-30 ${className}`}>
      <Login />
    </div>
  );
};

// fixed top-0 left-0 md:h-screen  border-black border-r-1
