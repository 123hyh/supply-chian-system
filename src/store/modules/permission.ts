/*
 * @Author: huangyuhui
 * @since: 2020-07-08 15:20:01
 * @LastAuthor: huangyuhui
 * @lastTime: 2020-07-08 15:31:43
 * @message:
 * @FilePath: \supply-chain-cli\src\store\modules\permission.ts
 */

type PermissionStore = {
  menuList: any[];
};
import { Module } from 'vuex';

const permission: Module<PermissionStore, any> = {
  namespaced: true,
  state: {
    menuList: [
      {
        menuCode: 'M00',
        menuCnName: '首页',
        parentCode: 'M',
        children: []
      },
      {
        menuCode: 'M01',
        parentCode: 'M',
        menuCnName: '基础资料',
        children: []
      },
      {
        menuCode: 'M02',
        parentCode: 'M',
        menuCnName: '业务管理',
        children: [
          { menuCode: 'M0201', parentCode: 'M02', menuCnName: '客户登记表' }
        ]
      }
    ]
  },
  getters:{
    menuList( state ) {
      return state.menuList;
    }
  }
};
export default permission;
