type InfoItemProps = {
  label: string;
  value: string;
};

function InfoItem({ label, value }: InfoItemProps) {
  return (
    <div className="result">
      <h2 className="result-label">{label}</h2>
      <p className="result-value">{value}</p>
    </div>
  );
}

export default InfoItem;
