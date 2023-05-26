import { Link } from "react-router-dom";
import notFoundSvg from "../assets/pageNotFound.svg";

const NotFoundPage = () => {
  return (
    <div className="p-10 flex flex-col items-center min-h-screen bg-gray-50">
      <object
        type="image/svg+xml"
        data={notFoundSvg}
        className="max-h-[500px] "
      />
      <h2 className="text-3xl text-gray-600 my-5">
        We couldn't find that page
      </h2>
      <p className="text-gray-400 mb-8">
        Looks like we couldn't find that page. Please, make sure you have typed
        the current URL
      </p>
      <Link
        to="/"
        className="btn-primary px-20 rounded-full drop-shadow-md hover:drop-shadow-xl focus:ring-0 active:drop-shadow-none"
      >
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
