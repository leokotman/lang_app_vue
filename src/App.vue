<template>
  <div id="app">
    <h1>Hello WORLD!</h1>
    <WordCard
      :shownWord="shownWord"
      :words="words"
      @changeWord="changeWord(shownWord)"
    />
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
      wordsToLearn: [],
    };
  },
  components: {
    WordCard,
  },
  methods: {
    showWord() {
      this._filterWordsToLearn();
      const randomWord = this._randomiseWord();
      if (randomWord.answered === true && this.wordsToLearn.length > 0) {
        this.showWord();
      } else if (this.wordsToLearn.length > 0) {
        return (this.shownWord = randomWord);
      } else {
        return this.shownWord = {};
      }
    },
    changeWord(shownWord) {
      console.log(shownWord);
      // const wordToReplace = this.words.find((word) => word.id === shownWord.id);
      // console.log(wordToReplace);
      this.showWord();
    },
    _randomiseWord() {
      let randomWord =
        this.words[Math.floor(Math.random() * this.words.length)];
      return randomWord;
    },
    _filterWordsToLearn() {
      return (this.wordsToLearn = this.words.filter((word) => word.answered === false));
    }
  },
  created() {
    this.showWord();
  },
  beforeUpdate() {
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
