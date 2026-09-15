import { ExternalLink, Facebook, Instagram, Linkedin } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

type SocialLinksProps = {
  className?: string;
  compact?: boolean;
};

const socialItems = [
  {
    id: "facebook",
    label: "Facebook",
    href: siteConfig.social.facebook,
    Icon: Facebook,
    hoverClass:
      "hover:border-[#1877F2] hover:bg-[#1877F2] hover:text-white hover:shadow-md",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: siteConfig.social.linkedin,
    Icon: Linkedin,
    hoverClass:
      "hover:border-[#0A66C2] hover:bg-[#0A66C2] hover:text-white hover:shadow-md",
  },
  {
    id: "instagram",
    label: "Instagram",
    href: siteConfig.social.instagram,
    Icon: Instagram,
    // Solid brand color (not gradient) so hover:bg reliably overrides bg-white
    hoverClass:
      "hover:border-[#E4405F] hover:bg-[#E4405F] hover:text-white hover:shadow-md",
  },
] as const;

export function SocialLinks({ className, compact = false }: SocialLinksProps) {
  return (
    <nav
      aria-label="HiMat Technology on social media"
      className={cn("flex flex-wrap items-center gap-2", className)}
    >
      {socialItems.map(({ id, label, href, Icon, hoverClass }) => (
        <a
          key={id}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${siteConfig.siteName} on ${label}`}
          title={label}
          className={cn(
            "inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-sm transition-all duration-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2",
            hoverClass,
            compact ? "h-9 w-9" : "h-10 gap-2 px-3 text-sm font-medium",
          )}
        >
          <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
          {!compact ? <span>{label}</span> : null}
        </a>
      ))}
    </nav>
  );
}

export function DemoLinkButton({ className }: { className?: string }) {
  return (
    <a
      href={siteConfig.demoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200",
        "hover:bg-teal-800 hover:shadow-md",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2",
        className,
      )}
    >
      <ExternalLink className="h-4 w-4" aria-hidden="true" />
      Live Demo
    </a>
  );
}
