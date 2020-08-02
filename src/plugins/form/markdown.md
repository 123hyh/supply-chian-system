<!--
 * @Author: your name
 * @Date: 2020-08-02 20:02:28
 * @LastEditTime: 2020-08-02 20:38:33
 * @LastEditors: Please set LastEditors
 * @Description: 文档信息
 * @FilePath: /supply-chian-system/src/plugins/form/markdown.md
--> 
# 1.  导入组件

 `import { FormComponent, useForm } from '@/plugins/form/index.js.js`**

***
# 2. props 

 `<FormComponent :form="form" />`

***

# 3. 使用 useForm方法 注册表单

 在 data 或者 computed 中使用

```javascript 
useForm(
 {
   groupOption: { 
     /* 表单分组选项 */ 
   }, 
   config: { 
     /* 表单字段配置 */  
   }
 }
)
```


