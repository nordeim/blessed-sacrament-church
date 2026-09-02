import { useId, useState, type KeyboardEvent } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/utils/cn";

interface AccordionItem {
  id?: string;
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export function Accordion({ items, className }: AccordionProps) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = items.length - 1;
    let next: number | null = null;
    if (event.key === "ArrowDown") next = index === last ? 0 : index + 1;
    if (event.key === "ArrowUp") next = index === 0 ? last : index - 1;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = last;
    if (next === null) return;
    event.preventDefault();
    document.getElementById(`${baseId}-trigger-${next}`)?.focus();
  };

  return (
    <div className={cn("divide-y divide-shrine-stone border-y border-shrine-stone", className)}>
      {items.map((item, index) => {
        const open = openIndex === index;
        const panelId = `${baseId}-panel-${index}`;
        const triggerId = `${baseId}-trigger-${index}`;
        return (
          <div key={item.id ?? item.question}>
            <h3>
              <button
                id={triggerId}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                className="flex w-full items-center justify-between gap-4 py-5 text-left font-display text-lg text-shrine-maroon-700"
                onClick={() => setOpenIndex(open ? null : index)}
                onKeyDown={(event) => onKeyDown(event, index)}
              >
                {item.question}
                <ChevronDown
                  className={cn(
                    "h-5 w-5 shrink-0 text-shrine-gold-600 transition-transform duration-300",
                    open && "rotate-180",
                  )}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              aria-hidden={open ? undefined : true}
              inert={!open ? true : undefined}
              className={cn("grid transition-[grid-template-rows] duration-300", open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}
            >
              <div className="overflow-hidden">
                <p className="pb-5 leading-relaxed text-shrine-charcoal/85">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
