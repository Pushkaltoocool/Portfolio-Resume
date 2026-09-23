import { useCallback, useEffect, useRef, useState } from 'react';

const VISIBLE_EACH_SIDE = 2;
const CLICK_SLOP = 6; // px of travel still treated as a click, not a drag
const STEP_RATIO = 1.17; // centre-to-centre spacing, as a multiple of card width

const YAW = 15; // deg the side cards turn to face the centre
const ROLL = 1.8; // deg of lean, so the row reads as hand-placed
const DEPTH = 90; // px each step recedes
const LIFT = 14; // px each step drops

/**
 * Builds the full transform as a string.
 *
 * This deliberately does NOT drive the transform from CSS custom properties.
 * Unregistered custom properties are not interpolatable, so a transform composed
 * from them changes discretely and the transition never runs: the cards jump.
 * Emitting a fresh declaration per offset makes it a normal animatable change,
 * while `calc()` against --labs-step keeps the spacing responsive.
 */
const transformFor = (offset, dragDx) => {
  const abs = Math.abs(offset);
  // Fractional position while dragging, so depth and rotation ease between
  // slots rather than snapping when the active index finally changes.
  const eased = Math.max(0, abs - Math.abs(dragDx) * 0.0016);
  return [
    `translateX(calc(${offset} * var(--labs-step) + ${dragDx}px))`,
    `translateY(${eased * LIFT}px)`,
    `translateZ(${-eased * DEPTH}px)`,
    `rotateY(${-offset * YAW}deg)`,
    `rotateZ(${offset * ROLL}deg)`,
  ].join(' ');
};

/**
 * Horizontal peek carousel with a 3D fan.
 *
 * Five cards are on screen at once, the centre one upright and the neighbours
 * rotated away, so the set is scannable without clicking through it. Wraps, so
 * there is never a dead edge. Drag with a mouse or finger: the row follows the
 * pointer and snaps to the nearest card on release.
 */
const LabsCarousel = ({ items, active, onActiveChange, renderItem, label }) => {
  const trackRef = useRef(null);
  const dragRef = useRef(null);
  const swipedRef = useRef(false);
  const [dragDx, setDragDx] = useState(0);
  const [dragging, setDragging] = useState(false);
  const n = items.length;

  const wrap = useCallback((i) => ((i % n) + n) % n, [n]);

  const step = useCallback((delta) => onActiveChange(wrap(active + delta)), [active, wrap, onActiveChange]);

  /** Shortest signed distance from the active card, so offsets run -h..h. */
  const signedOffset = useCallback(
    (i) => {
      const half = Math.floor(n / 2);
      let offset = wrap(i - active);
      if (offset > half) offset -= n;
      return offset;
    },
    [active, n, wrap],
  );

  /** Centre-to-centre spacing in px, measured rather than assumed, so it stays
   *  correct across the responsive card-width breakpoints. */
  const stepPx = useCallback(() => {
    const slot = trackRef.current?.querySelector('.labs-slot');
    return (slot?.offsetWidth || 300) * STEP_RATIO;
  }, []);

  const onKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      step(-1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      step(1);
    }
  };

  useEffect(() => {
    // Bring a card to the centre when it receives focus via Tab.
    const node = trackRef.current;
    if (!node) return undefined;
    const onFocusIn = (e) => {
      const slot = e.target.closest('[data-index]');
      if (slot) onActiveChange(Number(slot.dataset.index));
    };
    node.addEventListener('focusin', onFocusIn);
    return () => node.removeEventListener('focusin', onFocusIn);
  }, [onActiveChange]);

  const onPointerDown = (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    // Clear per interaction. A drag that ends without a trailing click would
    // otherwise leave this set and swallow the next real click.
    swipedRef.current = false;
    dragRef.current = { x: e.clientX, captured: false };
  };

  const onPointerMove = (e) => {
    const d = dragRef.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) <= CLICK_SLOP) return;

    if (!d.captured) {
      // Capture only once a real drag starts. Capturing on pointerdown would
      // retarget the following `click` to this element, so the card's link
      // would never receive it and nothing would open.
      d.captured = true;
      swipedRef.current = true;
      setDragging(true);
      e.currentTarget.setPointerCapture?.(e.pointerId);
    }
    setDragDx(dx);
  };

  const endDrag = (e) => {
    const d = dragRef.current;
    if (!d) return;
    dragRef.current = null;

    if (d.captured) {
      e.currentTarget.releasePointerCapture?.(e.pointerId);
      setDragging(false);
      setDragDx(0);
      // Snap to whichever card the row was dragged nearest to.
      const moved = Math.round(-(e.clientX - d.x) / stepPx());
      if (moved !== 0) step(moved);
    }
  };

  const onClickCapture = (e) => {
    if (!swipedRef.current) return;
    // A drag must not also navigate: the card is a link, and the browser fires
    // click on release no matter how far the pointer travelled.
    swipedRef.current = false;
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className="labs-stage" role="group" aria-roledescription="carousel" aria-label={label}>
      <div
        ref={trackRef}
        className={`labs-track ${dragging ? 'is-dragging' : ''}`}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
        style={{ touchAction: 'pan-y' }}
      >
        {items.map((item, i) => {
          const offset = signedOffset(i);
          const abs = Math.abs(offset);
          const far = abs > VISIBLE_EACH_SIDE;

          return (
            <div
              key={item.slug}
              className="labs-slot"
              data-index={i}
              data-active={offset === 0}
              data-far={far}
              aria-hidden={far}
              onClickCapture={(e) => {
                // A side card centres itself instead of navigating.
                if (offset === 0 || swipedRef.current) return;
                e.preventDefault();
                e.stopPropagation();
                onActiveChange(i);
              }}
              style={{ transform: transformFor(offset, dragDx), zIndex: 100 - abs }}
            >
              {/* Separate layer: the slot owns position, this owns the ambient
                  drift, so the two transforms never fight over one element. */}
              <div
                className="labs-float"
                style={{ animationDelay: `${(i % 5) * -1.6}s`, animationDuration: `${7 + (i % 3)}s` }}
              >
                {renderItem(item, { isActive: offset === 0, tabbable: !far })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LabsCarousel;
