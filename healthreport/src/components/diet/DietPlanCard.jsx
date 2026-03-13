const DietPlanCard = ({ title, items = [], type = "default" }) => {
  const colorClasses =
    type === "good"
      ? "bg-green-50 border-green-200 text-green-700"
      : type === "avoid"
      ? "bg-red-50 border-red-200 text-red-700"
      : "bg-gray-50 border-gray-200 text-gray-700";

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">{title}</h3>

      {items.length > 0 ? (
        <div className="flex flex-wrap gap-3">
          {items.map((item, index) => (
            <span
              key={index}
              className={`rounded-full border px-4 py-2 text-sm font-medium ${colorClasses}`}
            >
              {item}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500">No items available.</p>
      )}
    </div>
  );
};

export default DietPlanCard;