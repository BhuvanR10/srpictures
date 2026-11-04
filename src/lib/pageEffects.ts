import { gsap, ScrollTrigger, EASE } from './gsap';
import { loopInView, reducedMotion } from './motion';

/**
 * Per-route animation setup, ported from the reference site's Webflow IX2
 * interactions. Called after every route render; the returned function reverts
 * everything (tweens, ScrollTriggers, inline styles).
 */

const qa = <T extends HTMLElement = HTMLElement>(sel: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll<T>(sel));

/** Animates a number from 0 → 1 and writes a composed transform (IX2 uses rotateX/Y/Z order). */
function proxyLoop(duration: number, apply: (progress: number) => void, yoyo = false) {
  const state = { p: 0 };
  return gsap.to(state, {
    p: 1,
    duration,
    ease: 'none',
    repeat: -1,
    yoyo,
    onUpdate: () => apply(state.p),
  });
}

export function setupPage(): () => void {
  const cleanups: Array<() => void> = [];
  const mm = gsap.matchMedia();
  const reduce = reducedMotion();

  const ctx = gsap.context(() => {
    /* ---------- Subtitle highlight sweep (every .subtitle-block) ---------- */
    qa('.subtitle-block').forEach((block) => {
      const blur = block.querySelector<HTMLElement>('.subtitle-blur');
      if (!blur) return;
      gsap.set(blur, { xPercent: -400 });
      const tl = gsap
        .timeline({ repeat: -1 })
        .to(blur, { xPercent: -400, duration: 0.5, ease: 'none' })
        .to(blur, { xPercent: 400, duration: 1.5, ease: 'none' })
        .set(blur, { xPercent: -400 }, '+=4');
      cleanups.push(loopInView(block, tl));
    });

    /* ---------- Hero 3D cube (home) ---------- */
    qa('._3d-wrapper').forEach((wrap) => {
      const block = wrap.querySelector<HTMLElement>('._3d-block');
      if (!block) return;
      block.style.transformStyle = 'preserve-3d';
      const apply = (p: number) => {
        block.style.transform = `translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(${p * 360}deg) rotateZ(90deg)`;
      };
      apply(0);
      cleanups.push(loopInView(wrap, proxyLoop(40, apply)));
    });

    /* ---------- Hero entrance choreography ---------- */
    if (!reduce) {
      const heroWrap = document.querySelector<HTMLElement>('.section-home-header');
      if (heroWrap) {
        const container3d = heroWrap.querySelector<HTMLElement>('._3d-container');
        const scrollDown = heroWrap.querySelector<HTMLElement>('.scroll-down-wrap');
        const locationWrap = heroWrap.querySelector<HTMLElement>('.location-wrap');
        const title = heroWrap.querySelector<HTMLElement>('.cube-title-block');

        const triggerHero = () => {
          const heroTl = gsap.timeline();
          if (container3d) {
            heroTl.fromTo(
              container3d,
              { scale: 0.84, opacity: 0 },
              { scale: 1, opacity: 1, duration: 1.3, ease: 'power3.out' },
              0
            );
          }
          if (title) {
            heroTl.fromTo(
              title,
              { opacity: 0, scale: 0.88 },
              { opacity: 1, scale: 1, duration: 1.1, ease: 'power3.out' },
              0.15
            );
          }
          if (scrollDown || locationWrap) {
            heroTl.fromTo(
              [scrollDown, locationWrap].filter(Boolean),
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out' },
              0.35
            );
          }
        };

        const introRunning = (window as any).__sr_intro_running;
        if (!introRunning) {
          triggerHero();
        } else {
          window.addEventListener('sr-intro-complete', triggerHero, { once: true });
        }
      }
    }

    /* ---------- Rotating star icon in intro ---------- */
    qa('.star-icon').forEach((star) => {
      const starTween = gsap.to(star, {
        rotation: 360,
        duration: 20,
        ease: 'none',
        repeat: -1,
      });
      cleanups.push(loopInView(star, starTween));
    });

    /* ---------- About 3D video ring ---------- */
    qa('._3d-video-wrapper').forEach((wrap) => {
      const container = wrap.querySelector<HTMLElement>('._3d-video-container');
      if (!container) return;
      container.style.transformStyle = 'preserve-3d';
      const apply = (p: number) => {
        container.style.transform = `rotateY(${p * 360}deg)`;
      };
      apply(0);
      cleanups.push(loopInView(wrap, proxyLoop(32, apply)));
    });

    /* ---------- Heading reveals (Webflow IX3 replica) ---------- */
    qa('.heading-wrap').forEach((wrap) => {
      const top = qa('.top-title', wrap);
      const bottom = qa('.bottom-title', wrap);
      if (!top.length && !bottom.length) return;
      if (reduce) return;
      gsap.set([...top, ...bottom], { yPercent: 110 });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrap,
          start: 'top 85%',
          once: true,
        },
      });
      if (top.length) tl.to(top, { yPercent: 0, duration: 0.8, ease: 'power3.out' }, 0);
      if (bottom.length) tl.to(bottom, { yPercent: 0, duration: 0.8, ease: 'power3.out' }, 0.15);
    });

    /* ---------- Large text reveals (Webflow IX3 replica) ---------- */
    qa('.text-size-large').forEach((el) => {
      if (reduce) return;
      gsap.fromTo(
        el,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
        },
      );
    });

    /* ---------- Partner logo card flips ---------- */
    qa('.partner-grid').forEach((grid) => {
      const cards = qa('.card-wrapper', grid);
      gsap.set(cards, { rotationX: 0 });
      const tl = gsap.timeline({ repeat: -1 });
      tl.set(cards, { rotationX: 0 });
      cards.forEach((card, i) => {
        tl.to(card, { rotationX: 180, duration: 1, ease: EASE.swingTo }, 0.5 + 1 + i * 0.25);
        tl.to(card, { rotationX: 360, duration: 1, ease: EASE.swingTo }, 0.5 + 3.75 + 1 + i * 0.25);
      });
      tl.set(cards, { rotationX: 0 }, 0.5 + 3.75 + 3.75);
      cleanups.push(loopInView(grid, tl));
    });

    /* ---------- Rolling counters (about) ---------- */
    qa('.roll-number-wrapper').forEach((wrapper) => {
      const block = wrapper.closest('.number-block');
      const second = block?.classList.contains('_02');
      // _01 is single digit '+8' -> roll to 8 (-800%), _02 is '98%' -> roll to 9, 8 (-900%, -800%)
      const targets = second ? [-900, -800] : [-800];
      const cols = qa('.roll-number', wrapper);
      gsap.set(cols, { yPercent: 0 });
      const run = () =>
        cols.forEach((col, i) => gsap.to(col, { yPercent: targets[i] ?? -800, duration: 2, ease: EASE.outQuint }));
      if (reduce) {
        cols.forEach((col, i) => gsap.set(col, { yPercent: targets[i] ?? -800 }));
        return;
      }
      ScrollTrigger.create({ trigger: wrapper, start: 'top 90%', once: true, onEnter: run });
    });

    /* ---------- CTA rotating video ring + marquee button ---------- */
    qa('.cta-wrapper').forEach((wrap) => {
      const ring = wrap.querySelector<HTMLElement>('.cta-component');
      if (!ring) return;
      const apply = (p: number) => {
        ring.style.transform = `translate(-50%, 0) rotate(${p * 360}deg)`;
      };
      apply(0);
      cleanups.push(loopInView(wrap, proxyLoop(80, apply)));
    });
    qa('.cta-button').forEach((btn) => {
      const items = qa('.cta-text-item', btn);
      if (!items.length) return;
      gsap.set(items, { xPercent: 0 });
      const tl = gsap.timeline({ repeat: -1 });
      tl.to(items, { xPercent: -100, duration: 30, ease: 'none' }).to(items, { xPercent: 0, duration: 30, ease: 'none' });
      cleanups.push(loopInView(btn, tl));
    });

    /* ---------- Desktop-only initial states & scroll-linked motion ---------- */
    mm.add('(min-width: 992px)', () => {
      // Home services list: hover reveals (initial states from IX2 head styles)
      gsap.set(qa('.service-title'), { yPercent: -200 });
      gsap.set(qa('.service-bg-image'), { opacity: 0 });
      gsap.set(qa('.service-image-item'), { scale: 0 });
      gsap.set(qa('.service-description, .service-subitle'), { color: 'rgb(128,128,128)' });

      if (reduce) return;

      // Case studies: second row slides in from depth while scrolling
      qa('.case-study-block._02').forEach((block) => {
        const z = -0.1 * window.innerWidth;
        const tl = gsap.timeline({
          scrollTrigger: { trigger: block, start: 'top bottom', end: 'bottom top', scrub: 0.9 },
        });
        tl.fromTo(block, { yPercent: -40, z }, { yPercent: 0, z: 0, ease: 'none', duration: 0.4 }).to({}, { duration: 0.6 });
      });

      // About process steps drift at different speeds
      qa('.process-component-grid').forEach((grid) => {
        const c1 = grid.querySelector('.process-content-wrap._01');
        const c2 = grid.querySelector('.process-content-wrap._02');
        if (!c1 || !c2) return;
        const tl = gsap.timeline({
          scrollTrigger: { trigger: grid, start: 'top 50%', end: 'bottom top', scrub: 0.96 },
        });
        tl.fromTo(c1, { yPercent: 50 }, { yPercent: -50, ease: 'none', duration: 0.75 }, 0)
          .fromTo(c2, { yPercent: 25 }, { yPercent: -25, ease: 'none', duration: 0.75 }, 0)
          .to({}, { duration: 0.25 });
      });
    });

    mm.add('(max-width: 991px)', () => {
      gsap.set(qa('.accordion-content-item .accordion-title-item'), { clearProps: 'all' });

      // Service items initial states on mobile
      gsap.set(qa('.service-title'), { yPercent: -200 });
      gsap.set(qa('.service-bg-image'), { opacity: 0 });
      gsap.set(qa('.service-image-item'), { opacity: 0.85, scale: 1 });
      gsap.set(qa('.service-description, .service-subitle'), { color: 'rgb(128,128,128)' });

      const serviceItems = qa('.service-content-item');
      serviceItems.forEach((item, index) => {
        const n = index + 1;
        const root = item.closest('.section-home-service') ?? document;
        const bgImage = root.querySelector(`.service-bg-image._0${n}`);
        const titles = qa('.service-title', item);
        const text = qa('.service-description, .service-subitle', item);
        const thumb = qa('.service-image-item', item);

        const activate = () => {
          if (bgImage) gsap.to(bgImage, { opacity: 1, duration: 0.45, ease: 'power2.out', overwrite: 'auto' });
          gsap.to(titles, { yPercent: 0, duration: 0.65, ease: 'expo.out', overwrite: 'auto' });
          gsap.to(text, { color: 'rgb(250,250,250)', duration: 0.45, ease: 'power2.out', overwrite: 'auto' });
          gsap.to(thumb, { opacity: 1, scale: 1.02, borderColor: 'rgba(255,255,255,0.4)', duration: 0.5, overwrite: 'auto' });
        };

        const deactivate = () => {
          if (bgImage) gsap.to(bgImage, { opacity: 0, duration: 0.45, ease: 'power2.out', overwrite: 'auto' });
          gsap.to(titles, { yPercent: -200, duration: 0.65, ease: 'expo.out', overwrite: 'auto' });
          gsap.to(text, { color: 'rgb(128,128,128)', duration: 0.45, ease: 'power2.out', overwrite: 'auto' });
          gsap.to(thumb, { opacity: 0.85, scale: 1, borderColor: 'rgba(255,255,255,0.15)', duration: 0.5, overwrite: 'auto' });
        };

        ScrollTrigger.create({
          trigger: item,
          start: 'top 70%',
          end: 'bottom 30%',
          onEnter: activate,
          onEnterBack: activate,
          onLeave: deactivate,
          onLeaveBack: deactivate,
        });

        // Also allow tap / click on mobile to activate
        item.addEventListener('click', () => {
          serviceItems.forEach((other, oIdx) => {
            if (other === item) return;
            const oN = oIdx + 1;
            const oRoot = other.closest('.section-home-service') ?? document;
            const oBg = oRoot.querySelector(`.service-bg-image._0${oN}`);
            if (oBg) gsap.to(oBg, { opacity: 0, duration: 0.4, overwrite: 'auto' });
            gsap.to(qa('.service-title', other), { yPercent: -200, duration: 0.5, overwrite: 'auto' });
            gsap.to(qa('.service-description, .service-subitle', other), { color: 'rgb(128,128,128)', duration: 0.4, overwrite: 'auto' });
            gsap.to(qa('.service-image-item', other), { opacity: 0.85, scale: 1, duration: 0.4, overwrite: 'auto' });
          });
          activate();
        });
      });
    });

    /* ---------- Case study detail: scroll-scaled cover images (all breakpoints) ---------- */
    if (!reduce) {
      qa('.image-wrapper').forEach((wrap) => {
        const img = wrap.querySelector<HTMLElement>('.cover-image');
        if (!img) return;
        gsap.fromTo(
          img,
          { scale: 1.1, yPercent: -5 },
          {
            scale: 1.1,
            yPercent: 5,
            ease: 'none',
            scrollTrigger: { trigger: wrap, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        );
      });
    }

    /* ---------- Static initial states ---------- */
    gsap.set(qa('.case-arrow._02'), { xPercent: -100 });
    gsap.set(qa('.slide-arrow.left-02'), { xPercent: 100 });
    gsap.set(qa('.slide-arrow.right-02'), { xPercent: -100 });
    gsap.set(qa('.cta-button-background._02'), { opacity: 0 });
    gsap.set(qa('.bg-award'), { height: '0%' });
  });

  return () => {
    cleanups.forEach((fn) => fn());
    mm.revert();
    ctx.revert();
  };
}
