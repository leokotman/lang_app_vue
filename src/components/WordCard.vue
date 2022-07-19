<template>
  <section>
      <img :alt="shownWord.url" />
      <h2>{{ shownWord.English }}</h2>
      <h2>{{ shownWord.Serbian }}</h2>
      <h2>{{ shownWord.id }}</h2>
      <button @click="changeWord">Change word</button>
  </section>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  props: {
    shownWord: {
      type: Object,
      required: true,
    },
    words: {
      type: Array,
      required: true
    }
  },
  methods: {
    changeWord() {
      this.$emit("changeWord", this.shownWord);
    }
  },
};
</script>

<style scoped>
section {
  background-color: #fff;
  max-width: 50%;
}
</style>
