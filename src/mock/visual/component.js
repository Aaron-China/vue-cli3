const COMPONENT = {
  list: [
    {id: 1, title: '空调49周排产率', type: 'CusText', datasourceName: '冰冷产业排产率', datasourceId: 1,bind: true},
    {id: 2, title: '洗涤各工厂订单', type: 'CusText', datasourceName: '线体生产数量', datasourceId: 2,bind: true},
    {id: 3, title: '钣金门', type: 'CusImg', datasourceName: 'bom层级关系', datasourceId: 3,bind: true},
    {id: 4, title: '搜索控制器', type: 'CusController', datasourceName: '', datasourceId: '',bind: true},
    {id: 5, title: '选择控制器', type: 'CusController', datasourceName: '', datasourceId: '',bind: true},
    {id: 6, title: '多选控制器', type: 'CusController', datasourceName: '', datasourceId: '',bind: true},
    {id: 7, title: '时间控制器', type: 'CusController', datasourceName: '', datasourceId: '',bind: true},
  ],
  detail: {
    1: {
      id: 1,
      title: '空调49周排产率',
      type: 'CusText',
      datasourceId: 1,
      controller: [4,5,6],
      content: '{"text":"1322321$14323请问请翁$2$3！！！","fontSize":15,"fontWeight":400,"color":"#000000","points":[{"point":"name","fontSize":"18","fontWeight":700,"color":"#0C00FF"},{"point":"value","color":"#00FF1D"},{"point":"tip","color":"#FF0041"}],"template":"object"}'
    },
    2: {
      id: 2,
      title: '洗涤各工厂订单',
      type: 'CusText',
      datasourceId: 2,
      content: '{"text":"我就是一段静态文本！！！","fontSize":"18","fontWeight":400,"color":"#FF1900","points":[]}'
    },
    3: {
      id: 3,
      title: '钣金门',
      type: 'CusImg',
      datasourceId: 3,
      content: '{"src":"","template":"object","srcD":"src","titleD":"title","width":"100","unit":"%"}'
    },
    4: {
      id: 4,
      title: '搜索控制器',
      type: 'CusController',
      datasourceId: '',
      content: '{"type":"input","label":"排产日期","value":"data"}'
    },
    5: {
      id: 5,
      title: '选择控制器',
      type: 'CusController',
      datasourceId: '',
      content: '{"type":"select","label":"工序","value":"type","points":[{"label":"半成品","value":"bcp"},{"label":"总装","value":"zz"},{"label":"前工期","value":"qgq"}]}'
    },
    6: {
      id: 6,
      title: '多选控制器',
      type: 'CusController',
      datasourceId: '',
      content: '{"type":"checkBox","label":"工序","value":"type","points":[{"label":"半成品","value":"bcp"},{"label":"总装","value":"zz"},{"label":"前工期","value":"qgq"}]}'
    },
    7: {
      id: 7,
      title: '时间控制器',
      type: 'CusController',
      datasourceId: '',
      content: '{"type":"rangePicker","label":"排产周期","value":"time","points":[{"label":"半成品","value":"bcp"},{"label":"总装","value":"zz"},{"label":"前工期","value":"qgq"}],"showTime":true,"format":"YYYY-MM-DD HH:mm:ss"}'
    },
  }
}

export default COMPONENT
