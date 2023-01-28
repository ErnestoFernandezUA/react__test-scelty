import { FunctionComponent } from "react";
import { Link } from 'react-router-dom'
import './HomePage.scss'
 
export const HomePage: FunctionComponent = () => {

  return (
    <div className="HomePage">
      <h1>HomePage</h1>

      <Link to={'/form1'}>Form1</Link>

      
    </div>
  );
}
 