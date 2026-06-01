interface MetricCardProps {
  title: string;
  value: string | number;
  change: number;
  changeLabel: string;
  icon: string;
  color: string;
}

export default function MetricCard({
  title,
  value,
  change,
  changeLabel,
  icon,
  color,
}: MetricCardProps) {
  const isPositive = change >= 0;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-gray-500">{title}</span>
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
          style={{ backgroundColor: `${color}20` }}
        >
          {icon}
        </div>
      </div>

      <div className="flex items-end justify-between">
        <span className="text-3xl font-bold text-gray-800">{value}</span>
        <div className={`flex items-center gap-1 text-sm font-medium ${isPositive ? "text-emerald-600" : "text-red-500"}`}>
          <span>{isPositive ? "↑" : "↓"}</span>
          <span>{Math.abs(change)}%</span>
        </div>
      </div>

      <p className="text-xs text-gray-400 mt-2">{changeLabel}</p>
    </div>
  );
}
