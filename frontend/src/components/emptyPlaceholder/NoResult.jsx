import emptyResult from "../../assets/emptyResult.svg";

function NoResult({ title = "Sorry!!!", subtitle = "No results found" }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center">
      <object
        data-testid="empty-result-image"
        type="image/svg+xml"
        data={emptyResult}
        className="max-w-3xl w-full"
      />

      <h1 className="text-2xl lg:text-3xl font-semibold uppercase">{title}</h1>
      <p className="text-lg lg:text-xl opacity-80 uppercase">{subtitle}</p>
    </div>
  );
}

export default NoResult;
