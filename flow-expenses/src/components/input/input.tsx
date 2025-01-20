import "./input.css";

interface InputProps {
  label: string;
  type: string;
  name: string;
  autoComplete: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string
}

function Input({ label, type, name, autoComplete, onChange, value }: InputProps) {
  return (
    <div className="input-container">
      <label className="input-label">{label}</label>
      <input
        type={type}
        name={name}
        autoComplete={autoComplete}
        onChange={onChange}
        value={value}
      ></input>
    </div>
  );
}
export default Input;
