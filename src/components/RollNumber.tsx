/** Digit column(s) for animated counters; pageEffects scrolls them to target values. */
export default function RollNumber({
  prefix,
  suffix,
  value: explicitValue,
  singleDigit,
}: {
  prefix?: string;
  suffix?: string;
  value?: string;
  singleDigit?: boolean;
}) {
  const digits = Array.from({ length: 10 }, (_, i) => i);
  const column = (cls: string) => (
    <div className={`roll-number ${cls}`} aria-hidden="true">
      {digits.map((d) => (
        <div className="section-number" key={d}>
          {d}
        </div>
      ))}
    </div>
  );
  const displayVal = explicitValue ?? `${prefix ?? ''}${prefix ? '8' : '98'}${suffix ?? ''}`;
  return (
    <div className="roll-number-wrapper" role="img" aria-label={displayVal}>
      {prefix && <div className="section-number alternate" aria-hidden="true">{prefix}</div>}
      {singleDigit ? (
        column('_01')
      ) : (
        <>
          {column('_01')}
          {column('_02')}
        </>
      )}
      {suffix && <div className="section-number alternate" aria-hidden="true">{suffix}</div>}
    </div>
  );
}
