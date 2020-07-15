<!--
 * @Author: huangyuhui
 * @since: 2020-07-15 10:18:15
 * @LastAuthor: huangyuhui
 * @lastTime: 2020-07-15 15:20:13
 * @message: 
 * @FilePath: \supply-chain-system\src\pligins\modal\modal.vue
--> 
<template>
  <vxe-modal
    :id="$data.$$id"
    class="xy-component-modal-2020-7-15"
    :value="visible"
    type="confirm"
    :title="title"
    width="800"
    height="400"
    resize
    showFooter
    dblclickZoom
    :destroyOnClose="true"
    @close="handlerClose"
    >
    <slot/>
    <template v-slot:footer>
      <div class="xy-component-modal-footer">
        <vxe-button @click="handlerCancel">
          取消
        </vxe-button>
        <vxe-button
          status="primary"
          @click="handlerConfirm"
          >
          确定
        </vxe-button>
      </div>
    </template>
  </vxe-modal>
</template>
<script>

let id = 0;
export default {
  props:{
    visible:{
      type: Boolean,
      default: false
    },

    /* 是否显示底部按钮 */
    showFooter:{
      type: Boolean,
      default: true  
    },

    /* 模态窗标题 */
    title:{
      type: String,
      default: '测试modal'
    }
  },
  data () {
    return {
      $$id: `current-modal-id${ id += 1}`
    };
  },
  methods:{

    /**
     * 点击确定按钮事件
     * @description: 
     * @param {type} 
     * @return:  emit 事件
     */
    handlerConfirm ( e ) {
      e.$event.stopPropagation();
      this.$emit( 'handConfirm' );
    },

    /**
     * 点击底部取消按钮事件
     * @description: 
     * @param {type} 
     * @return: emit 事件
     */
    handlerCancel ( e ) {
      e.$event.stopPropagation();
      return this.$emit( 'handClose' );
    },

    /**
     * 点击上右关闭按钮事件
     * @description: 
     * @param {type} 
     * @return: 
     */
    handlerClose () {
      this.$emit( 'handClose' );
    }
  }
};
</script>
<style lang='scss'>
.xy-component-modal-2020-7-15{
  .vxe-modal--header{
    background-color: initial
  }
  .xy-component-modal-footer{
    padding: .8em 0;
    border-top: 1px solid #f0f0f0
  }
}
</style>