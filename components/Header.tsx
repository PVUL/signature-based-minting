interface Props {
  className?: string;
}
export const Header = ({ className }: Props) => {
  return (
    <div
      className={`fixed top-0 left-0 w-1/4 h-screen bg-pink-500 border-black border-r-1 ${className}`}
    >
      hello world
    </div>
  );
};
