<!--
 * @Author: huangyuhui
 * @since: Do not edit
 * @LastAuthor: huangyuhui
 * @lastTime: 2020-08-05 16:41:10
 * @message: 
 * @FilePath: \supply-chain-system\src\plugins\modal\markdown.md
-->
## 1. 使用

 - 组件使用:

    ```HTML
    <template>
      <ModalComponent :modal="currentModal">
        <template v-slot:header>
          <h1>头部插槽</h1>
        </template>
        <template v-slot:content>
          <h1>中间插槽</h1>
        </template>
        <template v-slot:footer>
          <h1>底部插槽</h1>
        </template>
      </ModalComponent>
    </template>
    
    <script>

    import { ModalComponent, useModal } from '@/plugins/modal/index.js';

    export default {
      components: {
        ModalComponent
      },
      computed: {
        currentModal: useModal(/* 关闭时销毁模态窗参数 boolean */)
      }
    }
    </script>
    ```

----
## 2. useModal 方法的使用

  - 参数：object

    |  属性  |  类型  |  默认值  | 必填  | 说明  |
    | ------------ | ------------ | ------------ | ------------ | ------------ |
    | closeReset  |  boolean  |  false  |  否  |  该参数表示在关闭模态窗时销毁模态窗内容  |

  - 返回值： object  

    |  属性  |  类型  |  说明
    | ------------ | ------------ | ------------ |
    | closeModal  |  function  |  关闭Modal方法  |
    | openModal  |  function  |  打开Modal方法  |
    
    - demo:

      ```HTML
      <template>
        <div>
          <ModalComponent :modal="currentModal"></ModalComponent>
          <div>
          <button @click="close">打开Modal</button>
          <button @click="open">关闭Modal</button>
          </div>
        </div>
      </template>
      <script>
      import { ModalComponent, useModal } from '@/plugins/modal/index.js';
      export default {
        components: {
          ModalComponent
        },
        computed: {
          currentModal: useModal(/* 关闭时销毁模态窗参数 boolean */)
        },
        methods:{
          close(){
            this.currentModal.closeModal(/* 传入 true 时 会销毁模态窗内的组件 */)
          },
          open(){
            this.currentModal.openModal()
          }
        }
      }
      </script>
      ```
---
## 2. props 

  - props参数

    |  属性  |  类型  |  默认值  | 必填  | 说明  |
    | ------------ | ------------ | ------------ | ------------ | ------------ |
    | modal  |  object  |   |  否  |  调用 useModal方法返回的值  |
----
## 3. slot

  - slot插槽

    |  名称  |  插槽说明  | 
    | ------------ | ------------ |
    | header  |  modal 头部  | 
    | content  |  modal 中间  | 
    | footer  |  modal 底部  | 


