import { Compass, Cpu, Layers, Wrench, PhoneCall, ClipboardList, WifiOff, Eye, RadioTower, Zap, Factory, Box, Code2, Radio, Cloud, Smartphone, Fuel, Shield, Snowflake, ShoppingBag, GraduationCap, MessageSquare, Plug, Check, Droplets, Gauge, Satellite, BellRing, Server, HardDrive, LayoutDashboard, Database, MonitorSmartphone, ShieldCheck, Lightbulb, CircuitBoard, PenTool, FlaskConical, Truck, Flag, Menu, Circle, type LucideProps } from "lucide-react";
const MAP: Record<string, React.ComponentType<LucideProps>> = { Compass, Cpu, Layers, Wrench, PhoneCall, ClipboardList, WifiOff, Eye, RadioTower, Zap, Factory, Box, Code2, Radio, Cloud, Smartphone, Fuel, Shield, Snowflake, ShoppingBag, GraduationCap, MessageSquare, Plug, Check, Droplets, Gauge, Satellite, BellRing, Server, HardDrive, LayoutDashboard, Database, MonitorSmartphone, ShieldCheck, Lightbulb, CircuitBoard, PenTool, FlaskConical, Truck, Flag, Menu };
/** Only the icons the site uses are bundled (a wildcard import shipped 990 kB). */
export function Icon({ name, size = 24, className }: { name: string; size?: number; className?: string }) {
  const C = MAP[name] ?? Circle;
  return <C size={size} className={className} strokeWidth={1.75} aria-hidden />;
}
