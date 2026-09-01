import { Facebook, Instagram, Youtube } from "lucide-react";

const icons = [
  { name: "Facebook", Icon: Facebook, href: "https://www.facebook.com/blessedsacramentsg" },
  { name: "Instagram", Icon: Instagram, href: "https://www.instagram.com/blessedsacramentsg" },
  { name: "YouTube", Icon: Youtube, href: "https://www.youtube.com/@blessedsacramentsg" },
];

export function SocialIcons({ className }: { className?: string }) {
  return (
    <div className={className}>
      {icons.map(({ name, Icon, href }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={name}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-bsc-sapphire-800 text-bsc-cream/80 transition-colors hover:bg-bsc-sapphire-700 hover:text-bsc-cream"
        >
          <Icon className="h-4 w-4" />
        </a>
      ))}
    </div>
  );
}
