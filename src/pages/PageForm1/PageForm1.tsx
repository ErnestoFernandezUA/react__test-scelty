import { FunctionComponent } from "react";
import { Link } from 'react-router-dom'
import './PageForm1.scss'
 
export const PageForm1: FunctionComponent = () => {
  return (
    <div className="HomePage">
      <h1>PageForm1</h1>

      <Link to={'/'}>Back</Link>
      <br />
      <Link to={'/form2'}>Form2</Link>
    </div>
  );
}
 