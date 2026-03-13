import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = ["#16A34A", "#DC2626"];

const HealthPieChart = ({ data }) => {
  return (
    <div className="h-72 w-full rounded-xl border border-gray-200 bg-white p-4">
      <h3 className="mb-4 text-sm font-semibold text-gray-900">
        Health Status Overview
      </h3>

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={50}
            outerRadius={80}
            paddingAngle={3}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip />

          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HealthPieChart;