import { Link } from 'react-router-dom';
import { preloadRoute } from '@/lib/routePreloader';
import {
  FileImage,
  FileOutput,
  FileType,
  Minimize2,
  Maximize2,
  UserSquare2 as UserSquare,
  PenLine,
  FileText,
  Crop,
  ScanLine,
  type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  FileImage, FileOutput, FileType, Minimize2, Maximize2,
  UserSquare, PenLine, FileText, Crop, ScanLine,
};

const colorMap: Record<string, string> = {
  FileImage: 'from-primary to-tool-violet',
  FileOutput: 'from-tool-orange to-tool-amber',
  FileType: 'from-tool-cyan to-primary',
  Minimize2: 'from-tool-green to-tool-cyan',
  Maximize2: 'from-tool-violet to-tool-rose',
  UserSquare: 'from-tool-rose to-tool-orange',
  PenLine: 'from-tool-amber to-tool-orange',
  FileText: 'from-tool-rose to-tool-violet',
  Crop: 'from-tool-cyan to-tool-green',
  ScanLine: 'from-primary to-tool-cyan',
};

interface ToolCardProps {
  name: string;
  description: string;
  path: string;
  icon: string;
}

export default function ToolCard({ name, description, path, icon }: ToolCardProps) {
  const Icon = iconMap[icon] || FileImage;
  const gradient = colorMap[icon] || 'from-primary to-tool-violet';

  return (
    <Link to={path} className="group block" onMouseEnter={() => preloadRoute(path)} onTouchStart={() => preloadRoute(path)}>
      <div className="h-full rounded-2xl border border-border/60 bg-card p-6 shadow-card transition-all duration-300 group-hover:shadow-card-hover group-hover:-translate-y-1 group-hover:border-primary/20">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 shadow-sm`}>
          <Icon className="h-5 w-5 text-primary-foreground" />
        </div>
        <h3 className="font-semibold mb-1.5 group-hover:text-primary transition-colors">{name}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </Link>
  );
}
