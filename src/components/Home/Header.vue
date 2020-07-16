<!--
 * @Author: huangyuhui
 * @since: 2020-07-08 11:48:47
 * @LastAuthor: huangyuhui
 * @lastTime: 2020-07-08 16:58:01
 * @message: 
 * @FilePath: \supply-chain-cli\src\components\Home\Header.vue
-->
<template>
  <header>
    <!-- 左边菜单操作按钮 -->
    <div class="menu-opration">
      <div>
        <i
          title="菜单"
          :class="classList"
          @click.stop="() => SET_MENU_STATUS()"
          />
        <i
          v-reload
          title="刷新"
          class="el-icon-refresh"
          />
      </div>
      <Breadcrumb>
        <BreadcrumbItem>首页</BreadcrumbItem>
        <BreadcrumbItem>列表</BreadcrumbItem>
        <BreadcrumbItem>选项</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <!-- nav  -->
    <div/>
    <!-- 用户操作区域 -->
    <div class="block-opration">
      <div>
        <i
          class="el-icon-full-screen"
          style="font-size: 25px"
          @click.stop="handlerFullscreen"
          />
      </div>
    </div>
  </header>
</template>
<script>
import { mapMutations, mapState } from 'vuex';
import { Breadcrumb, BreadcrumbItem } from 'element-ui';
export default {
  name: 'HeaderComponent',
  components:{
    Breadcrumb,
    BreadcrumbItem
  },
  mounted () {
    console.log( '加载了' );
  },
  // eslint-disable-next-line vue/order-in-components
  computed: {
    ...mapState( 'opration', [ 'closeMenu' ] ),
    classList () {
      return {
        'el-icon-s-unfold': this.closeMenu,
        'el-icon-s-fold': !this.closeMenu
      };
    }
  },
  methods: {
    ...mapMutations( 'opration', [ 'SET_MENU_STATUS' ] ),

    /**
     * 点击全屏事件
     * @description:
     * @param {type}
     * @return:
     */

    handlerFullscreen () {
      if ( document.fullscreen ) {
        document.exitFullscreen();
      } else {
        document.documentElement.requestFullscreen();
      }
    }
  }
};
</script>
<style lang="scss">
.block-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  .menu-opration {
    display: flex;
    align-items: center;
    i {
      font-size: 18px;
      cursor: pointer;
      &:hover {
        color: #409eff;
      }
      &:active {
        transform: rotate(180deg);
      transition: all 0.1s linear;
      }
    }
    .el-breadcrumb{
      margin-left: 1em;
    }
  }
  .block-opration {
    .el-icon-full-screen {
      cursor: pointer;
    }
  }
}
</style>
