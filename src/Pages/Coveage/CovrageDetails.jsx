const CovrageDetails = ({ dist }) => {
  const { district, city, covered_area} = dist;
  return (
    <div className="mb-2">
      <h2 className="font-bold underline">
        District: <span className="text-green-500">{district}</span>
      </h2>
      <div className="ml-4">
        <p>
          City: <span className="text-amber-700">{city}</span>
        </p>
        <p className="ml-6">Covered Areas:</p>
        <ul className="ml-10 text-sm">
          {covered_area.map((area, index) => (
            <li key={index}>{area}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CovrageDetails;
