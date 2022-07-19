<template>
  <section>
    <img :alt="shownWord.url" />
    <h2>{{ shownWord.English }}</h2>
    <h2>{{ shownWord.Serbian }}</h2>
    <h2>{{ shownWord.id }}</h2>
    <button @click="changeWord">Change correct word</button>
    <button @click="checkWord" >False word</button>
    <p v-if="emptyWords">You learned everything!</p>
  </section>
</template>

<script>
export default {
  data() {
    return {
      wordsToLearn: this.words.length,
      emptyWords: false,
    };
  },
  props: {
    shownWord: {
      type: Object,
      required: true,
    },
    words: {
      type: Array,
      required: true,
    },
  },
  methods: {
    changeWord() {
      this._removeWord();
      this.$emit("changeWord", this.shownWord);
    },
    _calculateWords() {
      if (this.shownWord.answered === true || this.wordsToLearn <= 0) {
        return (this.emptyWords = true);
      } else {
        return;
      }
    },
    checkWord() {
      this.$emit("changeWord", this.shownWord);
    },
    _removeWord() {
      this.shownWord.answered = true;
      this.wordsToLearn--;
    },
  },
  beforeUpdate() {
    this._calculateWords();
  },
};
</script>

<style scoped>
section {
  background-color: #fff;
  max-width: 50%;
}
</style>
