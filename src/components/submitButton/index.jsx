import './index.css'

const SubmitButton = ({ type, name, onChange, disabled, isFormValid, children }) => {
  const buttonStyle = isFormValid ? 'submitButton' : 'submitButton submitButton-invalid';

  return (
    <button
      className={buttonStyle}
      type={type}
      name={name}
      onChange={onChange}
      disabled={!isFormValid && disabled}>{children}</button>
  );
};

export default SubmitButton;
