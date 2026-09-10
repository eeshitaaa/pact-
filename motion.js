/* Motion is presentational: it never writes to Pact's records. */
(function () {
  'use strict';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const hover = matchMedia('(hover: hover) and (pointer: fine)');
  const seen = new WeakSet(), observed = new Set(), reveals = new Map();
  let scheduled = 0, pointerFrame = 0, activeCard = null, pointer = null;
  const enabled = () => !reduce.matches && !document.body.classList.contains('motion-off');
  const selector = '.hero-copy > *, .section-heading, .pact-card, .attention-card, .page-heading, .detail-heading, .activity-row, .achievement, .form-step, .profile-about, .ritual-chapters article, .room-footer > *';
  const observer = new IntersectionObserver(entries => {
    for (const {target, isIntersecting} of entries) {
      target.classList.toggle('motion-visible', isIntersecting);
      if (!isIntersecting || !enabled() || seen.has(target)) continue;
      seen.add(target);
      const siblings = [...target.parentElement.children].filter(el => el.matches(selector));
      const delay = Math.min(siblings.indexOf(target) % 3, 2) * 85;
      const animation = target.animate([
        {opacity: 0, transform: 'translateY(28px) scale(.985)'},
        {opacity: 1, transform: 'translateY(0) scale(1)'}
      ], {duration: 850, delay, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'backwards'});
      reveals.set(target, animation);
      animation.onfinish = () => reveals.delete(target);
    }
  }, {threshold: .08, rootMargin: '0px 0px -24px 0px'});
  function discover() {
    scheduled = 0;
    for (const el of observed) {
      if (!el.isConnected || !el.closest('.view.active')) {
        observer.unobserve(el); observed.delete(el); el.classList.remove('motion-visible');
      }
    }
    document.querySelectorAll('.view.active').forEach(view => {
      view.querySelectorAll(selector).forEach((el, index) => {
        if (observed.has(el)) return;
        el.style.setProperty('--drift-delay', `${-(index % 7) * .85}s`);
        observed.add(el); observer.observe(el);
      });
    });
  }
  function queue() { if (!scheduled) scheduled = requestAnimationFrame(discover); }
  function resetCard() {
    if (activeCard) {
      activeCard.style.removeProperty('--tilt-x'); activeCard.style.removeProperty('--tilt-y');
      activeCard.classList.remove('pointer-over'); activeCard = null;
    }
  }
  document.addEventListener('pointermove', event => {
    if (!enabled() || !hover.matches) return;
    const card = event.target.closest('.pact-card');
    if (card !== activeCard) { resetCard(); activeCard = card; }
    if (!card) return;
    pointer = {x: event.clientX, y: event.clientY};
    if (pointerFrame) return;
    pointerFrame = requestAnimationFrame(() => {
      pointerFrame = 0;
      if (!activeCard) return;
      const rect = activeCard.getBoundingClientRect();
      activeCard.classList.add('pointer-over');
      activeCard.style.setProperty('--tilt-x', `${-((pointer.y-rect.top)/rect.height-.5)*5}deg`);
      activeCard.style.setProperty('--tilt-y', `${((pointer.x-rect.left)/rect.width-.5)*6}deg`);
    });
  }, {passive: true});
  document.addEventListener('pointerout', event => { if (!event.relatedTarget) resetCard(); });
  window.addEventListener('scroll', resetCard, {passive: true});
  function preference() {
    if (!enabled()) { resetCard(); reveals.forEach(animation => animation.cancel()); reveals.clear(); }
    queue();
  }
  document.addEventListener('visibilitychange', () => {
    document.body.classList.toggle('motion-paused', document.hidden);
    if (document.hidden) resetCard();
  });
  window.addEventListener('pact:render', queue);
  window.addEventListener('pact:motion', preference);
  reduce.addEventListener('change', preference);
  new MutationObserver(queue).observe(document.querySelector('main'), {childList: true, subtree: true});
  discover();
})();
