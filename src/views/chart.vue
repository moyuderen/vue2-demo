<template>
  <div>
    <LineChart :value="list" />
    <button @click="handleClick">跳转</button>
  </div>
</template>

<script>
import LineChart from "./components/LineChart";

import { json, json2 } from "./json";

export default {
  components: {
    LineChart,
  },
  data() {
    return {
      list: [],
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      setTimeout(() => {
        this.list = json;
      }, 300);
    },
    handleClick() {
      this.$router.push({
        path: "about",
        query: {
          name: 1,
          info: JSON.stringify({
            age: 19,
          }),
        },
      });
    },
  },
};
</script>
