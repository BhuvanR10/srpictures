import { useId, useLayoutEffect, useRef, useState } from 'react';
import { faqItems } from '../data/content';
import { EASE, gsap } from '../lib/gsap';

function Item({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const vertical = useRef<HTMLDivElement>(null);
  const first = useRef(true);
  const id = useId();

  useLayoutEffect(() => {
    if (first.current) {
      first.current = false;
      gsap.set(panel.current, { height: 0 });
      return;
    }
    if (open) {
      gsap.to(panel.current, { height: 'auto', duration: 0.8, ease: EASE.inOutQuart, overwrite: true });
      gsap.to(vertical.current, { scale: 0, duration: 0.8, ease: EASE.inOutQuad, overwrite: 'auto' });
    } else {
      gsap.to(panel.current, { height: 0, duration: 0.6, ease: EASE.inOutQuart, overwrite: true });
      gsap.to(vertical.current, { scale: 1, duration: 0.6, ease: EASE.inOutQuad, overwrite: 'auto' });
    }
  }, [open]);

  const toggle = () => setOpen((v) => !v);

  return (
    <div
      className="accordion-content-item"
      data-open={open || undefined}
      itemScope
      itemProp="mainEntity"
      itemType="https://schema.org/Question"
    >
      <div
        className="accordion-top-wrap"
        role="button"
        tabIndex={0}
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        id={`${id}-trigger`}
        onClick={toggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggle();
          }
        }}
      >
        <div className="accordion-title-item">
          <h2 className="accordion-heading" itemProp="name">{q}</h2>
        </div>
        <div className="plus-block" aria-hidden="true">
          <div className="plus-line"></div>
          <div className="plus-line vertical" ref={vertical}></div>
        </div>
      </div>
      <div
        className="accordion-content-wrap"
        ref={panel}
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-trigger`}
        aria-hidden={!open}
        style={{ height: 0 }}
        onClick={toggle}
      >
        <div
          className="accordion-content-block"
          itemScope
          itemProp="acceptedAnswer"
          itemType="https://schema.org/Answer"
        >
          <p className="accordion-answer-text" itemProp="text">{a}</p>
        </div>
      </div>
      <span hidden>{index}</span>
    </div>
  );
}

/** Accordion FAQ (open/close timings from the reference: 800ms / 600ms inOutQuart). */
export default function Faq() {
  return (
    <section className="faq" itemScope itemType="https://schema.org/FAQPage">
      <div className="faq-container">
        {faqItems.map((item, i) => (
          <Item key={item.q} q={item.q} a={item.a} index={i} />
        ))}
      </div>
    </section>
  );
}
