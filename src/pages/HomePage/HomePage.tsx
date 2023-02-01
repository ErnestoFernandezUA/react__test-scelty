import { FunctionComponent } from "react";
import { Link } from 'react-router-dom'
import './HomePage.scss'
 
export const HomePage: FunctionComponent = () => {
  return (
    <div className="HomePage">
      <h1>Welcome!</h1>

      <div className="HomePage__content">
        <p>It's simple form with react-toolkit-thunk.</p>
        <p>It simulate receiving validation fails from server.</p>
        <p>If input data correct, user relocate to result page.</p>
      </div>
      
      <Link to={'/form1'}><button>Goto Form#1</button></Link>
      
    </div>
  );
}
 