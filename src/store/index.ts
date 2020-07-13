/*
 * @Author: your name
 * @Date: 2020-07-07 21:19:21
 * @lastTime: 2020-07-13 16:40:29
 * @LastAuthor: huangyuhui
 * @Description: In User Settings Edit
 * @FilePath: \supply-chain-system\src\store\index.ts
 */
export declare type AnyObjct = { [propName: string]: any };
import Vue from 'vue';
import Vuex from 'vuex';

import registerVuexHooks from '@/store/hooks.ts';

import user from '@/store/modules/user';
import permission from '@/store/modules/permission';
import opration from '@/store/modules/opration';

Vue.use( Vuex );

const store = new Vuex.Store( {
  modules: {
    user,
    permission,
    opration
  }
} );
export default store;

registerVuexHooks( store );
