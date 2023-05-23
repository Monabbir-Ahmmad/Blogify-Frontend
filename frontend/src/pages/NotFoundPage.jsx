import { Link } from "react-router-dom";
import notFoundSvg from "../assets/pageNotFound.svg";

const NotFoundPage = () => {
  return (
    <div className="p-10 flex flex-col items-center justify-center h-screen bg-gray-50">
      <img src={notFoundSvg} className="h-80 " />
      <h2 className="text-3xl text-gray-600 mb-8">Page not found</h2>
      <Link to="/" className="btn-primary">
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
