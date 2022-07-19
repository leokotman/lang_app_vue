<template>
  <div id="app">
    <h1>Hello WORLD!</h1>
    <WordCard
      :shownWord="shownWord"
      :words="wordsToLearn"
      @changeWord="changeWord(shownWord)"
    />
    <div> <img src="./assets/icons/like.svg" alt="like"/> {{learnedWords}} / {{words.length}} </div>
    <div> <img src="./assets/icons/dislike.svg" alt="dislike"/> {{newWords}} / {{words.length}} </div>
  </div>
</template>

<script>
import WordCard from "./components/WordCard.vue";
import data from "./data.json";
// import like from "./assets/icons/like.svg";
// import dislike from "./assets/icons/dislike.svg";

export default {
  name: "App",
  data() {
    return {
      words: [...data.words],
      shownWord: {},
      wordsToLearn: [],
    };
  },
  computed: {
      learnedWords() {
        return this.words.length - this.wordsToLearn.length;
      },
      newWords() {
        return this.wordsToLearn.length;
      }
  },
  watch: {
    newWords(newNumber) {
      if(newNumber <= 0) {
        this._updateApp();
      }
    }
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
    },
    
    _updateApp() {
      if(confirm("You have learned everything, congratulations! Do you want to learn the words again? The page will reload.")) {
        window.location.reload();
      } else {
        return;
      }
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
