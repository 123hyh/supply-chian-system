/*
 * @Author: your name
 * @Date: 2020-08-05 23:57:09
 * @LastEditTime: 2020-08-06 00:10:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /supply-chian-system/src/plugins/modal/src/zoom.d.ts
 */
declare let useZoom: (
  { onTarget: HTMLElement, updateTarget: HTMLElement }
) => { styles: string, max: boolean, onResize: () => void };
export { useZoom };