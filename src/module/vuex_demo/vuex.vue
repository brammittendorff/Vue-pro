<template>

  <div >
    <a href="/#/echarts">前往echarts</a>
    <input  v-model="counts" />
    <button @click.stop="add" >增加1</button>
    <button @click.stop="reduce" >减少1</button>
    <button @click.stop="add1000" >增加1000</button>
    <button @click.stop="reduce1000" >减少1000</button>
    <div v-cloak  v-text="name"></div>
    <div  v-html="html"></div>
    <div v-pre>v-pre跳过渲染</div>
    <input v-model.number.trim='number' placeholder="model修饰符" />
    <!-- <img src="./assets/logo.png"> -->
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      name: "大家好",
      html: "<h2>才是真的好</h2>",
      number: ""
    };
  },
  computed: {
    ...mapState({
      counts: state => state.count
    }),
    ...mapGetters({
      getternum: "docount"
    })
  },
  methods: {
    ...mapMutations({
      addnum: "SET_COUMT_ADD",
      reducenum: "SET_COUMT_REDUCE"
    }),
    ...mapActions({
      addmore: "ADD1000",
      reducemore: "REdUCE1000"
    }),
    add() {
      this.addnum();
      console.log(this.counts, "+1");
    },
    reduce() {
      this.reducenum();
      console.log(this.counts, "-1");
    },
    add1000() {
      this.addmore();
      console.log(this.counts, "+1000");
    },
    reduce1000() {
      this.reducemore();
      console.log(this.counts, "-1000");
    }
  },

  mounted() {
    // console.log(this.counts, this.$store.state.count, 111111111);
    // this.addmore()
  }
};
</script>

<style>
[v-cloak] {
  display: none;
}
</style>
