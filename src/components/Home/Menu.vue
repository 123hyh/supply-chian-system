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
    <ElMenu
      class="menu-box"
      :style="{ width: closeMenu ? 'auto' : '200px' }"
      :collapse="closeMenu"
      :collapseTransition="false"
      @open="handleOpen"
      @close="handleClose"
      >
      <!-- 递归菜单组件 -->
      <MenuItemComponent
        v-for="item in menuList"
        :key="item.menuCode"
        :currentMenu="item"
        />
    </ElMenu>
  </menu>
</template>
<script>
import { Menu } from 'element-ui';
import MenuItemComponent from '@/components/Home/Menu/MenuItem.vue';
import { mapGetters, mapState } from 'vuex';
export default {
  name: 'MenuComponent',
  components: {
    ElMenu: Menu,
    MenuItemComponent
  },
  computed: {
    ...mapGetters( 'permission', [ 'menuList' ] ),
    ...mapState( 'opration', [ 'closeMenu' ] )
  },
  methods: {
    handleOpen ( key, keyPath ) {
      console.log( key, keyPath );
    },
    handleClose ( key, keyPath ) {
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
