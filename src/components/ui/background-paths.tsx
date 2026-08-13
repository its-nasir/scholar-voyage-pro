import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const VIEW_W = 1200;
const VIEW_H = 600;

/**
 * Elegant sweeping "flight path" arcs, sized to always stay inside the hero.
 * Deterministic values keep SSR and client markup identical.
 */
function buildArcs(count: number, direction: 1 | -1) {
  const clamp = (v: number) => Math.min(VIEW_H * 0.98, Math.max(VIEW_H * 0.02, v));
  return Array.from({ length: count }, (_, i) => {
    const y1 = clamp(VIEW_H * (0.05 + (i * 0.9) / count));
    const y2 = clamp(y1 - VIEW_H * 0.24 * direction);
    const bow = 150 * direction + i * 8;
    return {
      id: `${direction}-${i}`,
      d: `M${-140 - i * 12} ${y1} C ${VIEW_W * 0.32} ${clamp(y1 - bow)}, ${VIEW_W * 0.7} ${clamp(
        y2 + bow,
      )}, ${VIEW_W + 140 + i * 12} ${y2}`,
      width: 1.4 + i * 0.35,
      opacity: 0.4 - i * 0.02,
      duration: 16 + ((i * 5) % 11),
      delay: (i % 5) * 0.9,
    };
  });
}


export function FloatingPaths({
  direction = 1,
  count = 12,
  className,
}: {
  direction?: 1 | -1;
  count?: number;
  className?: string;
}) {
  const arcs = buildArcs(count, direction);

  return (
    <div className={cn("pointer-events-none absolute inset-0", className)} aria-hidden="true">
      <svg
        className="size-full text-current"
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        fill="none"
        preserveAspectRatio="none"
      >
        {arcs.map((arc) => (
          <motion.path
            key={arc.id}
            d={arc.d}
            stroke="currentColor"
            strokeWidth={arc.width}
            strokeLinecap="round"
            strokeOpacity={arc.opacity}
            initial={{ pathLength: 0.45, pathOffset: 0, opacity: 0.7 }}
            animate={{
              pathLength: [0.35, 0.75, 0.35],
              pathOffset: [0, 1],
              opacity: [0.35, 1, 0.35],
            }}
            transition={{
              duration: arc.duration,
              delay: arc.delay,
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
        "absolute inset-0 overflow-hidden [mask-image:linear-gradient(to_right,transparent_5%,black_55%,black)] motion-reduce:hidden",
        className,
      )}
      aria-hidden="true"
    >
      <FloatingPaths direction={1} count={8} />
      <FloatingPaths direction={-1} count={6} className="opacity-60" />
    </div>
  );
}
