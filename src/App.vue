<template>
  <div id="app">
    <h1>Hello WORLD!</h1>
    <!-- <p>{{words}}</p> -->
    <WordCard :shownWord="shownWord" :words="words" @changeWord="showWord" />
  </div>
</template>

<script>
import WordCard from "./components/WordCard.vue";
import data from "./data.json";

export default {
  name: "App",
  data() {
    return {
      words: [...data.words],
      shownWord: {},
    };
  },
  components: {
    WordCard,
  },
  methods: {
    showWord() {
      this._randomiseWord();
      if (this.shownWord.answered === true) {
        this._randomiseWord();
      } else {
        return this.shownWord;
      }
    },
    _randomiseWord() {
      return (this.shownWord =
        this.words[Math.floor(Math.random() * this.words.length)]);
    },
  },
  created() {
    this.showWord();
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background-color: lightblue;
}
</style>
