function Slider({
  name,
  label,
  value,
  onChange,
  min,
  max,
  step,
  stepLabel = [],
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={label} className="block text-sm font-semibold uppercase">
        {label}
      </label>
      <input
        id={label}
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
            <h6 key={label}>{label}</h6>
          ))}
        </div>
      )}
    </div>
  );
}

export default Slider;
