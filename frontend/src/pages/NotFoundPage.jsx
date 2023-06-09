import notFoundSvg from "../assets/pageNotFound.svg";
import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();
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
      <button
        className="btn-primary px-20 rounded-full"
        onClick={() => navigate(-1)}
      >
        Take me back!
      </button>
    </main>
  );
}

export default NotFoundPage;
