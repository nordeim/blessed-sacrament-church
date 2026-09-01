import { useState, useRef, useCallback } from "react";
import { cn } from "@/utils/cn";
import { ChevronDown } from "lucide-react";

interface AccordionItem {
  id: string;
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

export function Accordion({ items }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const buttonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      const ids = items.map((i) => i.id);
      if (e.key === "ArrowDown") {
        e.preventDefault();
        const next = (index + 1) % ids.length;
        buttonRefs.current.get(ids[next])?.focus();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const prev = (index - 1 + ids.length) % ids.length;
        buttonRefs.current.get(ids[prev])?.focus();
      } else if (e.key === "Home") {
        e.preventDefault();
        buttonRefs.current.get(ids[0])?.focus();
      } else if (e.key === "End") {
        e.preventDefault();
        buttonRefs.current.get(ids[ids.length - 1])?.focus();
      }
    },
    [items]
  );

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className="overflow-hidden rounded-xl border border-bsc-stone bg-bsc-cream"
          >
            <button
              ref={(el) => {
                if (el) buttonRefs.current.set(item.id, el);
              }}
              onClick={() => setOpenId(isOpen ? null : item.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              aria-expanded={isOpen}
              aria-controls={`panel-${item.id}`}
              className={cn(
                "flex w-full items-center justify-between px-5 py-4 text-left transition-colors",
                "hover:bg-bsc-parchment focus:outline-none focus:ring-2 focus:ring-inset focus:ring-bsc-sapphire-400",
                isOpen && "bg-bsc-parchment"
              )}
            >
              <span className="font-display text-lg font-medium text-bsc-sapphire-900">
                {item.question}
              </span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 shrink-0 text-bsc-sapphire-500 transition-transform",
                  isOpen && "rotate-180"
                )}
                aria-hidden="true"
              />
            </button>
            <div
              id={`panel-${item.id}`}
              className={cn(
                "grid transition-all duration-300 ease-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              )}
              aria-hidden={!isOpen}
            >
              <div className="overflow-hidden">
                <div className="px-5 pb-5 pt-1 text-bsc-charcoal leading-relaxed">
                  {item.answer}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
