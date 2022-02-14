import Mock from 'mockjs';
import LOGIN from './login';
import REPORT from './report';
import DASHBOARD from './visual/dashboard';
import COMPONENT from './visual/component';
import DATASOURCE from './visual/datasource';

Mock.setup({
  timeout: 700
});

// // 登陆
// Mock.mock('/api/login', 'post', () => {
//   return {
//     code: 200,
//     msg: 'success',
//     data: {
//       ...LOGIN.userInfo
//     }
//   }
// })
// 获取用户信息
Mock.mock('/api/getUserInfo/mock', 'post', () => {
  return {
    code: 200,
    msg: 'success',
    data: {
      ...LOGIN.userInfo
    }
  }
})

// 获取报表列表
Mock.mock('/api/report/list', 'post', d => {
  let body = JSON.parse(d.body), list = [...REPORT.list];
  if(body.factoryNo) {
    list = list.filter(item => item.factoryNo === body.factoryNo)
  }
  if(body.materialCode) {
    list = list.filter(item => item.materialCode.indexOf(body.materialCode) > -1 )
  }

  return {
    code: 200,
    msg: 'success',
    data: {
      records: list,
      current: 1,
      size: 20,
      total: 8
    }
  }
})

// 获取看板列表
Mock.mock('/api/dashboard/list', 'post', () => {
  return {
    code: 200,
    msg: 'success',
    data: {
      records: DASHBOARD.list,
      current: 1,
      size: 20,
      total: 8
    }
  }
})

// 获取组件列表
Mock.mock('/api/component/list', 'post', () => {
  return {
    code: 200,
    msg: 'success',
    data: {
      records: COMPONENT.list,
      current: 1,
      size: 20,
      total: 8
    }
  }
})

// 获取数据源列表
Mock.mock('/api/datasource/list', 'post', () => {
  return {
    code: 200,
    msg: 'success',
    data: {
      records: DATASOURCE.list,
      current: 1,
      size: 20,
      total: 8
    }
  }
})

// 获取面板详情
Mock.mock('/api/dashboard/detail', 'post', d => {
  let body = JSON.parse(d.body);

  return {
    code: 200,
    msg: 'success',
    data: {
      ...DASHBOARD.detail[body.id]
    }
  }
})

// 获取组件详情
Mock.mock('/api/component/detail', 'post', d => {
  let body = JSON.parse(d.body);

  return {
    code: 200,
    msg: 'success',
    data: {
      ...COMPONENT.detail[body.id]
    }
  }
})

// 获取数据源详情
Mock.mock('/api/datasource/detail', 'post', d => {
  let body = JSON.parse(d.body);

  return {
    code: 200,
    msg: 'success',
    data: {
      ...DATASOURCE.detail[body.id]
    }
  }
})

// 获取数据源的 具体数据
Mock.mock('/api/datasource/data', 'post', d => {
  let body = JSON.parse(d.body);
  console.log(body)
  let data = {};
  

  if(body.id === 1 && body.query) {
    if(body.query.type === 'checkBox') {
      data = { ...DATASOURCE.query[0] }
    } else if(body.query.type === 'select') {
      data = { ...DATASOURCE.query[1] }
    } else{
      data = { ...DATASOURCE.query[2] }
    }
  } else {
    data = { ...DATASOURCE.data[body.id] }
  }

  return {
    code: 200,
    msg: 'success',
    data: { ...data }
  }
})