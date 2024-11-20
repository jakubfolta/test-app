import { useState } from 'react';
import FormInput from '../../components/formInput';
import './index.css';
import SubmitButton from '../../components/submitButton';

const defaultFormState = {
  firstName: {
    value: '',
    isValid: false,
    isTouched: false,
    rules: {
      minLength: 2
    }
  },
  lastName: {
    value: '',
    isValid: false,
    isTouched: false,
    rules: {
      minLength: 2
    }
  },
  phoneNumber: {
    value: '',
    isValid: false,
    isTouched: false,
    rules: {
      isPhone: true
    }
  },
  serviceType: {
    value: '',
    isValid: false,
    isTouched: false,
    rules: {
      minLength: 4
    }
  },
}

const Contact = () => {
  const [formState, setFormState] = useState({...defaultFormState});
  const [isValidForm, setIsValidForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [isMessageSent, setIsMessageSent] = useState(false);
  const [message, setMessage] = useState('');
  
  const checkValidity = (value, rules) => {
    let isValid = false;
    
    if ('minLength' in rules) {
      isValid = value.trim().length >= rules.minLength;
    } else {
      const pattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
      isValid = pattern.test(value);
    }

    return isValid;
  };

  const onChangeHandler = (e) => {
    const fieldType = e.target.id;
    const fieldValue = e.target.value;
    const fieldRules = formState[fieldType].rules;
    
    let updatedFormFields = JSON.parse(JSON.stringify(formState));
    const updatedField = updatedFormFields[fieldType];
    updatedField.isTouched = true;
    
    if (Object.keys(fieldRules).length) {
      const isValueValid = checkValidity(fieldValue, fieldRules);
      updatedField.isValid = isValueValid;
    }
    updatedField.value = fieldValue;
    updatedFormFields = {...updatedFormFields, [fieldType]: updatedField};

    let isFormValid = true;
    for (let el in updatedFormFields) {
      isFormValid = isFormValid && updatedFormFields[el].isValid;
    }

    setFormState(updatedFormFields);
    setIsValidForm(isFormValid);
  };

  const setSendingMessageResult = (message, messageSent) => {
    setIsLoading(false);
    setIsMessageSent(messageSent);
    setMessage(message);
    setShowMessage(true);
  }

  const mockedPostRequest = () => {
    const isResolved = Math.floor(Math.random() * 2);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (isResolved) {
          resolve(1);
        } else { reject(0) }
      }, 2000);
    });
  };

  const onSubmitFormHandler = (e) => {
    e.preventDefault();
    setShowMessage(false);
    setIsLoading(true);

    const formData = {
      firstName: formState.firstName.value,
      lastName: formState.lastName.value,
      phoneNumber: formState.phoneNumber.value,
      serviceType: formState.serviceType.value,
    };

    // axios.post("http://localhost:8000/send-message", formData)
    mockedPostRequest()
      .then(result => {
        setSendingMessageResult('Your message is on the way.', true);
        setFormState(defaultFormState);
        setIsValidForm(false);

        setTimeout(() => {
          setShowMessage(false);
        }, 5000);
      })
      .catch(error => {
        console.log('ERROR', error);
        setSendingMessageResult('We have a problem with sending your message. Try again later.', false);
      })
  }

  return (
    <section className='section__contact'>
      <div className='section__contact-wrapper'>

        <div className='leftContainer'>
          <h2 className='leftContainer__heading'>Contact</h2>
          <p className='leftContainer__description'>
            Questions or concerns? Just fill out the form below and our support team will get back to you within 24 hours
          </p>
        </div>

        <div className='rightContainer'>
          <form
            className='form'
            onSubmit={onSubmitFormHandler}
            >
            <div className='form__group'>
              <div className='form__fieldWrapper'>
                <label htmlFor="firstName" />
                <FormInput
                  type='text'
                  name='firstName'
                  placeholder='First Name'
                  id='firstName'
                  isValid={formState.firstName.isValid}
                  isTouched={formState.firstName.isTouched}
                  value={formState.firstName.value}
                  onChange={onChangeHandler}
                />
              </div>
              <div className='form__fieldWrapper'>
                <label htmlFor="lastName" />
                <FormInput
                  type='text'
                  name='lastName'
                  placeholder='Last Name'
                  id='lastName'
                  isValid={formState.lastName.isValid}
                  isTouched={formState.lastName.isTouched}
                  value={formState.lastName.value}
                  onChange={onChangeHandler}
                />
              </div>
            </div>
            
            <div className='form__fieldWrapper form__fieldWrapper-full'>
              <label htmlFor="phoneNumber" />
              <FormInput
                type='tel'
                name='phoneNumber'
                placeholder='Phone Number'
                id='phoneNumber'
                isValid={formState.phoneNumber.isValid}
                isTouched={formState.phoneNumber.isTouched}
                value={formState.phoneNumber.value}
                onChange={onChangeHandler}
              />
            </div>

            <div className='form__fieldWrapper form__fieldWrapper-full'>
              <label htmlFor="serviceType" />
              <FormInput
                type='text'
                name='serviceType'
                placeholder='What Service are you interested in?'
                id='serviceType'
                isValid={formState.serviceType.isValid}
                isTouched={formState.serviceType.isTouched}
                value={formState.serviceType.value}
                onChange={onChangeHandler}
              />
            </div>

            <div className='form__submitContainer'>
              { showMessage && 
                <span
                  style={isMessageSent ? {color: 'var(--color-success)'} : {color: 'var(--color-warning)'}}
                  className='form__submitContainer-message'>{message}</span> 
              }
              <SubmitButton
                type='submit'
                isFormValid={isValidForm}
                disabled={!isValidForm || isLoading}
                >{isLoading ? 'Sending...' : 'Submit Now'}</SubmitButton>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
