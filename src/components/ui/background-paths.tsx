import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const VIEW_W = 1200;
const VIEW_H = 600;

/**
 * Elegant sweeping "flight path" arcs, sized to always stay inside the hero.
 * Deterministic values keep SSR and client markup identical.
 */
function buildArcs(count: number, direction: 1 | -1) {
  return Array.from({ length: count }, (_, i) => {
    const spread = i * (VIEW_H / (count + 4));
    const y1 = direction === 1 ? VIEW_H * 0.92 - spread : VIEW_H * 0.08 + spread;
    const y2 = direction === 1 ? VIEW_H * 0.04 + spread * 0.35 : VIEW_H * 0.96 - spread * 0.35;
    const lift = direction === 1 ? -140 - i * 22 : 140 + i * 22;
    return {
      id: `${direction}-${i}`,
      d: `M${-160 - i * 18} ${y1} C ${VIEW_W * 0.3} ${y1 + lift}, ${VIEW_W * 0.68} ${y2 - lift}, ${
        VIEW_W + 160 + i * 18
      } ${y2}`,
      width: 1.1 + i * 0.18,
      opacity: 0.75 - i * 0.03,
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
        "absolute inset-0 overflow-hidden [mask-image:linear-gradient(to_right,black,black_70%,transparent)] motion-reduce:hidden",
        className,
      )}
      aria-hidden="true"
    >
      <FloatingPaths direction={1} count={12} />
      <FloatingPaths direction={-1} count={9} className="opacity-55" />
    </div>
  );
}
