import BodyCardText from "./BodyCardText";

const ProsConsText = ({ croppedText, prosTitle, consTitle }) => {
  return (
    <div
      style={{
        whiteSpace: "pre-line",
        wordBreak: "break-word",
      }}
    >
      <BodyCardText title={prosTitle} text={croppedText.pros} />

      {croppedText.cons.length !== 0 && (
        <BodyCardText title={consTitle} text={croppedText.cons} />
      )}
    </div>
  );
};

export default ProsConsText;
