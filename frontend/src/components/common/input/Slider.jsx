function Slider({ label, value, onChange, min, max, step, stepLabel = [] }) {
  return (
    <div className="space-y-2">
      <span className="block text-sm font-medium">{label}</span>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={onChange}
        className="block w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer"
      />
      {stepLabel.length && (
        <div className="flex justify-between text-sm">
          {stepLabel.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
      )}
    </div>
  );
}

export default Slider;
