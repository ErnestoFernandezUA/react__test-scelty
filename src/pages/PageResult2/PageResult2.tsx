import React, { FunctionComponent, useEffect } from "react";
import { Link } from 'react-router-dom';
import { clearState, selectResult } from "../../store/features/Inputs/inputSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { FormObject, Keys } from "../../type/FormObject";
import './PageResult2.scss'



export const PageResult2: FunctionComponent = () => {
  const result = useAppSelector(selectResult) as FormObject<Keys, string>;
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      console.log('unmount');
      dispatch(clearState());
    }
  });
  
  return (
    <div className="PageResult2">
      <h2>PageResult 2</h2>

      <div className="PageResult2__nav">
        <Link to={'/'}>
          <button className="PageResult2__button-nav">Start again</button>
        </Link>

        <Link to={'/form1'} className="PageResult2__button-nav">
          <button>Goto Form#1</button>
        </Link>

        <Link to={'/form2'} className="PageResult2__button-nav">
          <button>Goto Form#2</button>
        </Link>
      </div>
      
      <div>
        <h3>Result 2</h3>

        <div>{`FullName: ${result.firstName} ${result.lastName}`}</div>
        <div>{`Car: ${result.carModel} ${result.carBrand}`}</div>
      </div>
    </div>
  );
}
 