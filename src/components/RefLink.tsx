import Link from "@docusaurus/Link";
import { HTMLAttributeAnchorTarget } from "react";

export default function RefLink({
  href,
  children,
  className,
  target = "_blank",
}: {
  href: string;
  children?: React.ReactNode;
  className?: string;
  target?: HTMLAttributeAnchorTarget;
}) {
  return (
    <Link
      href={href + "?ref=junwai7159.github.io"}
      rel="noopener"
      target={target}
      className={className}
    >
      {children}
    </Link>
  );
}
