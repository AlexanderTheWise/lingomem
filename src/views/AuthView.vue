<template>
  <FlexCenterContainer class="auth-container h-screen">
    <RouterView />
  </FlexCenterContainer>
</template>

<script setup lang="ts">
import FlexCenterContainer from "../components/FlexCenterContainer.vue";
</script>

<styled scoped lang="css">
.auth-container {
  background:
    url("../assets/images/eraser.svg") 10% -10% no-repeat,
    url("../assets/images/pencil.svg") right bottom no-repeat,
    url("../assets//images/notebook.svg") -5% 2700% no-repeat;
}
</styled>
