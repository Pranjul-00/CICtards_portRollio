import { Progress } from "@/components/ui/8bit/progress";

export default function HealthBar({
  className,
  variant,
  value,
  ...props
}) {
  return (
    <Progress
      {...props}
      value={value}
      variant={variant}
      className={className}
      progressBg="bg-red-500" />
  );
}
