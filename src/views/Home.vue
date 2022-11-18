<template>
  <div class="home">
    <van-field v-model="text" label="文本" placeholder="哈哈啊哈"></van-field>
    <van-field v-model="text" label="文本" placeholder="哈哈啊哈">
      <template v-slot:input>
        <input v-model="text" placeholder="哈哈啊哈1" class="custom" />
      </template>
    </van-field>
    <van-form @submit="onSubmit">
      <!-- format-trigger="onChange" -->
      <van-field
        v-model="text"
        autocomplete="off"
        type="number"
        :rules="[
          {
            validator,
            message: 'The number of digits is incorrect',
            trigger: 'onBlur',
          },
        ]"
      ></van-field>
      <van-button native-type="submit">Submit Me</van-button>
    </van-form>

    <van-button @click="handleClick">Click Me</van-button>
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  data() {
    return {
      text: "",
    };
  },
  methods: {
    validator(val) {
      return new Promise((resolve) => {
        resolve(val.length === 10);
      }).catch(() => {});
    },
    handleBlur() {
      this.timer = setTimeout(() => {}, 0);
    },
    onSubmit() {
      alert("submit");
    },
    handleClick() {
      //   clearTimeout(this.timer);
      alert("click");
    },
  },
};
</script>

<style lang="scss" scoped>
// .custom:-moz-placeholder {
//   color: burlywood;
// }
// .custom::-moz-placeholder {
//   color: burlywood;
// }
.custom::-webkit-input-placeholder {
  color: burlywood;
}
// .custom:-ms-input-placeholder {
//   color: burlywood;
// }

::v-deep .van-field__control::-webkit-input-placeholder {
  color: red;
}
</style>
