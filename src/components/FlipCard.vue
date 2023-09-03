<template>
  <div
    :class="['flip-card', isFlipped ? 'flip-card-flipped' : '']"
    @click="flip"
  >
    <div class="flip-card-inner w-100 h-100">
      <div class="flip-card-front w-100 h-100">
        <slot name="front"></slot>
      </div>

      <div class="flip-card-back w-100 h-100">
        <slot name="back"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject } from "vue";

const { isFlipped, flip } = inject<{ isFlipped: boolean; flip: () => void }>(
  "flipped",
)!;
</script>

<styled scoped lang="scss">
.flip-card {
  perspective: 1000px;
  width: 250px;
  height: 300px;

  &-inner {
    text-align: center;
    position: relative;
    transition: transform 0.5s;
    transform-style: preserve-3d;
  }

  &-flipped &-inner {
    transform: rotateY(180deg);
  }

  &-front,
  &-back {
    position: absolute;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }

  &-back {
    transform: rotateY(180deg);
  }
}
</styled>
