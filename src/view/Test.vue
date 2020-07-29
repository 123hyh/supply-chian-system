<!--
 * @Author: your name
 * @Date: 2020-07-25 21:45:07
 * @lastTime: 2020-07-29 17:58:44
 * @LastAuthor: huangyuhui
 * @Description: In User Settings Edit
 * @FilePath: \supply-chain-system\src\view\Test.vue
-->
<template>
  <div
    style="margin-top:900px"
    class="test-lazy-box"
    >
    <lazyComponent
      cname="TestOne"
      height="500"
      @testlisteners="handlerCLick"
      >
      <img
        :src="url"
        alt=""
        >
      <template v-slot:content>
        <h1>测试插槽</h1>
      </template>
    </lazyComponent>
    <lazyComponent
      cname="TestOne"
      @testlisteners="handlerCLick2"
      >
      <img
        :src="url"
        alt=""
        >
    </lazyComponent>
  </div>
</template>
<script>
import lazyComponent from '@/plugins/lazyComponent/index.js';
export default {
  name: 'TestLazy',
  
  components: {
    ...lazyComponent(),
    // eslint-disable-next-line vue/no-unused-components
    TestOne: () => import( '@/view/Test/index.vue' )
  },
  data () {
    return {
      url:
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595954602672&di=3e5562582a15f4d52077854b0570b272&imgtype=0&src=http%3A%2F%2Fimg4.imgtn.bdimg.com%2Fit%2Fu%3D3458475739%2C295617657%26fm%3D214%26gp%3D0.jpg'
    };
  },
  
  mounted () {
    console.log( this.$options );
  },
  methods:{
    handlerCLick () {
      console.log( '组件1点击了' );
    },
    handlerCLick2 () {
      console.log( '组件2点击了' );
    }
  }
};
</script>
<style lang="scss">

</style>
