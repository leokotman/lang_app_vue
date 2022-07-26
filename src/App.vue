<template>
  <div id="app">
    <header>
      <img :src="logo" alt="lapp logo" class="main_logo" height="200" />
    </header>
    <section class="card_block">
      <WordCard
        :shownWord="shownWord"
        :words="wordsToLearn"
        @changeWord="showWord"
      />
      <div class="points">
        <span
          ><img src="./assets/icons/like.svg" alt="like" height="24" />{{
            learnedWords
          }}
          / {{ words.length }}</span
        >
        <span
          ><img src="./assets/icons/dislike.svg" alt="dislike" height="24" />{{
            newWords
          }}
          / {{ words.length }}</span
        >
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import WordCard from "./components/WordCard.vue";
import data from "./data.json"; //languages data
import logo from "./assets/logo/logo_transparent.png";

export default {
  name: "App",
  data() {
    return {
      words: [...data.words],
      shownWord: {},
      wordsToLearn: [],
      logo: logo,
      dataFromDB: null,
      dbUrl: "https://api.npoint.io/afbd4c6c7edae59beb97",
      // windowWidth: document.documentElement.clientWidth,
    };
  },
  computed: {
    // Calculations of learned/not learned words to show statistics
    learnedWords() {
      return this.words.length - this.wordsToLearn.length;
    },
    newWords() {
      return this.wordsToLearn.length;
    },
  },
  watch: {
    // Check for words left to learn to reload the app
    newWords(newNumber) {
      if (newNumber <= 0) {
        this._updateApp();
      }
    },

    // Check for logo quality change
    // windowWidth(newNumber) {
    //   if (newNumber > 1920) {
    //     this.logo = logoBig;
    //   } else if (newNumber < 1920) {
    //     this.logo = logo;
    //   }
    // },
  },
  components: {
    WordCard,
  },
  methods: {
    getData() {
      axios
        .get(this.dbUrl)
        .then(
          (response) => (
            (this.dataFromDB = response.data), console.log(this.dataFromDB)
          )
        )
        .catch((err) => console.log(err));
    },

    // Main function for rendering a random & not learned (yet) word
    showWord() {
      this._filterWordsToLearn();
      const randomWord = this._randomiseWord();

      if (randomWord.answered === true && this.wordsToLearn.length > 0) {
        this.showWord();
      } else if (this.wordsToLearn.length > 0) {
        return (this.shownWord = randomWord);
      } else {
        return (this.shownWord = {});
      }
    },

    // get a random word from data to show
    _randomiseWord() {
      let randomWord =
        this.words[Math.floor(Math.random() * this.words.length)];
      return randomWord;
    },

    // filter array of words to show not learned words - new array returned
    _filterWordsToLearn() {
      return (this.wordsToLearn = this.words.filter(
        (word) => word.answered === false
      ));
    },

    // Congratulations after learning all words, suggestion to reload the app & statistics
    _updateApp() {
      if (
        confirm(
          "You have learned everything, congratulations! Do you want to learn the words again? The page will reload."
        )
      ) {
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        return;
      }
    },

    // _getDimensions() {
    //   this.windowWidth = document.documentElement.clientWidth;
    // },
  },
  created() {
    this.showWord();
    this.getData();
  },
  mounted() {
    // window.addEventListener("resize", this._getDimensions);
  },
  unmounted() {
    // window.removeEventListener("resize", this._getDimensions);
  },
};
</script>

<style>
#app {
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #222222;
  background: rgb(255, 255, 255);
  background: linear-gradient(
    0deg,
    rgba(85, 82, 115, 0.4) 26%,
    rgba(255, 255, 255, 1) 68%
  );
  min-height: 100vh;
  font-size: 1.5rem;
}
header {
  background-color: #fff;
}
.card_block {
  background-color: #fff;
  background-repeat: no-repeat;
  background-position: 28% 40%;
  width: 66.6%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 1.6rem 0 3.125rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.563rem;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.16);
  border-radius: 10px;
}
.main_logo {
  /* padding: 3.125rem 0; */
  width: max-content;
}
.points {
  color: #555273;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 19%;
}
.points span {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

/* Adaptive & responsive design for 1920px, 1280px, 380px */
@media screen and (min-width: 1280px) {
  .card_block {
    width: 80%;
  }
}
@media screen and (min-width: 1920px) {
  .card_block {
    justify-content: center;
    width: 66%;
  }
  .main_logo {
    height: 400px;
  }
}

@media screen and (max-width: 1280px) {
  .main_logo {
    height: 150px;
  }
  .card_block {
    padding: 3.125rem 0 2.25rem;
    background-size: 68%;
    width: 92%;
    background-position: 25% top;
  }
  .points {
    font-size: 1rem;
  }
}
@media screen and (max-width: 660px) {
  .main_logo {
    /* padding: 2.7rem 0 1.875rem; */
  }
  .card_block {
    border-radius: 40px;
  }
}

@media screen and (max-width: 380px) {
  .card_block {
    flex-direction: column-reverse;
    padding: 1.5rem 0 1.25rem;
    width: 91.5%;
  }
}
</style>
