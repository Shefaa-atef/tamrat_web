import { useState } from "react";
import { cn } from "@/lib/utils";

interface Card {
  title: string;
  description?: string;
  src?: string;
  icon?: React.ReactNode;
}

interface FocusCardProps {
  card: Card;
  index: number;
  hovered: number | null;
  setHovered: React.Dispatch<React.SetStateAction<number | null>>;
}

function FocusCard({ card, index, hovered, setHovered }: FocusCardProps) {
  const isHovered = hovered === index;
  const isDimmed  = hovered !== null && !isHovered;

  return (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "relative rounded-2xl overflow-hidden cursor-pointer",
        "bg-surface border border-primary/20 h-64 md:h-80",
        "transition-all duration-500 ease-out",
        isDimmed && "blur-[2px] scale-[0.97] brightness-50",
        isHovered && "border-secondary/50 scale-[1.02]"
      )}
    >
      {/* Background image (optional) */}
      {card.src && (
        <img
          src={card.src}
          alt={card.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Overlay gradient */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent",
          "transition-opacity duration-300",
          isHovered ? "opacity-100" : "opacity-70"
        )}
      />

      {/* Icon */}
      {card.icon && (
        <div className="absolute top-6 left-6 text-secondary">{card.icon}</div>
      )}

      {/* Text content */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="font-heading text-2xl text-cream font-medium">
          {card.title}
        </h3>
        {card.description && (
          <p
            className={cn(
              "text-muted text-sm mt-2 leading-relaxed",
              "transition-all duration-300",
              isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            )}
          >
            {card.description}
          </p>
        )}
      </div>
    </div>
  );
}

interface FocusCardsProps {
  cards: Card[];
  className?: string;
}

/**
 * Hover one card → others blur and dim.
 * Used in: How It Works section.
 */
export function FocusCards({ cards, className }: FocusCardsProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mx-auto",
        className
      )}
    >
      {cards.map((card, idx) => (
        <FocusCard
          key={card.title}
          card={card}
          index={idx}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </div>
  );
}
