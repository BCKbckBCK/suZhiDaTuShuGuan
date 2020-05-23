define({ "api": [
  {
    "type": "post",
    "url": "/users/add",
    "title": "添加（注册）用户",
    "version": "0.1.0",
    "name": "GetUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>用户账号</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>用户密码</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>返回信息.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>返回码.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"data\": \"添加成功\",\n  \"code\": \"200\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The id of the User was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n  \"data\": \"用户名已经存在\",\n  \"code\": \"400\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/users.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/users/add"
      }
    ]
  },
  {
    "type": "get",
    "url": "/users",
    "title": "用户列表",
    "version": "0.1.0",
    "name": "UserList",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>返回信息.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>返回码.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n \"data\": [\n      {\n         \"id\": 1,\n         \"username\": \"aaa\",//用户名\n         \"enable\": 1,\n         \"created_at\": \"2019-07-31T07:40:00.000Z\"\n     },\n     {\n         \"id\": 2,\n         \"username\": \"bbb\",\n         \"enable\": 1,\n         \"created_at\": \"2019-07-31T07:49:41.000Z\"\n     }\n ],\n \"code\": 200\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The id of the User was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n  \"data\": \"用户名已经存在\",\n  \"code\": \"400\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/users.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/users"
      }
    ]
  },
  {
    "type": "post",
    "url": "/users/delete",
    "title": "删除用户",
    "version": "0.1.0",
    "name": "deleteUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_id",
            "description": "<p>用户id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>返回信息.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>返回码.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"data\": \"删除成功\",\n  \"code\": \"200\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/users.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/users/delete"
      }
    ]
  },
  {
    "type": "post",
    "url": "/users/login",
    "title": "登录",
    "version": "0.1.0",
    "name": "login",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>用户名</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>返回信息.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>返回码.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"data\": {\n      \"id\": 10,\n      \"username\": \"lei\",\n      \"enable\": 1,\n      \"created_at\": \"2019-08-13T01:41:18.000Z\",\n      \"deleted_at\": null\n  },\n  \"code\": 200\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/users.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/users/login"
      }
    ]
  },
  {
    "type": "get",
    "url": "/users/logout",
    "title": "退出登录",
    "version": "0.1.0",
    "name": "logout",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>返回信息.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>返回码.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"data\": \"退出成功\",\n  \"code\": 200\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/users.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/users/logout"
      }
    ]
  },
  {
    "type": "post",
    "url": "/users/reset_password",
    "title": "重置密码",
    "version": "0.1.0",
    "name": "resetPassword",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_id",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>用户名</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>返回信息.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>返回码.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"data\": \"设置成功\",\n  \"code\": 200\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/users.js",
    "groupTitle": "User",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/users/reset_password"
      }
    ]
  },
  {
    "type": "get",
    "url": "/about-library",
    "title": "本馆风采展示",
    "version": "0.1.0",
    "name": "aboutLibrary",
    "group": "aboutLibrary",
    "description": "<p>不需要传参数，后台设置显示方式</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>返回信息.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>返回码.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"data\": {\n      \"items\": [ //时间分段的借阅量\n          {\n              \"count\": 3982,\n              \"time_type\": \"day\",\n              \"time_value\": 20190508\n          },\n          {\n              \"count\": 9341,\n              \"time_type\": \"day\",\n              \"time_value\": 20190513\n          }\n      ],\n      \"total\": {\n          \"total\": 28648 //总借阅量\n      }\n  },\n  \"code\": 200\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/aboutLibrary.js",
    "groupTitle": "aboutLibrary",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/about-library"
      }
    ]
  },
  {
    "type": "get",
    "url": "/about-library/all",
    "title": "所有未删除的数据（后台）",
    "version": "0.1.0",
    "name": "aboutLibraryAll",
    "group": "aboutLibrary",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "page",
            "defaultValue": "1",
            "description": "<p>第几页</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "page_size",
            "defaultValue": "10",
            "description": "<p>每页显示多少</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>返回信息.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>返回码.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"data\": {\n      \"items\": [ //时间分段的借阅量\n          {\n              \"count\": 3982,\n              \"time_type\": \"day\",\n              \"time_value\": 20190508\n          },\n          {\n              \"count\": 9341,\n              \"time_type\": \"day\",\n              \"time_value\": 20190513\n          }\n      ],\n      \"total\": {\n          \"total\": 28648 //总借阅量\n      }\n  },\n  \"code\": 200\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/aboutLibrary.js",
    "groupTitle": "aboutLibrary",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/about-library/all"
      }
    ]
  },
  {
    "type": "post",
    "url": "/about-library/delete-resource",
    "title": "本馆风采---删除资源",
    "version": "0.1.0",
    "name": "deleteResource",
    "group": "aboutLibrary",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "resource_id",
            "description": "<p>资源id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>返回信息.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>返回码.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"data\": \"删除成功\",\n  \"code\": \"200\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/aboutLibrary.js",
    "groupTitle": "aboutLibrary",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/about-library/delete-resource"
      }
    ]
  },
  {
    "type": "post",
    "url": "/about-library/post-resource",
    "title": "本馆风采---上传展示资源",
    "version": "0.1.0",
    "name": "postResource",
    "group": "aboutLibrary",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "resource_type",
            "description": "<p>资源类型(picture-图片,video-视频,live-url-直播链接)</p>"
          },
          {
            "group": "Parameter",
            "type": "File",
            "optional": true,
            "field": "resource",
            "description": "<p>资源--&lt;input type=&quot;file&quot; name=&quot;resource&quot; /&gt;(和资源URL二选一)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "resource_url",
            "description": "<p>资源url(和资源二选一)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>返回信息.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>返回码.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"data\": \"上传成功\",\n  \"code\": \"200\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/aboutLibrary.js",
    "groupTitle": "aboutLibrary",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/about-library/post-resource"
      }
    ]
  },
  {
    "type": "post",
    "url": "/about-library/set-resource",
    "title": "本馆风采---设置资源是否显示",
    "version": "0.1.0",
    "name": "setResource",
    "group": "aboutLibrary",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "resource_id",
            "description": "<p>资源id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "enable",
            "description": "<p>0不显示，1显示</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>返回信息.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>返回码.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"data\": \"设置成功\",\n  \"code\": \"200\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/aboutLibrary.js",
    "groupTitle": "aboutLibrary",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/about-library/set-resource"
      }
    ]
  },
  {
    "type": "post",
    "url": "/about-library/update-resource",
    "title": "本馆风采---编辑资源",
    "version": "0.1.0",
    "name": "updateResource",
    "group": "aboutLibrary",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "resource_id",
            "description": "<p>资源id</p>"
          },
          {
            "group": "Parameter",
            "type": "File",
            "optional": true,
            "field": "resource",
            "description": "<p>资源--&lt;input type=&quot;file&quot; name=&quot;resource&quot;/&gt;(和资源URL二选一)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "resource_url",
            "description": "<p>资源url(和资源二选一)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>返回信息.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>返回码.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"data\": \"编辑成功\",\n  \"code\": \"200\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/aboutLibrary.js",
    "groupTitle": "aboutLibrary",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/about-library/update-resource"
      }
    ]
  },
  {
    "type": "get",
    "url": "/borrowing-count",
    "title": "本（日/星期/月/季/年）借阅量统计",
    "version": "0.1.0",
    "name": "borrowingCount",
    "group": "borrowingCount",
    "description": "<p>不需要传参数，后台设置显示方式</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>返回信息.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>返回码.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"data\": {\n      \"items\": [ //时间分段的借阅量\n          {\n              \"count\": 3982,\n              \"time_type\": \"day\",\n              \"time_value\": 20190508\n          },\n          {\n              \"count\": 9341,\n              \"time_type\": \"day\",\n              \"time_value\": 20190513\n          }\n      ],\n      \"total\": {\n          \"total\": 28648 //总借阅量\n      }\n  },\n  \"code\": 200\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/borrowingCount.js",
    "groupTitle": "borrowingCount",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/borrowing-count"
      }
    ]
  },
  {
    "type": "post",
    "url": "/borrowing-count/set-type",
    "title": "图书借阅量统计--展示类型选择",
    "version": "0.1.0",
    "name": "borrowingCountSetType",
    "group": "borrowingCount",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "time_type",
            "description": "<p>时间类型(hour,day,week,month,year,customize-自定义)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "time_value",
            "description": "<p>时间区间值（如2019-07-26 08:36:12@2019-08-03 15:50:56）</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>返回信息.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>返回码.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"data\": \"设置成功\",\n  \"code\": \"200\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/borrowingCount.js",
    "groupTitle": "borrowingCount",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/borrowing-count/set-type"
      }
    ]
  },
  {
    "type": "post",
    "url": "/borrowing-count/upload",
    "title": "图书借阅量统计--上传（后台）",
    "version": "0.1.0",
    "name": "borrowingCountUpload",
    "group": "borrowingCount",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "time_value",
            "description": "<p>时间值（如2019-07-26 08:36:12）</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "borrow_count",
            "description": "<p>借阅量</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>返回信息.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>返回码.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"data\": \"成功\",\n  \"code\": \"200\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/borrowingCount.js",
    "groupTitle": "borrowingCount",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/borrowing-count/upload"
      }
    ]
  },
  {
    "type": "get",
    "url": "/borrowing-list",
    "title": "图书借阅排行榜",
    "version": "0.1.0",
    "name": "borrowingList",
    "group": "borrowingList",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "show_type",
            "description": "<p>时间类型(hour,day,week-周,month-月,season,year-年,customize)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>返回信息.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>返回码.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   {\n    \"data\": [\n     {\n         \"book_name\": \"nodeJS从入门到精通\",\n         \"book_borrow_count\": 236 //借阅量\n     },\n     {\n         \"book_name\": \"PHP从入门到精通\",\n         \"book_borrow_count\": 5534\n     }\n ],\n \"code\": 200\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/borrowingList.js",
    "groupTitle": "borrowingList",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/borrowing-list"
      }
    ]
  },
  {
    "type": "post",
    "url": "/borrowing-list/set-show-count",
    "title": "图书借阅排行榜--显示数据设置",
    "version": "0.1.0",
    "name": "borrowingListSetShowCount",
    "group": "borrowingList",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "display_count",
            "description": "<p>显示数量</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>返回信息.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>返回码.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"data\": \"设置成功\",\n  \"code\": \"200\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/borrowingList.js",
    "groupTitle": "borrowingList",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/borrowing-list/set-show-count"
      }
    ]
  },
  {
    "type": "post",
    "url": "/borrowing-list/upload",
    "title": "图书借阅排行榜--上传图书借排行榜情况【后台】",
    "version": "0.1.0",
    "name": "borrowingListUpload",
    "group": "borrowingList",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "book_name",
            "description": "<p>书名</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "book_id",
            "description": "<p>书籍唯一识别号</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "time_value",
            "description": "<p>时间值（如2019-07-26 08:36:12）</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "book_borrow_count",
            "description": "<p>借阅量</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>返回信息.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>返回码.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"data\": \"上传成功\",\n  \"code\": \"200\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/borrowingList.js",
    "groupTitle": "borrowingList",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/borrowing-list/upload"
      }
    ]
  },
  {
    "type": "get",
    "url": "/library-people-count",
    "title": "到馆人数统计",
    "version": "0.1.0",
    "name": "libraryPeopleCount",
    "group": "libraryPeopleCount",
    "description": "<p>不需要传参数，后台设置显示方式</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>返回信息.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>返回码.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"data\": {\n      \"hoursCount\": [ //每小时数据\n          {\n              \"time\": \"2019-08-07 05:41:32\",\n              \"count\": 0\n          },\n          {\n              \"time\": \"2019-08-07 06:41:32\",\n              \"count\": 0\n          },\n          {\n              \"time\": \"2019-08-07 07:41:32\",\n              \"count\": 0\n          },\n          {\n              \"time\": \"2019-08-07 08:41:32\",\n              \"count\": 0\n          },\n          {\n              \"time\": \"2019-08-07 09:41:32\",\n              \"count\": 0\n          },\n          {\n              \"time\": \"2019-08-07 10:41:32\",\n              \"count\": 0\n          },\n          {\n              \"time\": \"2019-08-07 11:41:32\",\n              \"count\": 0\n          },\n          {\n              \"time\": \"2019-08-07 12:41:32\",\n             \"count\": 0\n          }\n      ],\n      \"weekCount\": 7247,//每周数据\n      \"peopleInLibrary\": \"23\",//在馆人数\n      \"totalCount\": 7247//总人数\n  },\n  \"code\": 200\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/libraryPeopleCount.js",
    "groupTitle": "libraryPeopleCount",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/library-people-count"
      }
    ]
  },
  {
    "type": "post",
    "url": "/library-people-count/set-closed-time",
    "title": "开闭馆时间设置",
    "version": "0.1.0",
    "name": "setClosedTime",
    "group": "libraryPeopleCount",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "open_time",
            "description": "<p>开馆时间(格式：0831表示8点31分，一共4位)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "close_time",
            "description": "<p>闭馆时间(格式：2203表示晚上10点03分，一共4位)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>返回信息.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>返回码.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"data\": \"设置成功\",\n  \"code\": \"200\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/libraryPeopleCount.js",
    "groupTitle": "libraryPeopleCount",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/library-people-count/set-closed-time"
      }
    ]
  },
  {
    "type": "get",
    "url": "/log/operation",
    "title": "操作日志",
    "version": "0.1.0",
    "name": "logOperation",
    "group": "log",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "page",
            "description": "<p>开始页</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "page_size",
            "description": "<p>每页数据</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>返回信息.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>返回码.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"data\": {\n      \"totalCount\": 284,\n      \"list\": [\n          {\n              \"operator_user\": \"郭老师\",\n              \"ip\": \"192.168.0.1\",\n              \"content\": \"郭老师上传了一张自己的自拍照\",\n              \"created_time\": \"2018-11-11 11:11:11\"\n          }\n      ]\n  },\n  \"code\": 200\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/log.js",
    "groupTitle": "log",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/log/operation"
      }
    ]
  },
  {
    "type": "get",
    "url": "/log/system",
    "title": "系统访问日志",
    "version": "0.1.0",
    "name": "logSystem",
    "group": "log",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "page",
            "description": "<p>开始页</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "page_size",
            "description": "<p>每页数据</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>返回信息.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>返回码.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"data\": {\n      \"totalCount\": 49422,\n      \"list\": [\n          {\n              \"ip\": \"192.168.0.1\",\n              \"url\": \"http://localhost:3000/a.html\",\n              \"content\": \"这是备注\",\n              \"created_time\": \"2018-11-11 11:11:11\"\n          }\n      ]\n  },\n  \"code\": 200\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/log.js",
    "groupTitle": "log",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/log/system"
      }
    ]
  },
  {
    "type": "get",
    "url": "/notice",
    "title": "通知公告--列表（后台）",
    "version": "0.1.0",
    "name": "notice",
    "group": "notice",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "page",
            "defaultValue": "1",
            "description": "<p>第几页</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "page_size",
            "defaultValue": "10",
            "description": "<p>每页显示多少</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>返回信息.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>返回码.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"data\": \"更新成功\",\n  \"code\": \"200\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The id of the User was not found.</p>"
          }
        ]
      }
    },
    "filename": "routes/notice.js",
    "groupTitle": "notice",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/notice"
      }
    ]
  },
  {
    "type": "post",
    "url": "/notice/add",
    "title": "通知公告--添加",
    "version": "0.1.0",
    "name": "noticeAdd",
    "group": "notice",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "title",
            "description": "<p>标题</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>内容</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "display",
            "defaultValue": "1",
            "description": "<p>是否显示（0不显示，1显示）</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>返回信息.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>返回码.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"data\": \"添加成功\",\n  \"code\": \"200\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The id of the User was not found.</p>"
          }
        ]
      }
    },
    "filename": "routes/notice.js",
    "groupTitle": "notice",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/notice/add"
      }
    ]
  },
  {
    "type": "post",
    "url": "/notice/delete",
    "title": "通知公告--删除",
    "version": "0.1.0",
    "name": "noticeDelete",
    "group": "notice",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "notice_id",
            "description": "<p>公告id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>返回信息.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>返回码.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"data\": \"删除成功\",\n  \"code\": \"200\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The id of the User was not found.</p>"
          }
        ]
      }
    },
    "filename": "routes/notice.js",
    "groupTitle": "notice",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/notice/delete"
      }
    ]
  },
  {
    "type": "post",
    "url": "/notice/display",
    "title": "通知公告--设置是否显示",
    "version": "0.1.0",
    "name": "noticeDisplay",
    "group": "notice",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "notice_id",
            "description": "<p>公告id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "display",
            "defaultValue": "1",
            "description": "<p>是否显示（0不显示，1显示）</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>返回信息.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>返回码.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"data\": \"设置成功\",\n  \"code\": \"200\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The id of the User was not found.</p>"
          }
        ]
      }
    },
    "filename": "routes/notice.js",
    "groupTitle": "notice",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/notice/display"
      }
    ]
  },
  {
    "type": "post",
    "url": "/notice/edit",
    "title": "通知公告--编辑",
    "version": "0.1.0",
    "name": "noticeEdit",
    "group": "notice",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "notice_id",
            "description": "<p>公告id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "notice_title",
            "description": "<p>公告标题</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "notice_content",
            "description": "<p>公告内容</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>返回信息.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>返回码.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"data\": \"修改成功\",\n  \"code\": \"200\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The id of the User was not found.</p>"
          }
        ]
      }
    },
    "filename": "routes/notice.js",
    "groupTitle": "notice",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/notice/edit"
      }
    ]
  },
  {
    "type": "get",
    "url": "/notice/enable",
    "title": "通知公告--列表（首页前台）",
    "version": "0.1.0",
    "name": "noticeEnable",
    "group": "notice",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>返回信息.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>返回码.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"data\": \"更新成功\",\n  \"code\": \"200\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The id of the User was not found.</p>"
          }
        ]
      }
    },
    "filename": "routes/notice.js",
    "groupTitle": "notice",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/notice/enable"
      }
    ]
  },
  {
    "type": "post",
    "url": "/permissions/add_role",
    "title": "新建角色",
    "version": "0.1.0",
    "name": "addRole",
    "group": "permissions",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "role_name",
            "description": "<p>角色名称.</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": true,
            "field": "permissions_ids",
            "defaultValue": "空",
            "description": "<p>权限id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>返回信息.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>返回码.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"data\": \"成功\",\n  \"code\": \"200\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The id of the User was not found.</p>"
          }
        ]
      }
    },
    "filename": "routes/permissions.js",
    "groupTitle": "permissions",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/permissions/add_role"
      }
    ]
  },
  {
    "type": "post",
    "url": "/permissions/delete_role",
    "title": "删除角色",
    "version": "0.1.0",
    "name": "deleteRole",
    "group": "permissions",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "role_id",
            "description": "<p>角色名称.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>返回信息.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>返回码.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"data\": \"成功\",\n  \"code\": \"200\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The id of the User was not found.</p>"
          }
        ]
      }
    },
    "filename": "routes/permissions.js",
    "groupTitle": "permissions",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/permissions/delete_role"
      }
    ]
  },
  {
    "type": "get",
    "url": "/permissions/permissions_list",
    "title": "系统权限列表",
    "version": "0.1.0",
    "name": "permissionsList",
    "group": "permissions",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>返回信息.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>返回码.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"data\": [\n      {\n          \"id\": 673,\n          \"name\": \"添加用户\"\n      },\n      {\n          \"id\": 674,\n          \"name\": \"删除用户\"\n      },\n      {\n          \"id\": 675,\n          \"name\": \"重置密码\"\n      }\n  ],\n  \"code\": 200\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The id of the User was not found.</p>"
          }
        ]
      }
    },
    "filename": "routes/permissions.js",
    "groupTitle": "permissions",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/permissions/permissions_list"
      }
    ]
  },
  {
    "type": "get",
    "url": "/permissions/role_has_permissions",
    "title": "角色拥有的权限列表",
    "version": "0.1.0",
    "name": "role_has_permissions",
    "group": "permissions",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "role_id",
            "description": "<p>角色id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>返回信息.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>返回码.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"data\": [\n      {\n          \"id\": 673,\n          \"name\": \"添加用户\",\n          \"action_url\": \"/users/add\"\n      },\n      {\n          \"id\": 674,\n          \"name\": \"删除用户\",\n          \"action_url\": \"/users/delete\"\n      },\n      {\n          \"id\": 675,\n          \"name\": \"重置密码\",\n          \"action_url\": \"/users/reset\"\n      }\n  ],\n  \"code\": 200\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The id of the User was not found.</p>"
          }
        ]
      }
    },
    "filename": "routes/permissions.js",
    "groupTitle": "permissions",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/permissions/role_has_permissions"
      }
    ]
  },
  {
    "type": "get",
    "url": "/permissions/roles_list",
    "title": "系统角色列表",
    "version": "0.1.0",
    "name": "rolesList",
    "group": "permissions",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>返回信息.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>返回码.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"data\": [\n      {\n          \"id\": 57,\n          \"name\": \"管理员\"\n      },\n      {\n          \"id\": 58,\n          \"name\": \"客服\"\n      }\n  ],\n  \"code\": 200\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The id of the User was not found.</p>"
          }
        ]
      }
    },
    "filename": "routes/permissions.js",
    "groupTitle": "permissions",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/permissions/roles_list"
      }
    ]
  },
  {
    "type": "post",
    "url": "/permissions/sync_permission_to_role",
    "title": "同步权限到角色",
    "version": "0.1.0",
    "name": "syncPermissionToRole",
    "group": "permissions",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "role_id",
            "description": "<p>角色id.</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "permissions_ids",
            "description": "<p>权限id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>返回信息.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>返回码.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"data\":\"更新成功\",\n  \"code\": 200\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The id of the User was not found.</p>"
          }
        ]
      }
    },
    "filename": "routes/permissions.js",
    "groupTitle": "permissions",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/permissions/sync_permission_to_role"
      }
    ]
  },
  {
    "type": "post",
    "url": "/permissions/sync_role_to_user",
    "title": "同步角色到用户",
    "version": "0.1.0",
    "name": "syncRoleToUser",
    "group": "permissions",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_id",
            "description": "<p>用户id.</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "roles_ids",
            "description": "<p>角色id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>返回信息.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>返回码.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"data\": \"更新成功\",\n  \"code\": \"200\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The id of the User was not found.</p>"
          }
        ]
      }
    },
    "filename": "routes/permissions.js",
    "groupTitle": "permissions",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/permissions/sync_role_to_user"
      }
    ]
  },
  {
    "type": "get",
    "url": "/permissions/user_has_roles",
    "title": "用户拥有的角色列表",
    "version": "0.1.0",
    "name": "userHasRoles",
    "group": "permissions",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_id",
            "description": "<p>用户id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>返回信息.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>返回码.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"data\": [\n      {\n          \"id\": 57,\n          \"name\": \"管理员\"\n      },\n      {\n          \"id\": 58,\n          \"name\": \"客服\"\n      }\n  ],\n  \"code\": 200\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The id of the User was not found.</p>"
          }
        ]
      }
    },
    "filename": "routes/permissions.js",
    "groupTitle": "permissions",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/permissions/user_has_roles"
      }
    ]
  },
  {
    "type": "get",
    "url": "/reader-star",
    "title": "阅读之星--列表页展示",
    "version": "0.1.0",
    "name": "readerStar",
    "group": "readerStar",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "show_type",
            "description": "<p>显示类型（read_count-按阅读数量,read_duration-按阅读时长）</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>返回信息.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>返回码.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"data\": [\n      {\n          \"id\": 1,\n          \"reader_name\": \"李小萌\",\n          \"reader_uuid\": \"123\",\n          \"read_duration\": 5,\n          \"read_count\": 12\n      },\n      {\n          \"id\": 2,\n          \"reader_name\": \"王超\",\n          \"reader_uuid\": \"263\",\n          \"read_duration\": 6,\n          \"read_count\": 26\n      }\n  ],\n  \"code\": 200\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/readerStar.js",
    "groupTitle": "readerStar",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/reader-star"
      }
    ]
  },
  {
    "type": "get",
    "url": "/reader-star/borrower-count",
    "title": "阅读之星--读者借阅量展示（前台）",
    "version": "0.1.0",
    "name": "readerStarBorrowerCount",
    "group": "readerStar",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>返回信息.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>返回码.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"data\": [\n      {\n          \"borrower_number\": 1552,//借阅数量\n          \"borrow_name\": \"张三\" //借阅人\n      },\n      {\n          \"borrower_number\": 254,\n          \"borrow_name\": \"张六\"\n      },\n      {\n          \"borrower_number\": 225,\n          \"borrow_name\": \"李四\"\n      },\n      {\n          \"borrower_number\": 24,\n          \"borrow_name\": \"郭莹\"\n      },\n      {\n          \"borrower_number\": 21,\n          \"borrow_name\": \"王五\"\n      }\n  ],\n  \"code\": 200\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/readerStar.js",
    "groupTitle": "readerStar",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/reader-star/borrower-count"
      }
    ]
  },
  {
    "type": "post",
    "url": "/reader-star/set-show-type",
    "title": "阅读之星--设置显示类型",
    "version": "0.1.0",
    "name": "readerStarSetShowType",
    "group": "readerStar",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "time_value",
            "description": "<p>时间区间值（如2019-07-26 08:36:12@2019-08-03 15:50:56）</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "display_count",
            "defaultValue": "20",
            "description": "<p>显示数量</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>返回信息.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>返回码.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"data\": \"设置成功\",\n  \"code\": 200\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/readerStar.js",
    "groupTitle": "readerStar",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/reader-star/set-show-type"
      }
    ]
  },
  {
    "type": "get",
    "url": "/setting/all",
    "title": "系统设置信息",
    "version": "0.1.0",
    "name": "settingAll",
    "group": "setting",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>返回信息.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>返回码.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"data\": {\n      \"borrowing_list\": {\n          \"nameZh\": \"借阅排行展示时间类型\",\n          \"value\": {\n              \"displayCount\": \"5\"//展示的数量\n          }\n      },\n      \"library_opening_hours\": {\n          \"nameZh\": \"图书馆开放时间\",\n          \"value\": {\n              \"openTime\": \"2019-12-19 07:52:40\",//设置的开馆时间\n              \"closeTime\": \"2019-12-19 22:52:45\"//设置的闭馆时间\n          }\n      },\n      \"reader_star\": {\n          \"nameZh\": \"阅读之星配置\",\n          \"value\": {\n              \"timeValue\": \"2019-06-05 00:00:00@\",//开始时间和结束时间，没有结束时间就表示查询到当前时间\n              \"displayCount\": \"7\"//显示条数\n          }\n      },\n      \"borrowing_count\": {\n          \"nameZh\": \"借阅量统计\",\n          \"value\": {\n              \"timeType\": \"week\",//展示类型\n              \"timeValue\": \"201945@\",\n              \"realStartTime\": \"2019-11-05 00:00:00\",//开始时间\n              \"realEndTime\": \"\"//结束时间，没有结束时间就表示查询到现在\n          }\n      }\n  },\n  \"code\": 200\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/setting.js",
    "groupTitle": "setting",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/setting/all"
      }
    ]
  },
  {
    "type": "get",
    "url": "/today-recommend",
    "title": "今日推荐--前台展示",
    "version": "0.1.0",
    "name": "todayRecommend",
    "group": "todayRecommend",
    "description": "<p>不需要传参数，后台设置显示方式</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>返回信息.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>返回码.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"data\": [\n      {\n          \"id\": 1,\n          \"reader_name\": \"李小萌\",\n          \"reader_uuid\": \"123\",\n          \"read_duration\": 5,\n          \"read_count\": 12\n      },\n      {\n          \"id\": 2,\n          \"reader_name\": \"王超\",\n          \"reader_uuid\": \"263\",\n          \"read_duration\": 6,\n          \"read_count\": 26\n      }\n  ],\n  \"code\": 200\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/todayRecommend.js",
    "groupTitle": "todayRecommend",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/today-recommend"
      }
    ]
  },
  {
    "type": "post",
    "url": "/today-recommend/add",
    "title": "今日推荐--设置前台为显示",
    "version": "0.1.0",
    "name": "todayRecommendAdd",
    "group": "todayRecommend",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "book_id",
            "description": "<p>书籍id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>返回信息.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>返回码.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"data\": \"添加成功\",\n  \"code\": 200\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/todayRecommend.js",
    "groupTitle": "todayRecommend",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/today-recommend/add"
      }
    ]
  },
  {
    "type": "get",
    "url": "/today-recommend/all",
    "title": "今日推荐---所有数据",
    "version": "0.1.0",
    "name": "todayRecommendAll",
    "group": "todayRecommend",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>推荐类型</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "page",
            "description": "<p>第几页</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "page_size",
            "description": "<p>每页显示多少条</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>返回信息.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>返回码.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"data\": {\n      \"totalCount\": 2,\n      \"list\": [\n          {\n              \"id\": 1,\n              \"book_name\": \"穿过你的头发的我的手\",\n              \"book_cover_url\": \"http://www.baidu.com/asdf.jpg\",\n              \"book_qrcode_url\": \"http://www.baidul.com/faewe.png\",\n              \"customize_download_count\": 26,\n              \"real_download_count\": 63,\n              \"sort\": 1,\n              \"is_show\": 1,\n              \"time_to_market\": \"2019-07-12T03:07:34.000Z\",\n              \"created_at\": \"2019-08-09T01:57:15.000Z\",\n              \"recommend_type\": \"2\"\n          },\n          {\n              \"id\": 2,\n              \"book_name\": \"JAVA从入门到精通\",\n              \"book_cover_url\": \"http://www.adf.cn/fad.jpg\",\n              \"book_qrcode_url\": \"http://www.fasdfa.com/asdfwe.jpg\",\n              \"customize_download_count\": 26,\n              \"real_download_count\": 25,\n              \"sort\": null,\n              \"is_show\": 1,\n              \"time_to_market\": \"2019-07-12T03:08:36.000Z\",\n              \"created_at\": \"2019-08-09T01:57:18.000Z\",\n              \"recommend_type\": \"1\"\n          }\n      ]\n  },\n  \"code\": 200\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/todayRecommend.js",
    "groupTitle": "todayRecommend",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/today-recommend/all"
      }
    ]
  },
  {
    "type": "post",
    "url": "/today-recommend/delete",
    "title": "今日推荐--设置前台不显示",
    "version": "0.1.0",
    "name": "todayRecommendDelete",
    "group": "todayRecommend",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "book_id",
            "description": "<p>书籍id</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>返回信息.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>返回码.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"data\": \"设置成功\",\n  \"code\": 200\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/todayRecommend.js",
    "groupTitle": "todayRecommend",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/today-recommend/delete"
      }
    ]
  },
  {
    "type": "post",
    "url": "/today-recommend/force-delete",
    "title": "今日推荐--删除书籍",
    "version": "0.1.0",
    "name": "todayRecommendForceDelete",
    "group": "todayRecommend",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "book_id",
            "description": "<p>书籍id(后台传过来的id)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>返回信息.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>返回码.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"data\": \"删除成功\",\n  \"code\": 200\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/todayRecommend.js",
    "groupTitle": "todayRecommend",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/today-recommend/force-delete"
      }
    ]
  },
  {
    "type": "post",
    "url": "/today-recommend/sort",
    "title": "今日推荐--排序调整",
    "version": "0.1.0",
    "name": "todayRecommendSort",
    "group": "todayRecommend",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "book1_id",
            "description": "<p>书籍1id（和书籍2交换排序）</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "book2_id",
            "description": "<p>书籍2id（和书籍1交换排序）</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>返回信息.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>返回码.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"data\": \"删除成功\",\n  \"code\": 200\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/todayRecommend.js",
    "groupTitle": "todayRecommend",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/today-recommend/sort"
      }
    ]
  },
  {
    "type": "get",
    "url": "/today-recommend/types",
    "title": "今日推荐---推荐类型列表",
    "version": "0.1.0",
    "name": "todayRecommendType",
    "group": "todayRecommend",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>返回信息.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>返回码.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n \"data\": [\n      {\n          \"id\": 2,\n          \"name\": \"新书推荐\"\n      },\n      {\n          \"id\": 3,\n          \"name\": \"电子书\"\n      }\n  ],\n  \"code\": 200\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/todayRecommend.js",
    "groupTitle": "todayRecommend",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/today-recommend/types"
      }
    ]
  },
  {
    "type": "post",
    "url": "/today-recommend/update",
    "title": "今日推荐--修改图书信息（后台）",
    "version": "0.1.0",
    "name": "todayRecommendUpdate",
    "group": "todayRecommend",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "book_id",
            "description": "<p>书籍id（后台返回的ID）</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "book_name",
            "description": "<p>书籍名称</p>"
          },
          {
            "group": "Parameter",
            "type": "File",
            "optional": true,
            "field": "book_cover",
            "description": "<p>书籍封面图</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "book_cover_url",
            "description": "<p>书籍封面图地址</p>"
          },
          {
            "group": "Parameter",
            "type": "File",
            "optional": true,
            "field": "book_qrcode",
            "description": "<p>书籍二唯码图</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "book_qrcode_url",
            "description": "<p>书籍二唯码图</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "customize_download_count",
            "description": "<p>自定义下载量</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "real_download_count",
            "description": "<p>真实下载量</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "time_to_market",
            "description": "<p>上市时间</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "book_type",
            "description": "<p>书籍类型（1热门图书2新书推荐3电子图书）</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>返回信息.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>返回码.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"data\": \"上传成功\",\n  \"code\": 200\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/todayRecommend.js",
    "groupTitle": "todayRecommend",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/today-recommend/update"
      }
    ]
  },
  {
    "type": "post",
    "url": "/today-recommend/upload",
    "title": "今日推荐--上传(添加)图书信息",
    "version": "0.1.0",
    "name": "todayRecommendUpload",
    "group": "todayRecommend",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "book_id",
            "description": "<p>书籍id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "book_name",
            "description": "<p>书籍名称</p>"
          },
          {
            "group": "Parameter",
            "type": "File",
            "optional": true,
            "field": "book_cover",
            "description": "<p>书籍封面图</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "book_cover_url",
            "description": "<p>书籍封面图地址</p>"
          },
          {
            "group": "Parameter",
            "type": "File",
            "optional": true,
            "field": "book_qrcode",
            "description": "<p>书籍二唯码图</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "book_qrcode_url",
            "description": "<p>书籍二唯码图</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "customize_download_count",
            "description": "<p>自定义下载量</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "real_download_count",
            "description": "<p>真实下载量</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "time_to_market",
            "description": "<p>上市时间</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "book_type",
            "description": "<p>书籍类型（1热门图书2新书推荐3电子图书）</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>返回信息.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>返回码.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"data\": \"上传成功\",\n  \"code\": 200\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/todayRecommend.js",
    "groupTitle": "todayRecommend",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/today-recommend/upload"
      }
    ]
  },
  {
    "type": "post",
    "url": "/today-recommend/update-download-count",
    "title": "今日推荐--调整下载量显示",
    "version": "0.1.0",
    "name": "updateDownloadCount",
    "group": "todayRecommend",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "book_id",
            "description": "<p>书籍id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "download_count",
            "description": "<p>要设置的下载量</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>返回信息.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>返回码.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"data\": \"修改成功\",\n  \"code\": 200\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/todayRecommend.js",
    "groupTitle": "todayRecommend",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/today-recommend/update-download-count"
      }
    ]
  },
  {
    "type": "post",
    "url": "/upload/post-resource",
    "title": "上传资源",
    "version": "0.1.0",
    "name": "uploadPostResource",
    "group": "upload",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "File",
            "optional": false,
            "field": "file",
            "description": "<p>资源名称</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>返回信息.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>返回码.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n  \"data\": \"http://localhost:3000/images/uploads/1575593733785szd-p3.jpg\",\n  \"code\": \"200\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/upload.js",
    "groupTitle": "upload",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/upload/post-resource"
      }
    ]
  }
] });
