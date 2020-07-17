<!--
 * @Author: huangyuhui
 * @since: 2020-07-17 09:09:28
 * @LastAuthor: huangyuhui
 * @lastTime: 2020-07-17 10:33:22
 * @message: 
 * @FilePath: \supply-chain-system\src\components\Home\Nav.vue
-->
<template>
  <div class="nav-box">
    <div class="block-nav">
      <ul class="scroll-list">
        <li
          v-for="item in list"
          :key="item.path"
          class="list-item"
          >
          {{ item.title }}
        </li>
      </ul>
      <Dropdown>
        <ButtonComponent
          size="small"
          type="plain"
          >
          <i class="el-icon-arrow-down el-icon--right"/>
        </ButtonComponent>
        <DropdownMenu
          slot="dropdown"
          >
          <DropdownItem>
            关闭其它
          </DropdownItem>
          <DropdownItem divided>
            关闭全部
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { Dropdown, DropdownMenu, DropdownItem, Button } from 'element-ui';
export default {
  name: 'NavComponent',
  components: {
    Dropdown,
    DropdownMenu,
    DropdownItem,
    ButtonComponent: Button
  },
  data () {
    return {
      list: [
        { title: '首页', path: '/' },
        { title: '主控台', path: '/M00' }
      ]
    };
  },
  computed: {
    ...mapState( 'opration', [ 'closeMenu' ] )
  }
};
</script>
<style lang="scss">
.nav-box {
  width: 100%;
  padding: 5px 10px;
  height: 35px;
  box-sizing: border-box;
  .close-menu {
    width: calc(100% - 70px);
  }
  .stretch-menu {
    width: calc(100% - 200px);
  }
  .block-nav {
    display: flex;
    .el-dropdown {
      .el-icon--right {
        margin-left: inherit;
      }
    }
    .el-button:focus,
    .el-button:hover {
    /*   color: initial;
      border-color: initial;
      background-color: initial; */
    }
    .scroll-list {
      all: unset;
      display: flex;
      font-size: 14px;
      list-style: none;
      flex-basis: calc(100% - 50px);
      .list-item {
        color: #808695;
        padding: 5px 16px 4px;
        margin-right: 6px;
        background-color: #fff;
        &:hover {
          color: #2d8cf0;
        }
      }
    }
  }
}
</style>
