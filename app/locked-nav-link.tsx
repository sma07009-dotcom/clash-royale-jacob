"use client";

import Link from "next/link";
import { useCompletedLessons } from "./progression";
import type { MouseEvent, ReactNode } from "react";

export function LockedNavLink({
  href,
  required,
  children,
  className,
  current,
}: {
  href: string;
  required?: number;
  children: ReactNode;
  className?: string;
  current?: boolean;
}) {
  const completed = useCompletedLessons();
  const locked = required !== undefined && completed.length < required;
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!locked) return;
    event.preventDefault();
    window.alert(`Complete ${required} lessons on the learning road to unlock this feature.`);
  };

  return (
    <Link
      className={className}
      href={href}
      aria-current={current ? "page" : undefined}
      aria-disabled={locked || undefined}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}
