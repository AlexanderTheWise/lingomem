<template>
  <div class="auth-container h-screen d-flex justify-center align-center">
    <RouterView />
  </div>
</template>

<styled scoped lang="css">
.auth-container {
  background:
    url("../assets/images/eraser.svg") 10% -10% no-repeat,
    url("../assets/images/pencil.svg") right bottom no-repeat,
    url("../assets//images/notebook.svg") -5% 2700% no-repeat;
}
</styled>
