<!--
 * @Author: your name
 * @Date: 2020-07-12 15:22:52
 * @lastTime: 2020-07-13 11:28:33
 * @LastAuthor: huangyuhui
 * @Description: 输入查询
 * @FilePath: \supply-chain-system\src\pligins\table\ToolBar\QueryBar.vue
-->
<template>
  <vxe-toolbar
    ref="Toolbar"
    class="xy-table-query-bar"
    size="medium"
    :loading="loading"
    custom
    :perfect="true"
    :refresh="{ query: handlerRefresh }"
    >
    <template v-slot:buttons>
      <vxeInput
        v-for="(value, key) in formSchema"
        :key="key"
        v-model="$data.$$formData[key]"
        :type="value.type"
        :title="$data.$$formData[key]"
        :placeholder="value.placeholder"
        clearable
        />
      <slot/>
    </template>
  </vxe-toolbar>
</template>
<script>
export default {
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
        startDate: {
          type: 'date',
          placeholder: '请选择日期'
        },
        sex: {
          type: 'select',
          placeholder: '请选择性别'
        }
      } )
    },
    /* 按钮schema */
    buttonSchma: {
      type: Array,
      default:()=>( [] )
    },
    loading: Boolean,
    /* 关联的表格 */
    connectRef: {
      type: Object,
      default: () => ( {} )
    }
  },
  data() {
    return {
      $$formData: {}
    };
  },
  computed: {
    formData: {
      get() {
        return { ...this.$data.$$formData };
      }
    }
  },
  mounted() {
    this.connectRef.connect( this.$refs.Toolbar );
  },
  methods: {
    /**
     * 点击工具栏刷新列表按钮
     * @description:
     * @param {type}
     * @return:
     */
    handlerRefresh() {
      this.$emit( 'handleRefresh' );
    }
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
