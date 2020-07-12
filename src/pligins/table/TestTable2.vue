<!--
 * @Author: your name
 * @Date: 2020-07-11 23:41:03
 * @LastEditTime: 2020-07-12 14:59:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /supply-chian-system/src/pligins/table/TestTable2.vue
--> 
<script>
export default {
  render( h ) {
    return h( 'div',  [ 
      this.$scopedSlots.default(),
      this.$scopedSlots.header( { text:'msg' } )
    ] );
  }
};
</script>