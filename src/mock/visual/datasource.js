const DATASOURCE = {
  list: [
    {id: 1, title: '冰冷产业排产率', type: 'json', content: ''},
    {id: 2, title: '线体生产数量', type: 'json', content: ''},
    {id: 3, title: 'bom层级关系', type: 'json', content: ''},
    {id: 4, title: '冰冷产业10月排产统计', type: 'json', content: ''},
    {id: 5, title: '测试请求', type: 'http'},
  ],
  detail: {
    1: {
      id: 1,
      type: 'json',
      content: '{"no":"001","name":"宁德时代","value":"58%","pro":1257,"tip":"这是一段文字，好像没有什么作用的文字，一段是什么的文字，反正就是一段文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字"}',
    },
    2: {
      id: 2,
      type: 'json',
      content: '[{"line":"总装线","value":122},{"line":"钣金门","value":59},{"line":"集成箱","value":312},{"line":"把手","value":1026},{"line":"自滑轮","value":92}]'
    },
    3: {
      id: 3,
      type: 'json',
      content: '{"src": "https://www.baidu.com/img/flexible/logo/pc/result.png","title":"一张可爱又迷人的图片","width":"50%"}'
    },
    4: {
      id: 3,
      type: 'json',
      content: '[{"line":"总装线","value":122,"child":{"a":666}},{"line":"钣金门","value":59},{"line":"集成箱","value":312},{"line":"把手","value":1026},{"line":"自滑轮","value":92}]'
    }
  },
  data: {
    1: {
      type: 'json',
      content: {
        "no":"001",
        "name":"宁德时代",
        "value":"58%",
        "pro":1257,
        "tip":"这是一段文字，好像没有什么作用的文字，一段是什么的文字，反正就是一段文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字"
      }
    },
    2: {
      type: 'json',
      content: [
        {"line":"总装线","value":122},
        {"line":"钣金门","value":59},
        {"line":"集成箱","value":312},
        {"line":"把手","value":1026},
        {"line":"自滑轮","value":92}
      ]
    },
    3: {
      type: 'json',
      content: {
        "src": "https://www.baidu.com/img/flexible/logo/pc/result.png",
        "title":"一张可爱又迷人的图片",
        "width":"50%"
      }
    },
    4: {
      type: 'json',
      content: [{"line":"总装线","value":122,"child":{"a":666}},{"line":"钣金门","value":59},{"line":"集成箱","value":312},{"line":"把手","value":1026},{"line":"自滑轮","value":92}]
    }
  },
  query: [
    {
      type: 'json',
      content: {
        "no":"002",
        "name":"北汽蓝谷",
        "value":"87%",
        "pro":666,
        "tip":"阿尔法狐yyds"
      }
    },
    {
      type: 'json',
      content: {
        "no":"003",
        "name":"贵州茅台",
        "value":"99%",
        "pro":1257,
        "tip":"十里飘香，唯有茅王"
      }
    },
    {
      type: 'json',
      content: {
        "no":"004",
        "name":"中芯国际",
        "value":"96%",
        "pro":999,
        "tip":"9nm?7nm? 太low了，我的0.35nm工艺已经量产了"
      }
    },
  ]
}

export default DATASOURCE
