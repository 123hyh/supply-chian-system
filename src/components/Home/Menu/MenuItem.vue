<!--
 * @Author: huangyuhui
 * @since: 2020-07-08 14:30:12
 * @LastAuthor: huangyuhui
 * @lastTime: 2020-07-08 17:17:55
 * @message: 
 * @FilePath: \supply-chain-cli\src\components\Home\Menu\MenuItem.vue
-->
<template>
  <Submenu
    v-if="currentMenu.children && currentMenu.children.length" 
    :index="currentMenu.menuCode"
    >
    <template slot="title">
      <i class="el-icon-menu"/>
      <span>{{ currentMenu.menuCnName }}</span>
    </template>
    <menu-item-node
      v-for="item in currentMenu.children"
      :key="item.menuCode"
      :currentMenu="item"
      />
  </Submenu>
  <MenuItem
    v-else
    :index="currentMenu.menuCode"
    >
    <i class="el-icon-menu"/>
    <span slot="title">
      {{ currentMenu.menuCnName }}
    </span>
  </MenuItem>
</template>
<script>
import { MenuItem, Submenu } from 'element-ui';
export default {
  abstract: true,
  name: 'MenuItemNode',
  components: {
    MenuItem,
    Submenu
  },
  props: {
    currentMenu: {
      type: Object,
      required: true
    }
  }
};
</script>
