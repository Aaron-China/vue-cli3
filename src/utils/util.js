// 遍历路由，获取左侧主菜单, 精简字段，并按照权限过滤
export const filterMenu = (l, p) => {
  let arr = [];
  for(let i = 0; i < l.length; i++) {
    // 校验权限,权限存储底层路由即可，父级菜单自动通过
    let able = p.some(item => item.path.indexOf(l[i].path) === 0)
    if (!l[i].hidden && able) {
      let obj = {...l[i]};
      delete obj.component
      if (l[i].children && l[i].children.length) {
        obj.children = filterMenu(l[i].children, p)
      }
      arr.push(obj)
    }
  }
  return arr
}

// 根据当前URL，获取menu需要的激活菜单
export const getMenuKeys = (l, t) => {
  // 递归无法终止，用str接收数据
  let activeKeys = '', activeKey = '',  str = '';
  for(let i = 0; i < l.length; i++) {
    str = '';
    // 找到了
    if (l[i].path === t) {
      activeKeys = l[i].name;
      activeKey = l[i].name;
      break;
    } else { // 没找到，继续遍历深层
      if (l[i].children && l[i].children.length) {
        str = l[i].name;
        mapMenu(l[i].children, t)
      }
    }
  }
  function mapMenu(l1, t1) {
    for(let i = 0; i < l1.length; i++) {
      if (l1[i].path === t1) {
        activeKeys = `${str}-${l1[i].name}`;
        activeKey = l1[i].name;
        break;
      } else {
        if (l1[i].children && l1[i].children.length) {
          str = `${str}-${l1[i].name}`;
          mapMenu(l1[i].children, t);
        }
      }
    }
  }

  let res = {
    activeKeys,
    activeKey: activeKey
  };

  // 释放闭包锁定的变量
  activeKeys = null;
  activeKey = null;
  str = null;
  return res
}


// url传参，处理参数
export function makeQuery (obj = {}) {
  let arr = [], str = '';
  for (let key in obj) {
      if (obj[key] || obj[key] === 0 || obj[key] === false) {
          arr.push(`${key}=${obj[key]}`)
      }
  }
  str = arr.join('&')
  return str ? `?${str}` : ''
}

// 表单自定义校验，校验长度
export function checklength(_, value) {
  if (value) {
    const arr = value.split(',')
    if (arr.length > 500) {
      return Promise.reject(new Error('最大支持500条数据'));
    } else {
      return Promise.resolve();
    }
  } else {
    return Promise.resolve();
  }
}
// 表单自定义校验，校验重复性
export function checkRepeat (_, value) {
  if (value) {
    const arr = value.split(',')
    if ((new Set(arr)).size != arr.length) {
      return Promise.reject(new Error('存在重复信息'));
    } else {
      return Promise.resolve();
    }
  } else {
    return Promise.resolve();
  }
}

// 获取可视化组件数据
// d 数据源的详情;
export const getCompData = (d) => {
  let data = [];
  try {
    // json是静态数据，直接解析即可
    if(d.type === 'json') {
      data = d.content;
    } else if(d.type === 'http') {
      // http  这里不发请求，服务端发请求，避免跨域问题
      // 这里只是对返回数据做一些约定好的数据处理
      data = d.content;
    } else {
      console.log(`${d.type} 不是系统内置数据源，无法识别！`)
    }
  } catch (error) {
    console.log(error)
  }
  return data
}