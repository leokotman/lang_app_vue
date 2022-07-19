<template>
  <div>
    <img :alt="shownWord.url" />
    <h2>{{ shownWord.English }}</h2>
    <h2>{{ shownWord.Serbian }}</h2>
    <h2>{{ shownWord.id }}</h2>
  </div>
</template>

<script>
export default {
  props: {
    words: {
      type: Array,
      required: true,
    },
  },
  computed: {
    shownWord() {
      let randomWord =
        this.words[Math.floor(Math.random() * this.words.length)];
      return randomWord;
    },
  },
};
</script>

<style scoped></style>
