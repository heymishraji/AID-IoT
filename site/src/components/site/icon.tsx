import * as L from "lucide-react";
export function Icon({ name, size = 24, className }: { name: string; size?: number; className?: string }) {
  const C = (L as unknown as Record<string, React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>>)[name] ?? L.Circle;
  return <C size={size} className={className} strokeWidth={1.75} />;
}
