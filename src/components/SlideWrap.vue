<template>
  <div class="slide">
    <slot></slot>
  </div>
</template>

<styled scoped lang="css">
.slide {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, 250px);
  grid-template-rows: repeat(auto-fit, 300px);
}

@media (520px <= width <= 1060px) {
  .slide {
    grid-template-columns: repeat(2, 250px);
  }
}

@media (width >= 1060px) {
  .slide {
    grid-template-columns: repeat(4, 250px);
  }
}
</styled>
