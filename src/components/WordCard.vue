<template>
  <section>
    <img :src="require(`../assets/images${shownWord.url}`)" width="100" />
    <h2 v-if="shownEnglish">{{ shownWord.English }}</h2>
    <h2 v-if="!shownEnglish">{{ shownWord.Serbian }}</h2>
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
      shownEnglish: true,
    };
  },
  // computed: {
  //   wordImgUrl() {
  //     return `../assets/images${this.shownWord.url}`;
  //   }
  // },
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
    randomiseLanguage() {
      if(Math.floor(Math.random() * 2) === 0) {
        return this.shownEnglish = false;
      } else {
        return this.shownEnglish = true;
      }
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
    // _getImgUrl() {
    //   return this.wordImgUrl = require(`../../public/assets/img/${this.shownWord.url}`);
    // }
  },
  beforeUpdate() {
    this._calculateWords();
  },
  created() {
    this.randomiseLanguage();
  }
};
</script>

<style scoped>
section {
  background-color: #fff;
  max-width: 50%;
}
</style>
