import emptyResult from "../../assets/emptyResult.svg";

function NoResult() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <object
        data-testid="empty-result-image"
        type="image/svg+xml"
        data={emptyResult}
        className="max-w-3xl w-full"
      />

      <h1 className="text-4xl font-semibold uppercase">Sorry!!!</h1>
      <p className="text-2xl opacity-80 uppercase">No results found</p>
    </div>
  );
}

export default NoResult;
