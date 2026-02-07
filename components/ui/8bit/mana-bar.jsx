import { Progress } from "@/components/ui/8bit/progress";

export default function ManaBar({
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
      progressBg="bg-blue-500" />
  );
}
