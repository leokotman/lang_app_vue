<template>
  <div id="app">
    <h1>Hello WORLD!</h1>
    <!-- <p>{{words}}</p> -->
    <WordCard :words="words" />
  </div>
</template>

<script>
import WordCard from "./components/WordCard.vue";
import data from "./data.json";

export default {
  name: "App",
  data() {
    return {
      words: data.words,
    }
  },
  components: {
    WordCard,
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
}
</style>
