import React, { useState } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import './select.css';

interface Option {
  label: string;
  value:  number;
}

interface SelectProps {
  label: string;
  options: Option[];
  onSelectOption: (option: Option) => void;
   value: string |undefined
  selectedOption?: { label: string; value: number };
}

function Select({ label, options, onSelectOption,  selectedOption, value  }: SelectProps) {
  const [currentOption, setCurrentOption] = useState<{ label: string; value: number }>(
    selectedOption || { label: '', value: 0 }
  );
  const [isOpen, setIsOpen] = useState(false);
  console.log(currentOption)

  const openDropDown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="select-container">
      <div className="select-box" role="combobox" onClick={openDropDown}>
      {value|| label}
        <span className="arrow-icon">
          {isOpen ? <MdKeyboardArrowUp className='icons'/> : <MdKeyboardArrowDown  className='icons'/>}
        </span>
      </div>
      {isOpen && (
        <div className="select-dropdown">
          <ul>
            {options.map((option, index) => (
              <li
                role="option"
                key={index}
                value={option.value}
                onClick={() => {
                  const numericValue = Number(option.value); 
                  const newOption = { ...option, value: numericValue };
                  onSelectOption(newOption);
                  setCurrentOption(newOption); 
                  setIsOpen(false);
                }}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Select;

