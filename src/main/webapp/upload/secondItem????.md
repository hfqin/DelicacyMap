## 模型定义

### SecondItem

|属性|类型|描述|
|---|---|---|
|id|int||
|name|String||
|price|String||
|itemImg|String||
|detail|String||
|address|String||
|itemImg|String||
|bargain|int||
|likeNum|int||
|dislikeNum|int||
|commentNum|int||
|anonymous|int||
|user|User||
|status|int||
|phonenum|String||
|wechat|String||
|qq|String||
|createTime|datetime||
|modifyTime|datetime||
|tag|String||
|category|String||

## 接口

1.创建二手商品

URL:/secondItem/add

POST方法

|参数|描述|
|---|---|
|name||
|price||
|address||
|detail||
|itemImg||
|bargain||
|anonymous||
|phonenum||
|wechat||
|qq||
|tag||
|category||

返回示例

	{
		"errcode":"0",
		"errmsg":""
	}
	
2.获取某个二手商品

URL:/secondItem/get/id/{id}

GET方法

返回示例

	{
		"errcode":"0",
		"errmsg":""，
		"data":
		{
			"id":"",
			"name":"",
			"price":"",
			"address":"",
			"detail":"",
			"itemImg":"",
			"bargain":"",
			"likeNum":"",
			"dislikeNum":"",
			"commentNum":"",
			"anonymous":"",
			"user":
			{
				"id":"",
				"name":"",
				...
			}
			"status":"",
			"phonenum":"",
			"wechat":"",
			"qq":"",
			"createTime":"",
			"modifyTime":"",
			"tag":"",
			"category":""
		}

	}

3.获取某个用户的二手商品

URL:/secondItem/get/uid/{uid}

POST方法

|参数|描述|
|---|---|
|start||
|limit||

返回示例

	{
		"errcode":"0",
		"errmsg":""，
		"data":
		[
			{
				"id":"",
				"name":"",
				"price":"",
				"address":"",
				"detail":"",
				"itemImg":"",
				"bargain":"",
				"likeNum":"",
				"dislikeNum":"",
				"commentNum":"",
				"anonymous":"",
				"user":
				{
					"id":"",
					"name":"",
					...
				}
				"status":"",
				"phonenum":"",
				"wechat":"",
				"qq":"",
				"createTime":"",
				"modifyTime":"",
				"tag":"",
				"category":""
			},
			...
		]

	}
	
	
4.获取某个category下的商品

URL:/secondItem/get/category

POST方法

|参数|描述|
|---|---|
|category||
|start||
|limit||

返回示例

	{
		"errcode":"0",
		"errmsg":""，
		"data":
		[
			{
				"id":"",
				"name":"",
				"price":"",
				"address":"",
				"detail":"",
				"itemImg":"",
				"bargain":"",
				"likeNum":"",
				"dislikeNum":"",
				"commentNum":"",
				"anonymous":"",
				"user":
				{
					"id":"",
					"name":"",
					...
				}
				"status":"",
				"phonenum":"",
				"wechat":"",
				"qq":"",
				"createTime":"",
				"modifyTime":"",
				"tag":"",
				"category":""
			},
			...
		]

	}
	
5.二手商品搜索

URL:/secondItem/search

POST方法

|参数|描述|
|---|---|
|search||
|start||
|limit||

返回示例

	{
		"errcode":"0",
		"errmsg":""，
		"data":
		[
			{
				"id":"",
				"name":"",
				"price":"",
				"address":"",
				"detail":"",
				"itemImg":"",
				"bargain":"",
				"likeNum":"",
				"dislikeNum":"",
				"commentNum":"",
				"anonymous":"",
				"user":
				{
					"id":"",
					"name":"",
					...
				}
				"status":"",
				"phonenum":"",
				"wechat":"",
				"qq":"",
				"createTime":"",
				"modifyTime":"",
				"tag":"",
				"category":""
			},
			...
		]

	}
	
6.更新二手商品信息

URL:/secondItem/update

POST方法
|参数|描述|
|---|---|
|name||
|price||
|address||
|detail||
|itemImg||
|bargain||
|anonymous||
|phonenum||
|wechat||
|qq||
|tag||
|category||

返回示例

	{
		"errcode":"0",
		"errmsg":""，
	}
	
7.获取自己的二手商品

URL:/secondItem/get/my

POST方法

|参数|描述|
|---|---|
|start||
|limit||

返回示例

	{
		"errcode":"0",
		"errmsg":""，
		"data":
		[
			{
				"id":"",
				"name":"",
				"price":"",
				"address":"",
				"detail":"",
				"itemImg":"",
				"bargain":"",
				"likeNum":"",
				"dislikeNum":"",
				"commentNum":"",
				"anonymous":"",
				"user":
				{
					"id":"",
					"name":"",
					...
				}
				"status":"",
				"phonenum":"",
				"wechat":"",
				"qq":"",
				"createTime":"",
				"modifyTime":"",
				"tag":"",
				"category":""
			},
			...
		]

	}
