import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const HealthBarChart = ({ data }) => {
  return (
    <div className="h-72 w-full rounded-xl border border-gray-200 bg-white p-4">
      <h3 className="mb-4 text-sm font-semibold text-gray-900">
        Health Parameter Comparison
      </h3>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Bar dataKey="userValue" fill="#111827" radius={[6, 6, 0, 0]} />

          <Bar dataKey="normalValue" fill="#9CA3AF" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HealthBarChart;