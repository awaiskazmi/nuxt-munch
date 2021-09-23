<template>
  <div>
    <div class="input-grid">
      <input
        id="1"
        @click="onclick"
        @keyup="onkeyup"
        type="text"
        class="form-control"
      />
      <input
        id="2"
        @click="onclick"
        @dblclick="onclick"
        @keyup="onkeyup"
        type="text"
        class="form-control"
      />
      <input
        id="3"
        @click="onclick"
        @keyup="onkeyup"
        type="text"
        class="form-control"
      />
      <input
        id="4"
        @click="onclick"
        @keyup="onkeyup"
        type="text"
        class="form-control"
      />
    </div>
    <div class="row mt-4">
      <div class="col">
        <button class="btn btn-outline-primary btn-block">Resend Code</button>
      </div>
      <div class="col">
        <button class="btn btn-primary btn-block">Verify</button>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col">
        <button class="btn btn-link">
          Resend code in
          <span class="text-dark">00:54</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    onclick(e) {
      e.target.select();
    },
    onkeyup(e) {
      let id = parseInt(e.target.id);
      let target = id + 1 > 4 ? 4 : id + 1;
      console.log(id + 1, target);
      if (e.target.value.length >= 1) {
        document.getElementById(target).select();
      }
    },
  },
};
</script>

<style scoped>
.input-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}
.form-control {
  text-align: center;
}
</style>