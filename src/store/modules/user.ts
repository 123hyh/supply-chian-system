/*
 * @Author: your name
 * @Date: 2020-07-07 22:16:59
 * @lastTime: 2020-07-08 15:20:58
 * @LastAuthor: huangyuhui
 * @Description: In User Settings Edit
 * @FilePath: \supply-chain-cli\src\store\modules\user.ts
 */
import { AnyObjct } from '../index';
type UserStore = {
  userInfo: AnyObjct;
};
import { Module } from 'vuex';
const user: Module<UserStore, any> = {
  namespaced: true,
  state: {
    userInfo: {}
  }
};
export default user;
