//@Desc:前端数据缓存管理，减少基础数据请求次数
//@Author:Roy
//@Dependent：jQuery、Lodash

; (function ($, _) {

    function Rcache(items) {
        this.items = [];
        this.Cache = {};
        this.init(items);
        this.debug = window && ((~window.location.origin.indexOf("localhost")) || (~window.location.origin.indexOf("127.0.0.1")));
    }

    Rcache.prototype = {

        /** 版本号 **/
        version: "1.1.0",

        /** 初始化 **/
        init: function (items) {
            var that = this;
            _.forEach(items, function (item) {
                that.set(item);
            });
        },

        /** 新增缓存 **/
        set: function (item) {
            var that = this;

            //检测是否存在相同的键值
            if (!~this._searchIndex(item.name)) {
                //添加到键值缓存
                this.items.push($.extend({
                    name: '', //缓存记录名称 【必须】
                    source: 'local', //数据来源 local||remote 【必须】
                    data: [], //数据  仅有当数据来源为local时使用
                    url: '', //远程地址  仅有数据来源为远程时使用
                    isNow: false, //是否自动加载 true||false 【必须】
                    timeout: 60 * 60 * 1000, //超时时间,单位毫秒，默认60分钟
                    lastUpdate: 0 //最后更新时间,UTC时间毫秒数
                }, item));

                //判断类型与边际条件,做相应处理
                if (item.source === 'remote' && item.url && item.isNow) {
                    if (item.source === 'remote' && item.url === '') {
                        console.warn("缓存项:" + item.name + ",url参数配置不完整！")
                    } else {
                        $.ajax(item.url)
                            .then(function (json) {
                                var data = json ? JSON.parse(json) : [];
                                that.Cache[item.name] = data;
                                that.items[that.items.length-1].lastUpdate = new Date().getTime();
                            });
                    }
                } else {
                    this.Cache[item.name] = item.data || [];
                }
                this._log("info", "添加新缓存记录:" + item.name + "成功!");
            } else {
                this._log("warn", "添加新缓存记录失败:指定的缓存记录已经存在!");
            }
        },

        /** 移除缓存 **/
        remove: function (name) {
            var index = this._searchIndex(name);
            if (~index) {
                this.items.splice(index, 1);
                delete Cache[name];
                this._log("info", "移除缓存:" + name + "成功!");
            } else {
                this._log("warn", "指定的缓存记录不存在!");
            }
        },

        /** 刷新缓存 **/
        refresh: function (name) {
            var item = this.items[this._searchIndex(name)];
            var that = this;

            if (item && item.source === 'remote' && item.url) {
                $.ajax(item.url)
                    .then(function (json) {
                        var data = JSON.parse(json);
                        that.Cache[name] = data;
                        that._log("info", "更新缓存:" + name + "成功!");
                        item.lastUpdate = new Date().getTime();
                    });
            } else {
                this._log("warn", "local 类型资源无需更新!");
            }
        },

        /** 获取缓存数据 **/
        get: function (name, callback) {
            var item = _.find(this.items, function (i) { return i.name === name });
            var that = this;

            if (typeof callback !== "function") {
                this._log("error", "传递参数有误,请传递回调函数");
                return;
            }

            if (item) {
                if (item && item.source === 'remote' && item.url) {
                    if (item.isNow || (that.Cache[name].length > 0 && (item.lastUpdate + item.timeout) > new Date().getTime())) {
                        callback(that.Cache[name]);
                    } else {
                        $.ajax(item.url)
                            .then(function (json) {
                                var data = JSON.parse(json);
                                that.Cache[name] = data;
                                item.lastUpdate = new Date().getTime();
                                callback(that.Cache[name]);
                            });
                    }
                } else {
                    callback(that.Cache[name]);
                }
            }
            else {
                callback([]);
                this._log("warn", "未找到缓存:" + name + " 对应数据");
            }
        },

        /** 获取缓存数据多个 **/
        getMany: function (names, callback) {
            var result = {},
                that = this;

            if (typeof callback !== "function") {
                this._log("error", "传递参数有误,请传递回调函数");
                return;
            }

            _.forEach(names, function (item) {
                that.get(item, function (data) {
                    result[item] = data;
                    if (_.keys(result).length === names.length) {
                        callback(result);
                    }
                });
            });
        },

        /** 查询键值下标 **/
        _searchIndex: function (name) {
            return _.findIndex(this.items, function (i) {
                return i.name === name;
            });
        },

        /** 日志 **/
        _log: function (type, msg) {
            if (this.debug) {
                switch (type) {
                    case "error":
                        console.error(msg);
                        break;
                    case "warn":
                        console.warn(msg);
                        break;
                    case "info":
                        console.info(msg);
                        break;
                    default:
                        console.log(msg);
                        break;
                }
            }
        }
    };

    window.Rcache = Rcache;
})($, _);