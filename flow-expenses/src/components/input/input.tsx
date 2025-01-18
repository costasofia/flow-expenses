import "./input.css";

interface InputProps {
  label: string;
  type: string;
  name: string;
  autoComplete: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({ label, type, name, autoComplete, onChange }: InputProps) {
  return (
    <div>
      <label>{label}</label>
      <input
        type={type}
        name={name}
        autoComplete={autoComplete}
        onChange={onChange}
      ></input>
    </div>
  );
}
export default Input;
