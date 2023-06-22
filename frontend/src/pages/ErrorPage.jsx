import { Link } from "react-router-dom";
import errorImg from "../assets/error.svg";

function ErrorPage({
  image = errorImg,
  title = "Oops!",
  description = "Looks like something went wrong. Please try again later.",
  hideLink = false,
  linkTo = "/",
  linkText = "Take me home!",
}) {
  return (
    <main className="p-10 flex flex-col items-center h-full">
      <object
        role="img"
        type="image/svg+xml"
        data={image}
        className="max-h-[500px] "
      />
      <h2 className="text-3xl my-5">{title}</h2>
      <p className="mb-8 opacity-70">{description}</p>
      {!hideLink && (
        <Link
          className="btn-primary px-10 md:px-20 rounded-full uppercase"
          to={linkTo}
        >
          {linkText}
        </Link>
      )}
    </main>
  );
}

export default ErrorPage;
