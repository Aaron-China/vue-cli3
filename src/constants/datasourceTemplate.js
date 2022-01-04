export const DATASOURCE_TEMPLATES = [
  {label: '对象', value: 'object'},
  {label: '数组', value: 'array'},
  {label: '数组对象', value: 'arrayObject'},
]

export const DATASOURCE_TEMPLATE = {
  object: (d) => {
    let keys = [];
    for(let key in d) {
      if(typeof d[key] !== 'object'){
        keys.push({label: key, value: key})
      }
    }
    return keys
  },
  array: () => {
    
  },
  arrayObject: () => {
    
  },
}