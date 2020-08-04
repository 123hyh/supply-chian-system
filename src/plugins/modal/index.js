
import '@/plugins/modal/style/modal.scss';
import Vue from 'vue';

function mousedown ( MouseEvent, currentBarName ) {
  const { target } = MouseEvent;

  /* 父节点 */
  const pNode = target.parentNode.parentNode,
    { offsetLeft, offsetTop } = pNode,
    innerWidth = window.innerWidth,
    innerHeight = window.innerHeight;


  // eslint-disable-next-line consistent-return
  function mousemove ( bodyMouseEvent ) {

    /* Y 轴去 client 避免 浏览器顶部tab栏高度 */
    const { screenX, clientY } = bodyMouseEvent;

    /* 计算 盒子的 宽高 */
    const width = screenX - offsetLeft;
    const height = clientY - offsetTop;
    const elemStyle = pNode.style;

    if (
      screenX >= innerWidth - 3.5 && currentBarName === 'right' ||
      clientY >= innerHeight - 3.5 && currentBarName === 'bottom' ||
      (
        currentBarName === 'bottomRight' &&
        ( screenX >= innerWidth - 3.5 && clientY >= innerHeight - 3.5 )
      )
    ) {
      return mouseup.call( this );
    }

    /* 设置盒子几何信息 */
    switch ( currentBarName ) {
    case 'right' :
      elemStyle.width = width + 'px';
      break;
    case 'bottom' :
      elemStyle.height = height + 'px';
      break;
    case 'bottomRight' :
      elemStyle.width = width + 'px';
      elemStyle.height = height + 'px';
      break;
    default :
      break;
    }

    elemStyle.top = offsetTop + 'px';
    elemStyle.left = offsetLeft + 'px';
    elemStyle.margin = 'initial';
  }


  function mouseup () {

    /* 取消事件 */
    document.body.removeEventListener( 'mousemove', mousemove, false );
    this.removeEventListener( 'mouseup', mouseup, false );
  }

  document.body.addEventListener( 'mousemove', mousemove, false );
  this.addEventListener( 'mouseup', mouseup, false );
}

/**
 * 头部拖动事件
 * @param {*} MouseEvent 
 */
function handlerHeaderMousedown ( MouseEvent ) {

  /* 处理点击到关闭按钮bug */
  if ( MouseEvent.target.classList.contains( 'el-icon-close' ) ) {
    return;
  }

  let { target, offsetX, offsetY } = MouseEvent;

  /* 查找 header 元素 */
  function searchHeader () {
    if ( target.classList.contains( 'modal-header' ) === false ) {
      target = target.parentNode;
      searchHeader();
    }
  }
  searchHeader();

  const pNode = target.parentNode;

  function mousemove ( bodyMouseEvent ) {
    const { screenX, clientY } = bodyMouseEvent;
    const left = screenX - offsetX;
    const top = clientY - offsetY;
    pNode.style.left = ( left < 0 ? 0 : left ) + 'px';
    pNode.style.top = ( top < 0 ? 0 : top ) + 'px';
    pNode.style.margin = 'initial';
  }

  function mouseup () {
    document.body.removeEventListener( 'mousemove', mousemove, false );
    this.removeEventListener( 'mouseup', mouseup, false );
  }
  document.body.addEventListener( 'mousemove', mousemove, false );
  this.addEventListener( 'mouseup', mouseup, false );
}

/* 模态窗 ID */
let modalId = 0;

/* 添加层叠 */
let Z_INDEX = 2000;

/* 缓存模态窗实例 */
const cacheModal = new Map();

export const Modal =  {

  props: {

    /* 模态窗实例 */
    modal:{
      type: Object,
      default: () => ( {} )
    },

    /* 模态窗宽度 */

    width: {
      type: String,
      default: '60%'
    },

    /* 模态窗高度 */
    height: {
      type: String,
      default: '50%'
    },

    /* 模态窗标题 */
    title: {
      type: String,
      default: ''
    },

    /* 层叠顺序 */
    zIndex: {
      type: Number,
      default: () => Z_INDEX++
    }
  },
  
  beforeCreate () {
    const { _modalId } =  this.$options.propsData.modal;
    cacheModal.set(
      _modalId, 
      { instance: this, data: Vue.observable( { visible: false } ) } 
    );
  },

  render ( h ) {

    const { _modalId } =  this.$options.propsData.modal;
    const currentModalData = cacheModal.get( _modalId )?.data;

    /* 插槽 */
    const { header, content, footer } = this.$slots;

    return h(
      'div',
      {
        class: [ 'modal-box' ],
        style: {
          'z-index': this.zIndex,
          'display': this.value ? 'block' : 'none'
        },
        key: `modal-box-${this.zIndex}`
      },
      [
        h(
          'div',
          {
            class: [ 'content', {
              'show-content': currentModalData.visible ? true : false
            } ],

            style: {
              width: this.width,
              height: this.height
            },

            directives: [
              { name: 'resize' }
            ]
          },
          [
            h(
              'div',
              {
                class: [
                  'modal-header'
                ],
                attrs: {
                  title: '长按可拖动'
                }
              },
              [
                header ? header : '',
                h(
                  'div',
                  {
                    class: [ 'modal-opration' ]
                  },
                  [
                    h(
                      'i',
                      {
                        on: {
                          click: ( e ) => {

                            /* 关闭 模态窗 */

                            e.stopPropagation();
                            currentModalData.visible = false;

                          }
                        },
                        class: [ 'el-icon-close' ]
                      }
                    )
                  ]
                )

              ]
            ),
            h(
              'div',
              {
                class: [ 'modal-main' ]
              },
              [
                content
              ]
            ),
            footer && h(
              'div',
              {
                class: [ 'modal-footer' ]
              },
              footer
            )
          ].filter( Boolean )
        )
      ]
    );
  },
  directives: {
    get resize () {
      return ( () => {
        const ResizeBox = Vue.extend( {
          render ( h ) {
            return h(
              'div',
              {
                class: [ 'resize' ],
                key: `resize-${Z_INDEX - 1}`
              },
              [
                h(
                  'div',
                  {
                    class: [ 'right-resize' ],
                    ref: '_rightResizeBar'
                  }
                ),
                h(
                  'div',
                  {
                    class: [ 'bottom-right-resize' ],
                    ref: '_bottomRightResizeBar'
                  }
                ),
                h(
                  'div',
                  {
                    class: [ 'bottom-resize' ],
                    ref: '_bottomResizeBar'
                  }
                )
              ]
            );
          }
        } );
        const resizeElem = new ResizeBox();

        return {
          bind ( el ) {

            // 挂载到组件上
            const box = document.createElement( 'div' );
            const headerElem = el.children[ 0 ].classList.contains( 'modal-header' ) && el.children[ 0 ];
            el.appendChild( box );
            resizeElem.$mount( box );

            const { _rightResizeBar, _bottomRightResizeBar, _bottomResizeBar } = resizeElem.$refs;

            /* header添加移动事件 */
            headerElem.addEventListener(
              'mousedown',
              function () {
                handlerHeaderMousedown.call( this, ...arguments, 'header' );
              },
              false
            );

            /* 右侧 */
            _rightResizeBar.addEventListener(
              'mousedown',
              function () {
                mousedown.call( this, ...arguments, 'right' );
              },
              false
            );

            /* 底部 */
            _bottomResizeBar.addEventListener(
              'mousedown',
              function () {
                mousedown.call( this, ...arguments, 'bottom' );
              },
              false
            );

            /* 右底 */
            _bottomRightResizeBar.addEventListener(
              'mousedown',
              function () {
                mousedown.call( this, ...arguments, 'bottomRight' );
              },
              false
            );
          }
        };
      } )();
    }
  },

 
  methods: {

    /**
   * 关闭模态窗
   * @description: 
   * @param {type} 
   * @return {type} 
   */
    handlerCloseModal () {

    }
  }
};
export function useModal () {
  const currentId = modalId++;
  let currentModalData;
  return {
    get _modalId () {
      return currentId;
    },
    closeModal () {
      
    },
    openModal () {
      if ( currentModalData ) {
        currentModalData.visible = true;
      } else {
        currentModalData = cacheModal.get( currentId )?.data;
        currentModalData.visible = true;
      }
    }
  };
}