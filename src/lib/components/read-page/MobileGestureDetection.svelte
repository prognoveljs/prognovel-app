<script lang="ts">
  import { browser } from "$app/environment";
  import {
    disableNextChapter,
    disablePrevChapter,
    nextChapterLink,
    prevChapterLink,
  } from "$lib/store/read-page";
  import { onMount, onDestroy } from "svelte";

  let mc;
  let Hammer;

  const SWIPE_THRESHOLD = browser ? document.body.clientWidth : 150;
  const SWIPE_VELOCITY = 0.3;

  onMount(async () => {
    try {
      const module = await import(/* webpackChunkName: "mobile-gesture-detection" */ "hammerjs");
      Hammer = module.default;
      mc = new Hammer.Manager(document.body.querySelector("#chapter"), {});

      // mc.add(new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 0 }));
      // mc.add(new Hammer.Tap({ event: "doubletap", taps: 2 }));
      // mc.add(new Hammer.Press());
      // mc.add(new Hammer.Pinch());
      mc.add(new Hammer.Swipe({ event: "swipe", direction: Hammer.DIRECTION_HORIZONTAL }));
      // mc.add(new Hammer.Swipe({ event: "swiperight" }));
      // mc.add(new Hammer.Swipe({ event: "swipeleft" }));

      // mc.on("pan", onMobilePanGesture);
      mc.on("doubletap", onMobileDoubleTapGesture);
      mc.on("press", onMobilePressGesture);
      mc.on("pinch", onMobilePinchGesture);
      mc.on("swiperight", onMobileSwipeRightGesture, {
        threshold: SWIPE_THRESHOLD,
        velocity: SWIPE_VELOCITY,
      });
      mc.on("swipeleft", onMobileSwipeLeftGesture, {
        threshold: SWIPE_THRESHOLD,
        velocity: SWIPE_VELOCITY,
      });
    } catch (err) {
      console.error("Unable to load hammerjs");
    }
  });

  onDestroy(() => {
    // destroy Hammerjs here...
  });

  function onMobilePanGesture() {
    console.log("User pan gesture on mobile.");
  }

  function onMobileDoubleTapGesture() {
    console.log("User double tap gesture on mobile.");
  }

  function onMobilePressGesture() {
    console.log("User press gesture on mobile.");
  }

  function onMobilePinchGesture() {
    console.log("User pinch gesture on mobile.");
  }

  function onMobileSwipeRightGesture() {
    if ($disablePrevChapter || !$prevChapterLink) return;
    const link = document.createElement("a");
    link.href = $prevChapterLink;
    document.body.appendChild(link);
    link.click();
    link.remove();
    console.log("User swipe right gesture on mobile.");
  }

  function onMobileSwipeLeftGesture() {
    if ($disableNextChapter || !$nextChapterLink) return;
    const link = document.createElement("a");
    link.href = $nextChapterLink;
    document.body.appendChild(link);
    link.click();
    link.remove();
    console.log("User swipe left gesture on mobile.");
  }
</script>
