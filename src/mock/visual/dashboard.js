const DASHBOARD = {
  list: [
    {id: 1, name: '测试面板1', device: '电脑', open: '公开', data: 'json'},
    {id: 2, name: '测试面板2', device: '手机', open: '不公开', data: 'json'},
    {id: 3, name: '测试面板3', device: '电脑', open: '不公开', data: 'json'},
  ],
  detail: {
    1: {
      id: 1,
      theme: 'dark',
      scaleX: 1,
      scaleY: 1,
      refresh: 10,
      width: '1920px',
      height: '1080px',
      components: `[
        {"id":1,"type":"CusText","title":"空调49周排产率","datasourceId": 1,"width":328,"height":174,"top":164,"left":54,"container":"blue","zIndex":1,"controller": [4,5,6],
          "content":{"text":"1322321$14323请问请翁$2$3！！！","fontSize":15,"fontWeight":400,"color":"#000000","points":[{"point":"name","fontSize":"18","fontWeight":700,"color":"#0C00FF"},{"point":"value","color":"#00FF1D"},{"point":"tip","color":"#FF0041"}],"template":"object"}},
        {"id":2,"type":"CusText","title":"洗涤各工厂订单","width":326,"height":175,"top":167,"left":675,"container":"blue","zIndex":2,
          "content":{"text":"我就是一段静态文本！！！","fontSize":"18","fontWeight":400,"color":"#FF1900","points":[]}},
        {"id":3,"type":"CusImg","title":"钣金门","datasourceId": 3,"width":338,"height":170,"top":383,"left":364,"container":"green","zIndex":3,
          "content":{"src":"https://www.baidu.com/img/flexible/logo/pc/result.png","template":"object","srcD":"src","titleD":"title","width":"100","unit":"%"}},
        {"id":4,"type":"CusController","title":"搜索控制器","width":230,"height":72,"top":5,"left":51,"container":"blue","zIndex":2,
          "content":{"type":"input","label":"排产日期","value":"data"}},
        {"id":5,"type":"CusController","title":"选择控制器","width":151,"height":67,"top":5,"left":297,"container":"blue","zIndex":2,
          "content":{"type":"select","label":"工序","value":"type","points":[{"label":"半成品","value":"bcp"},{"label":"总装","value":"zz"},{"label":"前工期","value":"qgq"}]}},
        {"id":6,"type":"CusController","title":"多选控制器","width":323,"height":69,"top":5,"left":478,"container":"blue","zIndex":2,
          "content":{"type":"checkBox","label":"工序","value":"type","points":[{"label":"半成品","value":"bcp"},{"label":"总装","value":"zz"},{"label":"前工期","value":"qgq"}]}},
        {"id":7,"type":"CusController","title":"时间控制器","width":234,"height":76,"top":5,"left":832,"container":"blue","zIndex":2,
          "content":{"type":"rangePicker","label":"排产周期","value":"time","points":[{"label":"半成品","value":"bcp"},{"label":"总装","value":"zz"},{"label":"前工期","value":"qgq"}],"showTime":true,"format":"YYYY-MM-DD HH:mm:ss"}}]`
    },
    2: {
      id: 2,
      type: 'text',
    },
    3: {
      id: 3,
      type: 'text',
    }
  }
}

export default DASHBOARD
