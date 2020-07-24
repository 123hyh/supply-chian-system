/*
 * @Author: your name
 * @Date: 2020-07-18 22:08:06
 * @lastTime: 2020-07-20 08:54:36
 * @LastAuthor: huangyuhui
 * @Description: In User Settings Edit
 * @FilePath: \supply-chain-system\src\pligins\loadding\index.js
 */
import './loading.scss';
import Vue from 'vue';
export default function loading ( { el = document.body } ) {
  const state = Vue.observable( {
    visibled: false
  } );
  const Loading = Vue.extend( {
    render ( createElement ) {
      return createElement(
        'div',
        {
          class: 'loading-block',
          style: { 'display': state.visibled ? '' : 'none' }
        },
        [
          createElement(
            'div',
            {
              class: 'loading-box'
            },
            [
              createElement(
                'div',
                {
                  class: 'loading-item-1'
                }
              ),
              createElement(
                'div',
                {
                  class: 'loading-item-2'
                }
              ),
              createElement(
                'div',
                {
                  class: 'loading-item-3'
                }
              )
            ]
          )
        ]
      );
    }
  } );
  el.style.position = 'relative';
  const div = document.createElement( 'div' );
  div.classList.add( 'loading-block' );
  const ld = new Loading();

  return {
    open () {
      if ( ld._isMounted === false ) {
        el.appendChild( div );
        ld.$mount( div );
      } 
      state.visibled = true;
    },
    close () {
      state.visibled = false;
    },
    get isMounted () {
      return ld._isMounted;
    }
  };
}

/**
 * loading 指令
 * @description: 
 * @param {type} 
 * @return: 
 */
export const loadingDirective = ( () => {
  const map = new Map();
  const idAttr = 'data-loading-id';
  return {
    install ( Vue ) {
      Vue.directive(
        'loading',
        {
          bind ( ...args ) {
            const [ el, { value } = {}, vnode, oldVnode ] = args;
            const id = Date.now(); 
            el.setAttribute( idAttr, id );
            map.set( `${id}`, loading( { el } ) );

          },
          update ( ...args ) {
            const [ el, { value } = {}, vnode, oldVnode ] = args;
            const id = el.getAttribute( idAttr );
            if ( id ) {
              const current = map.get( id );
              if ( value ) {
                current.open();
              } else {
                current.close();
              }
            }
          },
          unbind ( el ) {
            const id = el.getAttribute( idAttr );
            map.delete( id );
          }
        }
      );
    }
  };

} )();