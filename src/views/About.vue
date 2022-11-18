<template>
  <div class="about">
    <div class="box">
      <!-- <el-tag type="success" effect="plain">啊哈哈</el-tag>
      <el-tag type="danger">+</el-tag>
      <el-tag type="success" effect="plain">啊哈哈</el-tag>
      <el-tag type="danger">-</el-tag>
      <el-tag type="success" effect="plain">啊哈哈</el-tag>
      <el-tag type="danger">+</el-tag>
      <el-tag type="success" effect="plain" :hit="true">假按揭啊</el-tag> -->

      <el-tag
        v-for="(item, index) in selected"
        :key="index"
        style="margin-bottom: 6px"
        :hit="item.hitState"
        :class="item.type === 'sign' ? 'sign-tag' : ''"
        :type="item.type === 'sign' ? 'danger' : 'success'"
      >
        {{ item.label }}
      </el-tag>
      <!-- <template v-for="(item, index) in selected">
        <el-tag v-if="item.type === 'value'" :key="index" :hit="item.hitState">
          {{ item.label }}
        </el-tag>
        <span v-else :key="index" class="sign">
          {{ item.label }}
        </span>
      </template> -->
      <input
        ref="input"
        autoComplete
        class="el-select__input"
        @keydown.delete="deletePrevTag"
        @input="queryChange"
        v-model="query"
      />
      <span v-show="false">{{ lastType }}</span>
      <!-- 符号 -->
      <el-select
        v-show="lastType === 'value'"
        class="input-new-tag"
        v-if="inputVisible"
        v-model="signValue"
        ref="saveTagInput"
        size="small"
        @change="selectedSign"
      >
        <el-option v-for="sign in signList" :key="sign" :value="sign">
          {{ sign }}
        </el-option>
      </el-select>

      <!-- 值 -->
      <el-select
        v-show="lastType === 'sign'"
        class="input-new-tag"
        v-if="inputVisible"
        v-model="curValue"
        ref="saveTagInput"
        size="small"
        @change="selectedValue"
      >
        <el-option
          v-for="(item, index) in optionList"
          :key="index"
          :value="item.value"
        >
          {{ item.label }}
        </el-option>
      </el-select>

      <el-button v-else class="button-new-tag" size="small" @click="showInput"
        >+ New {{ lastType === "sign" ? "value" : "sign" }}</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: "",
      inputVisible: false,
      selected: [
        {
          label: "交易",
          type: "value",
          hitState: false,
        },
        {
          label: "+",
          type: "sign",
          hitState: false,
        },
        {
          label: "CB",
          type: "value",
          hitState: false,
        },
        {
          label: "-",
          type: "sign",
          hitState: false,
        },
        {
          label: "请款",
          type: "value",
          hitState: false,
        },
      ],
      signList: ["+", "-"],
      signValue: "",
      optionList: [
        {
          label: "请款",
          value: "请款",
        },
        {
          label: "交易",
          value: "交易",
        },
        {
          label: "CB",
          value: "CB",
        },
      ],
      curValue: "",
    };
  },
  computed: {
    lastType() {
      const last = this.selected[this.selected.length - 1];
      console.log(last);
      return last ? last.type : "sign";
    },
  },
  mounted() {
    console.log(this.$route.query);
  },
  methods: {
    queryChange() {
      this.query = "";
    },
    toggleLastOptionHitState(hit) {
      if (!Array.isArray(this.selected)) return;
      const option = this.selected[this.selected.length - 1];
      if (!option) return;
      if (hit === true || hit === false) {
        option.hitState = hit;
        return hit;
      }
      console.log(option);
      option.hitState = !option.hitState;
      return option.hitState;
    },

    deletePrevTag(e) {
      if (this.selected.length > 0 && !this.toggleLastOptionHitState()) {
        this.selected.pop();
      }
    },

    showInput() {
      this.inputVisible = true;
      this.toggleLastOptionHitState(false);
    },

    selectedSign() {
      let signValue = this.signValue;
      if (signValue) {
        this.selected.push({
          label: signValue,
          type: "sign",
          hitState: false,
        });
      }
      this.inputVisible = false;
      this.signValue = "";
      this.$refs.input.focus();
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    },
    selectedValue() {
      let curValue = this.curValue;
      if (curValue) {
        this.selected.push({
          label: curValue,
          type: "value",
          hitState: false,
        });
      }
      this.inputVisible = false;
      this.curValue = "";
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  flex-wrap: wrap;
  margin: 20px;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  padding: 10px;
}
.el-select__input {
  width: 60px;
  border: none;
  outline: none;
  padding: 0;
  color: red;
}

.sign {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
}

.sign-tag {
  display: flex;
  justify-content: center;
  border-color: #ffffff;
  background: #fff;
  margin: 0 10px;
  font-size: 16px;
}
</style>
