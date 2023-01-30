import React, { ChangeEvent, FunctionComponent, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { selectInputs, selectResult, setInput } from "../../features/Inputs/inputSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import './ResultPage.scss'

interface InputsType<T> {
  carBrand: T,
  zipCode: T,
  firstName: T,
  lastName: T,
  carModel: T,
  firstRegistration: T,
}

export const ResultPage: FunctionComponent = () => {
  const result = useAppSelector(selectResult) as InputsType<string>;
  const coin = Math.random() < 0.5;
  
  return (
    <div className="ResultPage">
      <h2>ResultPage</h2>

      <div className="ResultPage__nav">
        <Link to={'/'}>
          <button className="ResultPage__button-nav">Start again</button>
        </Link>

        <Link to={'/form1'} className="ResultPage__button-nav">
          <button>Goto Form#1</button>
        </Link>

        <Link to={'/form2'} className="ResultPage__button-nav">
          <button>Goto Form#2</button>
        </Link>
      </div>
      

      {coin ? (
        <div>
          <h3>Result 1</h3>

          {Object.keys(result).map(key => (
            <div key={key}>{`${key}`}: {result[key as keyof InputsType<string>]}</div>
          ))}
        </div>
      ) : (
        <div>
          <h3>Result 2</h3>

          <div>{`FullName: ${result.firstName} ${result.lastName}`}</div>
          <div>{`Car: ${result.carModel} ${result.carBrand}`}</div>
        </div>
      )}



      
    </div>
  );
}
 