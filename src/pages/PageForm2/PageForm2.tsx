import { FunctionComponent } from "react";
import { Link } from 'react-router-dom'
import './PageForm2.scss'
 
export const PageForm2: FunctionComponent = () => {
  return (
    <div className="PageForm2">
      <h1>Form 2</h1>

      <Link to={'/'}>Back</Link>
      <br />
      {/* <Link to={'form2'}>Form2</Link> */}
    </div>
  );
}
 