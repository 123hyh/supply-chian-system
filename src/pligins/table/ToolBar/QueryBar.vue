<!--
 * @Author: your name
 * @Date: 2020-07-12 15:22:52
 * @LastEditTime: 2020-07-12 20:53:00
 * @LastEditors: Please set LastEditors
 * @Description: 输入查询
 * @FilePath: /supply-chian-system/src/pligins/table/ToolBar/QueryBar.vue
-->
<template>
  <div class="xy-table-query-bar">
    <vxe-input
      :type="value.type"
      :key="key"
      :title='$data.$$formData[key]'
      :placeholder="value.placeholder"
      v-for="(value, key) in formSchema"
      v-model="$data.$$formData[key]"
      clearable
    ></vxe-input>
    <slot></slot>
  </div>
</template>
<script>
export default {
  computed:{
    formData: {
      get() {
        return { ...this.$data.$$formData };
      }
    }
  },
  name: 'QueryBar',
  props: {
    /* 查询栏表单配置 */
    formSchema: {
      type: Object,
      default: () => ( {
        name: {
          type: 'string',
          placeholder: '请输入姓名'
        },
        age: {
          type: 'number',
          placeholder: '请输入年龄'
        },
        startDate:{
          type: 'date',
          placeholder:'请选择日期'
        },
        sex:{
          type: 'select',
          placeholder:'请选择性别'
        }
      } )
    }
  },
  data() {
    return {
      $$formData: {}
    };
  }
};
</script>
<style lang="scss">
.xy-table-query-bar {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  > * {
    flex-basis: calc(25% - 0.4em);
    margin: 0.2em;
    .vxe-input--inner {
      border-radius: 0;
    }
  }
}
</style>
