/*
 * @Author: huangyuhui
 * @since: 2020-07-08 15:42:12
 * @LastAuthor: huangyuhui
 * @lastTime: 2020-07-08 16:10:27
 * @message: 操作存储数据
 * @FilePath: \supply-chain-cli\src\store\modules\opration.ts
 */

type PermissionStore = {
  /* 是否收起菜单 */
  closeMenu: boolean;
};
import { Module } from 'vuex';

const opration: Module<PermissionStore, any> = {
  namespaced: true,
  state: {
    closeMenu: false
  },
  mutations: {
    /* 设置菜单展开状态 */
    SET_MENU_STATUS( state ) {
      state.closeMenu = !state.closeMenu;
    }
  }
};
export default opration;
