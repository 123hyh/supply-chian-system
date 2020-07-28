/*
 * @Author: your name
 * @Date: 2020-07-07 21:19:52
 * @lastTime: 2020-07-28 09:07:58
 * @LastAuthor: huangyuhui
 * @Description: In User Settings Edit
 * @FilePath: \supply-chain-system\src\utils\index.ts
 */

export function forEachObject (
  source: { [propName: string]: any },
  handler: ( key: string, value: any ) => void
) {
  for ( const key of Object.keys( source ) ) {
    // eslint-disable-next-line no-prototype-builtins
    if ( source.hasOwnProperty( key ) ) {
      handler( key, source[ key ] );
    }
  }
}
