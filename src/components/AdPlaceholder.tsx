interface AdPlaceholderProps {
  position: 'top' | 'middle' | 'bottom' | 'sidebar';
}

export default function AdPlaceholder({ position }: AdPlaceholderProps) {
  return (
    <div className="my-8 border border-dashed border-border/60 rounded-xl p-4 text-center text-xs text-muted-foreground/60 bg-muted/20">
      Advertisement — {position}
    </div>
  );
}
