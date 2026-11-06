import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface MainButtonProps {
  to: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
  target?: string;
  rel?: string;
  onClick?: (e: React.MouseEvent) => void;
}

/** Glowing pill button used across every page, supporting both internal routes and external links (e.g. WhatsApp). */
export default function MainButton({
  to,
  children,
  className = '',
  external,
  target,
  rel,
  onClick,
}: MainButtonProps) {
  const isExternal =
    external ||
    to.startsWith('http://') ||
    to.startsWith('https://') ||
    to.startsWith('tel:') ||
    to.startsWith('mailto:');

  const content = (
    <>
      <div className="button-border"></div>
      <div className="border-wrap">
        <div className="glow-border"></div>
      </div>
      <div className="button-background-01"></div>
      <div className="button-background-02"></div>
      <div className="button-text-wrap">
        <p className="button-text">{children}</p>
        <p className="button-text" aria-hidden="true">
          {children}
        </p>
      </div>
    </>
  );

  if (isExternal) {
    return (
      <a
        href={to}
        target={target ?? '_blank'}
        rel={rel ?? 'noopener noreferrer'}
        onClick={onClick}
        className={`main-button w-inline-block ${className}`.trim()}
      >
        {content}
      </a>
    );
  }

  return (
    <Link to={to} onClick={onClick} className={`main-button w-inline-block ${className}`.trim()}>
      {content}
    </Link>
  );
}
