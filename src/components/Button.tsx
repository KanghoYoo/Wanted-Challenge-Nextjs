import useRouter from "../hooks/useRouter";

interface ButtonProps {
  children: string;
  path: string;
}

const Button = ({ children, path }: ButtonProps) => {
  const { push } = useRouter();
  const handleButtonClick = () => {
    push(`${path}`);
  };

  return (
    <button type="button" onClick={() => handleButtonClick()}>
      {children}
    </button>
  );
};

export default Button;
