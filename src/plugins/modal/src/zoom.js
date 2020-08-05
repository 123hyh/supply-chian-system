/*
 * @Author: your name
 * @Date: 2020-08-05 21:27:13
 * @LastEditTime: 2020-08-05 23:56:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /supply-chian-system/src/plugins/modal/src/zoom.js
 */
import Vue from 'vue';

function isUndef ( params ) {
  return params === undefined;
}

/**
 * 缩放操作
 * @example 
 * useZoom({onTarget: <HTMLElement>,triggerTarget: <HTMLElement>})
 * @param {object} options - 缩放参数
 * @param {object} options.onTarget - 触发事件元素
 * @param {object} options.updateTarget  - 需要缩放变化的元素
 * @returns {object}  
 */

export function useZoom ( options ) {
  const { onTarget, updateTarget } = options ?? {};

  const data = Vue.observable(  { styles: '', max: false, onResize:onResize }  );

  if ( isUndef( onTarget ) || isUndef( updateTarget ) ) { return data; }
  
  function onResize () {
    if ( data.max === false ) {
      data.styles = updateTarget.getAttribute( 'style' );
      data.max = true;
      updateTarget.setAttribute( 'style', 'width:100%; height:100%; transition: all .05s linear; margin: initial' );
    } else {
      data.max = false;
      updateTarget.setAttribute( 'style', data.styles );
    }
  }
  
  onTarget.addEventListener(
    'click',
    onResize,
    false
  );
  
  return data;
}