function LoadingOverlay({ icon, text = "Loading" }) {
  return (
    <div className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-black bg-opacity-50">
      <object type="image/svg+xml" data={icon} className="max-w-xs w-full" />
      <span className="text-2xl text-primaryLighter">{text}</span>
    </div>
  );
}

export default LoadingOverlay;
