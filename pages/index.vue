<template>
  <div>
    <div class="iframe-wrapper">
      <iframe src="/landing/index.html" frameborder="0"></iframe>
    </div>
    <Footer class="landing-footer" />
  </div>
</template>

<script>
export default {
  layout: "blank",
};
</script>

<style scoped>
html,
body {
  background-color: #3e1fa1;
}
.iframe-wrapper {
  overflow-x: hidden;
  overflow-y: auto;
}
iframe {
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  width: calc(100% + 15px);
  z-index: 1;
}
@media (max-width: 768px) {
  iframe {
    height: 95vh;
    width: 100%;
  }
}
</style>