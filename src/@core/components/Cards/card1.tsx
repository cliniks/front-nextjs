const Card1 = ({ icon, text }: { icon: string; text: string }) => {
  return (
    <div className="boxCard">
      <img src={icon} alt={icon} />
      <h1>{text}</h1>
    </div>
  );
};

export { Card1 };
