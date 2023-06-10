import errorSvg from "../assets/error.svg";

function ErrorPage() {
  return (
    <main className="p-10 flex flex-col items-center h-full">
      <object type="image/svg+xml" data={errorSvg} className="max-h-[500px] " />
      <h2 className="text-3xl my-5">Oops!</h2>
      <h3 className="mb-8 opacity-70 text-2xl">
        Looks like something went wrong. Please try again later.
      </h3>
    </main>
  );
}

export default ErrorPage;
