type Status = "agendada" | "realizada" | "cancelada";

const config: Record<Status, { label: string; classes: string }> = {
  agendada: { label: "Agendada", classes: "bg-blue-100 text-blue-700" },
  realizada: { label: "Realizada", classes: "bg-emerald-100 text-emerald-700" },
  cancelada: { label: "Cancelada", classes: "bg-red-100 text-red-600" },
};

export default function StatusBadge({ status }: { status: Status }) {
  const { label, classes } = config[status];
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${classes}`}>
      {label}
    </span>
  );
}
