"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";

type LinkProps = ComponentProps<typeof Link>;

/**
 * A Next.js Link that wraps navigation in the View Transitions API
 * when available. Falls back to normal navigation otherwise.
 */
export default function ViewTransitionLink({ href, onClick, children, ...props }: LinkProps) {
  const router = useRouter();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Call any existing onClick handler
    onClick?.(e);

    // If default was prevented, bail
    if (e.defaultPrevented) return;

    // Check if View Transitions API is available
    if (!document.startViewTransition) return; // Let normal Link behavior handle it

    // Check for modifier keys (open in new tab, etc.)
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    e.preventDefault();

    document.startViewTransition(() => {
      router.push(href.toString());
    });
  };

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
