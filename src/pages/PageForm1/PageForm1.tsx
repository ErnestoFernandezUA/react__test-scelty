import React, { ChangeEvent, FunctionComponent, useState } from "react";
import { useNavigate } from 'react-router-dom';
import './PageForm1.scss'
 
const initialValues = {
  carBrand: '',
  zipCode: '',
};

const initialErrors = {
  carBrand: [],
  zipCode: [],
};

type Keys = 'carBrand' | 'zipCode';
type ValidData = {[key in Keys]: string[]}
type Value = {[key in Keys]: string};
type Error = {[key in Keys]: string[]}

const validData: ValidData = {
  carBrand: ['Audi', 'BMW', 'Nissan'],
  zipCode: ['65000', '66000', '67000', '68000'],
}

export const PageForm1: FunctionComponent = () => {
  const [value, setValue] = useState<Value>(initialValues);
  const [error, setError] = useState<Error>(initialErrors);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const navigate = useNavigate();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => { 
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });

    setError({
      ...error,
      [e.target.name]: initialErrors[e.target.name as keyof Error],
    })
  };

  const isValid = () => {
    setError(initialErrors);
    let isValidInput = true;

    for(const key in value){
      if (!value[key as keyof Value]) {
        setError(error => ({
          ...error,
          [key as keyof Error]:[...error[key as keyof Error], `${key} is required!`],
        }));
        isValidInput = false;
      }

      if (!validData[key as keyof ValidData]
        .some(el => el.toLowerCase() === value[key as keyof Value].toLowerCase())) {
          setError(error => ({
            ...error,
            [key as keyof Error]:[...error[key as keyof Error], `value of ${key} is not valid!`],
          }));
        isValidInput = false;
      }
    }

    console.log('isValidInput', isValidInput);

    if (!isValidInput) {
      console.log('is not valid!');
    }

    return isValidInput;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isValid()) {
      setTimeout(() => {
        setValue(initialValues);
        navigate('/form2');
      }, 2000)
    } else {
      console.log('show popup wrong data');
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 3000)
    }
  };

  console.log(value, error);

  return (
    <div className="PageForm1">
      <h2>Form1</h2>
      
      <form onSubmit={onSubmit}>
        {Object.keys(value).map(key => (
          <div key={key}>
            <label htmlFor={key}>
              {key}:&nbsp;
              <input
                id={key}
                type="text"
                name={key}
                value={value[key as keyof Value]}
                onChange={onChange}
                placeholder={`input ${key}`}
              />
              </label>
            <br />
            <ul>
              {error[key as keyof Error].map(e => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </div>
        ))}

        <button
          onClick={onSubmit}
        >
          Submit
        </button>
      </form>
      
      {showPopup && (
        <h2>show popup wrong data</h2>
      )}
      

      {/* <Link to={'/'}>Back</Link>
      &nbsp;
      <Link to={'/form2'}>Form2</Link> */}


    </div>
  );
}
 