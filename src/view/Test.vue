<!--
 * @Author: your name
 * @Date: 2020-07-25 21:45:07
 * @LastEditTime: 2020-07-28 23:13:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /supply-chian-system/src/view/Test.vue
--> 
<template>
  <div>
    <lazyComponent cname="TableCom">
      <img
        :src="url"
        alt=""
        >
    </lazyComponent>
    <lazyComponent cname="TableCom">
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
  components:{
    lazyComponent:lazyComponent(),
    // eslint-disable-next-line vue/no-unused-components
    TableCom: () => import( '@/plugins/TableJsx/index.js' ),
    // eslint-disable-next-line vue/no-unused-components
    TestCom: () => import( '@/TestCom.js' )

  },
  data () {
    return {
      url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595954602672&di=3e5562582a15f4d52077854b0570b272&imgtype=0&src=http%3A%2F%2Fimg4.imgtn.bdimg.com%2Fit%2Fu%3D3458475739%2C295617657%26fm%3D214%26gp%3D0.jpg'
    };
  }
};
</script>