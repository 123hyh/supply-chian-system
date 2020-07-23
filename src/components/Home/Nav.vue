<!--
 * @Author: huangyuhui
 * @since: 2020-07-17 09:09:28
 * @LastAuthor: huangyuhui
 * @lastTime: 2020-07-23 18:14:46
 * @message: 
 * @FilePath: \supply-chain-system\src\components\Home\Nav.vue
-->
<template>
  <div class="nav-box">
    <div class="block-nav">
      <ul class="scroll-list">
        <li
          v-for="item in list"
          :key="item.fullPath"
          class="list-item"
          >
          {{ item.meta.title }}
          <!-- 首页不可关闭 -->
          <i
            v-if="!/^\/(home|'')/.test(item.fullPath)"
            class="el-icon-close"
            @click.stop="() => handlerCloseTag(item)"
            />
        </li>
      </ul>
      <Dropdown trigger="click">
        <ButtonComponent
          size="mini"
          type="plain"
          >
          <i class="el-icon-arrow-down el-icon--right"/>
        </ButtonComponent>
        <DropdownMenu slot="dropdown">
          <DropdownItem>
            关闭其它
          </DropdownItem>
          <DropdownItem>
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

      /* 页签数据 */
      list: [
        { fullPath: '/test1', meta: { title: '测试1' } },
        { fullPath: '/test2', meta: { title: '测试2' } }
      ]
    };
  },
  computed: {
    ...mapState( 'opration', [ 'closeMenu' ] ),

    /* paths 集合 */
    currentPaths () {
      return this.list.reduce( ( prev, cur ) => {
        prev[ cur.fullPath ] = true;
        return prev;
      }, {} );
    }
  },
  created () {
    this.$watch( '$route', {
      handler: this.handlerList,
      deep: true,
      immediate: true
    } );
  },

  methods: {
    handlerList ( currentRoute = {} ) {
      const { fullPath, meta = {} } = currentRoute;
      if (
        /^\/refresh/.test( fullPath ) ||
        meta.title === undefined ||
        // eslint-disable-next-line no-prototype-builtins
        this.currentPaths.hasOwnProperty( fullPath )
      ) {
        return;
      }
      this.list.push( currentRoute );
    },

    /**
     * 关闭页签
     * @description:
     * @param {type}
     * @return:
     */
    handlerCloseTag ( current = {} ) {
      const { fullPath } = current;
      const index = this.list.findIndex( item => item.fullPath === fullPath );
      if ( ~index ) {
        this.$delete( this.list, index );
      }
    }
  }
};
</script>
<style lang="scss">
.nav-box {
  $base_color: #1890ff;
  width: 100%;
  padding: 5px 10px;
  height: 40px;
  background-color: #fff;
  border-top: 1px solid #f0f0f0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
    .scroll-list {
      all: unset;
      display: flex;
      font-size: 14px;
      list-style: none;
      flex-basis: calc(100% - 50px);
      .list-item {
        color: #606266;
        border: 1px solid #f0f0f0;
        box-sizing: border-box;
        padding: 5px 20px 4px;
        margin-right: 6px;
        background-color: #fff;
        position: relative;
        transition: all .5s linear;
        &:hover {
          color: $base_color;
          .el-icon-close {
            color: $base_color;
            display: block;
            position: absolute;
            font-size: 12px;
            top: 50%;
            right: 0;
            transform: translateY(-50%);
            &:hover {
              font-display: 14px;
              cursor: pointer;
            }
          }
        }
        .el-icon-close {
          display: none;
        }
      }
    }
  }
}
</style>
