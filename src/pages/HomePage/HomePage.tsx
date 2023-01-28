import { FunctionComponent } from "react";
import { Link } from 'react-router-dom'
import { useAppSelector } from "../../store/hooks";
import { selectPosts } from "../../features/Posts/postsSlice";
import { Post } from "../../type/Post";
import './HomePage.scss'
 
export const HomePage: FunctionComponent = () => {
  const posts = useAppSelector(selectPosts);

  return (
    <div className="HomePage">
      <h1>HomePage</h1>

      <Link to={'/form1'}>Form1</Link>

    </div>
  );
}
 