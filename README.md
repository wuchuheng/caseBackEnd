## 说明 
一共2个服务，`graphQL`接口服务和`apk parser` apk上传解包服务。

## 使用
``` bash 
$ docker-compose up // 就可以了
```

##  数据库方案
 采用`sqlite`，数据文件为`runtime/store.sqlite`,可通过`navicat` 选择`sqlite`类型去打开查看数据。
