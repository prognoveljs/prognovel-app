interface PannableOptions {
  restrictX?: boolean;
  restrictY?: boolean;
  tresholdX?: number;
  tresholdXMinus?: number;
  tresholdY?: number;
  tresholdYMinus?: number;
}

export function pannable(node: HTMLElement, opts: PannableOptions) {
  let x: number;
  let y: number;
  let dx: number;
  let dy: number;

  function handleMouseDown(event: MouseEvent) {
    _reset(event);
    x = event.clientX;
    y = event.clientY;

    node.dispatchEvent(
      new CustomEvent("panstart", {
        detail: {
          x,
          y,
        },
      }),
    );

    if (opts.tresholdX || opts.tresholdY) _checkTreshold();

    node.addEventListener("mouseup", handleMouseUp);
    node.addEventListener("mousemove", handleMouseMove);
  }

  function handleMouseUp(event: MouseEvent) {
    node.dispatchEvent(
      new CustomEvent("panend", {
        detail: {
          x,
          y,
          dx,
          dy,
          ex: event.clientX,
          ey: event.clientY,
        },
      }),
    );
    node.removeEventListener("mouseup", handleMouseUp);
    node.removeEventListener("mousemove", handleMouseMove);
  }

  function handleMouseMove(event: MouseEvent) {
    if (!opts.restrictX) dx = event.clientX - x;
    if (!opts.restrictY) dy = event.clientX - y;

    node.dispatchEvent(
      new CustomEvent("panmove", {
        detail: {
          x,
          y,
          dx,
          dy,
        },
      }),
    );
  }

  node.addEventListener("mousedown", handleMouseDown);

  return {
    destroy: () => {
      _cleanEventListener();
    },
  };

  function _checkTreshold() {
    // check treshold
  }

  function _cleanEventListener() {
    node.removeEventListener("mousedown", handleMouseDown);
    node.removeEventListener("mouseup", handleMouseUp);
    node.removeEventListener("mousemove", handleMouseMove);
  }

  function _reset(event: MouseEvent) {
    x = event.clientX;
    y = event.clientY;
    dx = 0;
    dy = 0;
  }
}
