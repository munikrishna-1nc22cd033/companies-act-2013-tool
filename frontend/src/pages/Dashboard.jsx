import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const pieData = [
  { name: "Compliant", value: 60 },
  { name: "Non-Compliant", value: 27 },
  { name: "Due Soon", value: 13 },
];

const lineData = [
  { day: "Apr 01", compliant: 10, non: 5, due: 2 },
  { day: "Apr 05", compliant: 14, non: 8, due: 3 },
  { day: "Apr 10", compliant: 18, non: 10, due: 6 },
  { day: "Apr 15", compliant: 22, non: 12, due: 8 },
  { day: "Apr 20", compliant: 26, non: 15, due: 10 },
];

const COLORS = ["#22c55e", "#f97316", "#ef4444"];

export default function Dashboard() {
  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center bg-blue-900 text-white p-4 rounded-xl">
        <h1 className="text-xl font-bold">
          Companies Act 2013 Compliance Tool
        </h1>
        <div className="flex gap-6">
          <span>Dashboard</span>
          <span>Records</span>
          <span>Reports</span>
          <span>Admin</span>
        </div>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-4 gap-4 mt-6">
        <Card title="Total Records" value="30" color="bg-blue-600" />
        <Card title="Compliant" value="18" color="bg-green-600" />
        <Card title="Non-Compliant" value="8" color="bg-orange-500" />
        <Card title="Due Soon" value="4" color="bg-red-600" />
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-2 gap-6 mt-6">
        {/* PIE */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-bold mb-2">Compliance Status Overview</h2>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                outerRadius={90}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* LINE */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-bold mb-2">Tasks Trend</h2>

          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lineData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="compliant" stroke="#22c55e" />
              <Line type="monotone" dataKey="non" stroke="#f97316" />
              <Line type="monotone" dataKey="due" stroke="#ef4444" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* TABLES */}
      <div className="grid grid-cols-2 gap-6 mt-6">
        {/* ACTIVITY LOG */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-bold mb-2">Activity Log</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th>Date</th>
                <th>Action</th>
                <th>User</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>09 May</td><td>Updated</td><td>user2</td></tr>
              <tr><td>08 May</td><td>Report</td><td>admin</td></tr>
              <tr><td>07 May</td><td>Delete</td><td>user1</td></tr>
            </tbody>
          </table>
        </div>

        {/* DEADLINES */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-bold mb-2">Upcoming Deadlines</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th>Name</th>
                <th>Due Date</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>ABC Corp</td><td>12 May</td></tr>
              <tr><td>XYZ Pvt Ltd</td><td>14 May</td></tr>
              <tr><td>LMN Ltd</td><td>16 May</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* CARD COMPONENT */
function Card({ title, value, color }) {
  return (
    <div className={`${color} text-white p-4 rounded-xl shadow`}>
      <h3 className="text-sm">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
