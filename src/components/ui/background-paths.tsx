import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type FloatingPathsProps = {
  position: number;
  count?: number;
  className?: string;
};

export function FloatingPaths({ position, count = 22, className }: FloatingPathsProps) {
  const paths = Array.from({ length: count }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position} -${189 + i * 6} -${
      312 - i * 5 * position
    } ${216 - i * 6} ${152 - i * 5 * position} ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.6 + i * 0.045,
    // deterministic so server and client render the same values
    duration: 22 + ((i * 7) % 13),
    delay: (i % 6) * 0.6,
    opacity: 0.06 + i * 0.02,
  }));

  return (
    <div className={cn("pointer-events-none absolute inset-0", className)} aria-hidden="true">
      <svg
        className="size-full text-current"
        viewBox="0 0 696 316"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeLinecap="round"
            strokeOpacity={path.opacity}
            initial={{ pathLength: 0.35, opacity: 0.5 }}
            animate={{
              pathLength: 1,
              opacity: [0.25, 0.7, 0.25],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: path.duration,
              delay: path.delay,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export function BackgroundPaths({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden [mask-image:radial-gradient(120%_100%_at_50%_40%,black_35%,transparent_85%)] motion-reduce:hidden",
        className,
      )}
      aria-hidden="true"
    >
      <FloatingPaths position={1} count={22} className="opacity-90" />
      <FloatingPaths position={-1} count={16} className="opacity-60 blur-[0.5px]" />
    </div>
  );
}
