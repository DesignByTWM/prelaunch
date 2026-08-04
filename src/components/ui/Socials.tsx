import { socials } from "@/lib/site";

/**
 * Social marks.
 *
 * Extracted from the footer so the contact page can reuse the identical
 * treatment. Same 12px 0 12px 0 corner, same hover lift. `onLight` swaps
 * the stroke and fill for use on white rather than on the dark footer.
 *
 * Order below is the approved V2 order, which differs from the platform
 * list order in lib/site.ts.
 */

const icons: Record<string, React.ReactNode> = {
  Instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5.2" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1.15" fill="currentColor" stroke="none" />
    </svg>
  ),
  TikTok: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.6 5.8c-1-.7-1.6-1.8-1.7-3H12v12.4c0 1.4-1.1 2.5-2.5 2.5S7 16.6 7 15.2s1.1-2.5 2.5-2.5c.3 0 .5 0 .8.1V9.9c-.3 0-.5-.1-.8-.1-3 0-5.4 2.4-5.4 5.4s2.4 5.4 5.4 5.4 5.4-2.4 5.4-5.4V9.6c1.2.9 2.6 1.4 4.1 1.4V8.1c-.9 0-1.7-.3-2.4-.8-.2-.1-.4-.3-.6-.5v-1z" />
    </svg>
  ),
  YouTube: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="M10.2 9.3l4.6 2.7-4.6 2.7z" fill="currentColor" stroke="none" />
    </svg>
  ),
  Facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.5 22v-8h2.7l.4-3.1h-3.1V8.9c0-.9.3-1.5 1.6-1.5h1.6V4.6c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.4H7.9V14h2.6v8h3z" />
    </svg>
  ),
  Pinterest: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.5 2 2 6.5 2 12c0 4.1 2.5 7.6 6 9.2-.1-.8-.2-2 0-2.9l1.2-5s-.3-.6-.3-1.5c0-1.4.8-2.4 1.8-2.4.9 0 1.3.6 1.3 1.4 0 .9-.6 2.2-.9 3.4-.2 1 .5 1.8 1.5 1.8 1.8 0 3.2-1.9 3.2-4.7 0-2.4-1.7-4.1-4.2-4.1-2.9 0-4.6 2.2-4.6 4.4 0 .9.3 1.8.8 2.3.1.1.1.2.1.3l-.3 1.1c0 .2-.2.2-.4.1-1.2-.6-1.9-2.3-1.9-3.8 0-3.2 2.3-6.1 6.6-6.1 3.5 0 6.2 2.5 6.2 5.8 0 3.5-2.2 6.3-5.2 6.3-1 0-2-.5-2.3-1.2l-.6 2.4c-.2.9-.8 2-1.2 2.6.9.3 1.9.4 2.9.4 5.5 0 10-4.5 10-10S17.5 2 12 2z" />
    </svg>
  ),
  X: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.7 3h3.1l-6.8 7.8L22 21h-6.3l-4.9-6.4L5.2 21H2.1l7.3-8.3L2 3h6.4l4.4 5.9L17.7 3zm-1.1 16.1h1.7L7.4 4.8H5.6l11 14.3z" />
    </svg>
  ),
};

const order = ["Instagram", "TikTok", "YouTube", "Facebook", "Pinterest", "X"];

export function SocialRow({ onLight = false }: { onLight?: boolean }) {
  return (
    <div className={`soc ${onLight ? "on-light" : ""}`.trim()}>
      {order.map((label) => {
        const social = socials.find((s) => s.label === label);
        if (!social) return null;
        return (
          <a
            key={label}
            href={social.href}
            aria-label={`DESIGNBYTWM on ${label}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {icons[label]}
          </a>
        );
      })}
    </div>
  );
}
