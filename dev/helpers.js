
export function elementIsInViewport(ref, callback, overflow) {
  if (ref.current === null) return;
  const rect = ref.current.getBoundingClientRect();

  const overflowOffset = overflow || -100;

  if (
    rect.top >= overflowOffset
    && rect.bottom + overflowOffset <= (window.innerHeight || document.documentElement.clientHeight)
  ) {
    callback(true);
  } else {
    callback(false);
  }
}

export function getViewportHeight() {
  return (window.innerHeight || document.documentElement.clientHeight);
}

export function getViewportWidth() {
  return (window.innerWidth || document.documentElement.clientWidth);
}

export default () => {};
