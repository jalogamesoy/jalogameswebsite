// Smooth scroll (Lenis) removed — native scroll only, per the brief
// ("remove the floaty scroll completely"). Native scroll has no momentum
// lag and no route-change resize bug, so nothing replaces it.
//
// Kept as a no-op export so any stray import still resolves; safe to
// delete this file (and the `lenis` dependency) entirely later.
export function SmoothScroll() {
  return null;
}
