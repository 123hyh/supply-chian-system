<!--
 * @Author: your name
 * @Date: 2020-08-02 20:02:28
 * @LastEditTime: 2020-08-02 22:30:29
 * @LastEditors: Please set LastEditors
 * @Description: 文档信息
 * @FilePath: /supply-chian-system/src/plugins/form/markdown.md
--> 
# 1.  导入组件

 `import { FormComponent, useForm } from '@/plugins/form/index.js.js`

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
# 4. useForm 返回值表单操作方法

* 校验表单方法:  参数类型: function , 返回值: Boolean, 表单通过校验后会调用回调
```javascript 
this.form.onFinish(
  formData => {
   /* 逻辑 */
  }
)
```
* 设置表单字段的 value:

  |  参数  |  类型  |  描述  |  返回值 | 必传 |  备注  |
  | ------------ | ------------ | ------------ | ------------ | ------------ | ------------ |
  | values | object |  值集合  | -  | 是 | 可设置多个|

```javascript
this.form.setValues( 
  { 
    [filed1]: value1,
    [filed2]: value2,
    ... 
  } 
)
```
* 重置表单字段值及校验信息

  |  参数  |  类型  |  描述  |  返回值  | 必传 |  备注  |
  | ------------ | ------------ | ------------ | ------------ | ------------ |------------ |
  | fileds | Array<string> |  需要设置的表单值  | -  |- | 不传该参数默认重置所有表单字段 | 

```javascript
this.form.onResetFields(
 ['filed1','filed2',...]
)
```

* 清除表单校验

  |  参数  |  类型  |  描述  |  返回值  | 必传 |  备注  |
  | ------------ | ------------ | ------------ | ------------ | ------------ |------------ |
  | fileds | Array<string> |  需要清空的字段集合  | -  |- | 不传该参数则清空所以表单校验信息 | 

```javascript
this.form.onClearValidate(
 ['filed1','filed2',...]
)
```

* 注册 字段值change事件

  |  参数  |  类型  |  描述  |  返回值  | 必传 |  备注  |
  | ------------ | ------------ | ------------ | ------------ | ------------ |------------ |
  | filed | string |  需要监听的字段  | -  | 是 |  | 
  | handler | function |  监听事件  | -  | 是 |  | 

```javascript
const onwatch = this.form.registerChange(
 filed,
 (value, oldValue) => {
  
 },
 true
)
// 返回 onwatch, 调用 可取消监听
```

* 设置 | 更新 表单字段配置

  |  参数  |  类型  |  描述  |  返回值  | 必传 |  备注  |
  | ------------ | ------------ | ------------ | ------------ | ------------ |------------ |
  | filed | string |  需要设置的表单字段  | -  | 是 |  | 
  | config | object |  配置  | -  | 是 |  |

```javascript
this.form.setFiledConfig(
 filed,
 {/* 表单配置 */}
)
```


