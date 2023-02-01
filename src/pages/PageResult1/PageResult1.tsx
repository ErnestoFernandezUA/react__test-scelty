import React, { FunctionComponent, useEffect } from "react";
import { Link } from 'react-router-dom';
import { clearState, selectResult } from "../../store/features/Inputs/inputSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { InputsType } from "../../type/FormObject";
import './PageResult1.scss'

export const PageResult1: FunctionComponent = () => {
  const result = useAppSelector(selectResult) as InputsType<string>;
  const dispatch= useAppDispatch();

  useEffect(() => {
    return () => {
      console.log('unmount');
      dispatch(clearState());
    }
  });
  
  return (
    <div className="PageResult1">
      <h2>PageResult1</h2>

      <div className="PageResult1__nav">
        <Link to={'/'}>
          <button className="PageResult1__button-nav">Start again</button>
        </Link>

        <Link to={'/form1'} className="PageResult1__button-nav">
          <button>Goto Form#1</button>
        </Link>

        <Link to={'/form2'} className="PageResult1__button-nav">
          <button>Goto Form#2</button>
        </Link>
      </div>

      <div>
        <h3>Result 1</h3>

        {Object.keys(result).map(key => (
          <div key={key}>{`${key}`}: {result[key as keyof InputsType<string>]}</div>
        ))}
      </div>
    </div>
  );
}
 