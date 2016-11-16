## 模型定义

### Verify

|属性|类型|描述|
|---|---|---|
|id|int||
|img|String||
|createTime|datetime||
|modifyTime|datetime||
|status|int||
|user|User||

## 接口

1.照片添加

URL:/verify/add/{img}

POST方法

返回示例

	{
		"errcode":"0",
		"errmsg":""
	}

2.照片更新

URL:/verify/update/{img}

POST方法

返回示例

	{
		"errcode":"0",
		"errmsg":""
	}

3.认证通过

URL:/verify/confirm/{id}

POST方法

返回示例

	{
		"errcode":"0",
		"errmsg":""
	}

4.认证不通过

URL:/verify/refuse/{id}

POST方法

返回示例

	{
		"errcode":"0",
		"errmsg":""
	}

5.获取用户认证用照片

URL:/verify/get

POST方法

|参数|描述|
|---|---|
|start||
|limit||

	{
		"errcode":"0",
		"errmsg":"",
		"data":[
			{
				"img":"",
				"id":"",
				"createTime":"",
				"modifyTime":"",
				"status":"",
				"user":{
					"id":"",
					...
				}
			}
			...
		]
	}

