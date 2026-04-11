import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";

/* ─── Context ─────────────────────────────────────────────────── */
const MouseEnterCtx = createContext<{
  isEntered: boolean;
}>({ isEntered: false });

/* ─── CardContainer ────────────────────────────────────────────── */
interface CardContainerProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

/**
 * Outer perspective wrapper. Wrap CardBody inside this.
 */
export function CardContainer({
  children,
  className,
  containerClassName,
}: CardContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isEntered, setIsEntered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = ((e.clientX - left - width / 2) / width) * 20;
    const y = -((e.clientY - top - height / 2) / height) * 20;
    ref.current.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
  };

  const handleMouseLeave = () => {
    setIsEntered(false);
    if (ref.current) ref.current.style.transform = "rotateX(0deg) rotateY(0deg)";
  };

  return (
    <MouseEnterCtx.Provider value={{ isEntered }}>
      <div
        className={cn("flex items-center justify-center", containerClassName)}
        style={{ perspective: "1000px" }}
      >
        <div
          ref={ref}
          onMouseEnter={() => setIsEntered(true)}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={cn(
            "relative transition-transform duration-200 ease-linear",
            className
          )}
          style={{ transformStyle: "preserve-3d" }}
        >
          {children}
        </div>
      </div>
    </MouseEnterCtx.Provider>
  );
}

/* ─── CardBody ─────────────────────────────────────────────────── */
export function CardBody({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "h-auto w-auto [transform-style:preserve-3d] [&>*]:[transform-style:preserve-3d]",
        className
      )}
    >
      {children}
    </div>
  );
}

/* ─── CardItem ─────────────────────────────────────────────────── */
interface CardItemProps {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  translateZ?: number;
  translateX?: number;
  translateY?: number;
  [key: string]: unknown;
}

/**
 * Each layer inside the 3D card. Use different translateZ values
 * for depth — higher = floats further towards the viewer.
 */
export function CardItem({
  as,
  children,
  className,
  translateZ = 0,
  translateX = 0,
  translateY = 0,
  ...rest
}: CardItemProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Tag = (as ?? "div") as any;
  const ref = useRef<HTMLElement>(null);
  const { isEntered } = useContext(MouseEnterCtx);

  useEffect(() => {
    if (!ref.current) return;
    if (isEntered) {
      ref.current.style.transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px)`;
    } else {
      ref.current.style.transform = "translateX(0px) translateY(0px) translateZ(0px)";
    }
  }, [isEntered, translateX, translateY, translateZ]);

  return (
    <Tag
      ref={ref}
      className={cn("w-fit transition-transform duration-200 ease-linear", className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}
