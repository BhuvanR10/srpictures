import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ScrollTrigger } from '../lib/gsap';

interface LinkButtonProps {
  to: string;
  children: ReactNode;
  external?: boolean;
  label?: string;
  onClick?: (e: React.MouseEvent) => void;
}

/** Text link with the two-line slide-up hover. */
export default function LinkButton({ to, children, external, label, onClick }: LinkButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    ScrollTrigger.clearScrollMemory();
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    if (onClick) onClick(e);
  };

  const inner = (
    <div className="link-wrap">
      <div className="link-text">{children}</div>
      <div className="link-text" aria-hidden="true">
        {children}
      </div>
    </div>
  );

  if (external) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer" className="link-button w-inline-block" aria-label={label} onClick={onClick}>
        {inner}
      </a>
    );
  }
  if (to.startsWith('tel:') || to.startsWith('mailto:') || to.startsWith('#')) {
    return (
      <a href={to} className="link-button w-inline-block" aria-label={label} onClick={onClick}>
        {inner}
      </a>
    );
  }
  return (
    <Link to={to} className="link-button w-inline-block" aria-label={label} onClick={handleClick}>
      {inner}
    </Link>
  );
}
