export default function Brand({ markOnly = false }: { markOnly?: boolean }) {
  return (
    <>
      <img
        className="brand-symbol"
        src="/brand-mark.svg"
        alt=""
        width="45"
        height="40"
      />
      {!markOnly && <span className="brand-word">nivelo</span>}
    </>
  );
}
