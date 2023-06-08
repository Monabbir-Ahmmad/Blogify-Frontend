import { Link } from "react-router-dom";
import notFoundSvg from "../assets/pageNotFound.svg";

function NotFoundPage() {
  return (
    <main className="p-10 flex flex-col items-center h-full">
      <object
        type="image/svg+xml"
        data={notFoundSvg}
        className="max-h-[500px] "
      />
      <h2 className="text-3xl my-5">We couldn't find that page</h2>
      <p className="mb-8 opacity-70">
        Looks like we couldn't find that page. Please, make sure you have typed
        the correct URL
      </p>
      <Link to={".."} className="btn-primary px-20 rounded-full">
        Take me back!
      </Link>
    </main>
  );
}

export default NotFoundPage;
