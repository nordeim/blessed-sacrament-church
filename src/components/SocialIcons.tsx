import type { SVGProps } from "react";

function iconProps(props: SVGProps<SVGSVGElement>) {
  return {
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": true as const,
    className: "h-4 w-4",
    ...props,
  };
}

function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...iconProps(props)}>
      <path d="M14 8h3V4h-3c-2.8 0-5 2.2-5 5v3H6v4h3v8h4v-8h3.2l.8-4H13V9c0-.6.4-1 1-1Z" />
    </svg>
  );
}

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...iconProps(props)}>
      <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm10 2H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm-5 3.2A3.8 3.8 0 1 1 8.2 12 3.8 3.8 0 0 1 12 8.2Zm0 1.6A2.2 2.2 0 1 0 14.2 12 2.2 2.2 0 0 0 12 9.8ZM17.2 6.6a.9.9 0 1 1-.9.9.9.9 0 0 1 .9-.9Z" />
    </svg>
  );
}

const icons = [
  { name: "Facebook", Icon: FacebookIcon, href: "https://www.facebook.com/blessedsacramentsg" },
  { name: "Instagram", Icon: InstagramIcon, href: "https://www.instagram.com/blessedsacramentsg" },
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
          <Icon />
        </a>
      ))}
    </div>
  );
}
