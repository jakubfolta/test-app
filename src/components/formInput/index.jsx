import './index.css'

const FormInput = ({ type, name, value, onChange, placeholder, required, disabled, isValid, isTouched }) => {
  const inputStyle = isTouched && !isValid ? 'formInput formInput-invalid' : 'formInput';

  return (
    <input
      className={inputStyle}
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
    />
  );
};

export default FormInput;
