<!--
 * @Author: huangyuhui
 * @since: 2020-07-08 11:48:38
 * @LastAuthor: huangyuhui
 * @lastTime: 2020-07-08 17:25:48
 * @message: 
 * @FilePath: \supply-chain-cli\src\components\Home\Menu.vue
-->
<template>
  <menu>
    <el-menu
      class="menu-box"
      :style="{ width: closeMenu ? 'auto' : '200px' }"
      @open="handleOpen"
      @close="handleClose"
      :collapse="closeMenu"
      :collapse-transition="false"
    >
      <!-- 递归菜单组件 -->
      <MenuItemComponent
        v-for="item in menuList"
        :currentMenu="item"
        :key="item.menuCode"
      />
    </el-menu>
  </menu>
</template>
<script>
import { Menu } from 'element-ui';
import MenuItemComponent from '@/components/Home/Menu/MenuItem.vue';
import { mapGetters, mapState } from 'vuex';
export default {
  name: 'menu-component',
  components: {
    ElMenu: Menu,
    MenuItemComponent
  },
  computed: {
    ...mapGetters( 'permission', [ 'menuList' ] ),
    ...mapState( 'opration', [ 'closeMenu' ] )
  },
  methods: {
    handleOpen( key, keyPath ) {
      console.log( key, keyPath );
    },
    handleClose( key, keyPath ) {
      console.log( key, keyPath );
    }
  }
};
</script>
<style lang="scss">
.block-menu {
  .menu-box {
    height: 100%;
  }
}
</style>
