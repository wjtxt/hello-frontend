// 最简单的函数
function add() {
    return "abc";
}

//定义一个加法，传入参数类型可以不填，传出参数可以任意（void、int、string等）
function add(a, b) {
    return a + b;
}

// 定义一个constructor（函数的一种，模拟class的实现）
function UserInfo(n, a) {
    name = n;
    age = a;
};

UserInfo.prototype.setName = function (name) {
    this.name = name;
}
UserInfo.prototype.getName = function () {
    //return this.name;
    return name;
}
UserInfo.prototype.getClassName = function () {
    return "UserInfo";
}

// 测试函数
function testFunc() {
    var sum = add(1, 2);
    console.log(sum);

    // 测试“new A”和“new A()”的区别
    var obj1 = new UserInfo;
    UserInfo.prototype.getClassName = function () {
        return "UserInfo_new"
    }
    console.log(obj1.getClassName());

    var obj = new UserInfo("WJ", 10);
    obj.sex = "male";
    console.log(obj.name);
    console.log(obj.sex);
    console.log(obj.getName());
    //console.log(UserInfo.getName()); // function object can not access method and attr of prototype object
    console.log(UserInfo.prototype.getName());
    console.log(obj.__proto__.getName());

    // 研究原型链
    function f() {}
    f.prototype.foo = "abc";
    f.__proto__.age = 18;
    var obj = new f();
    obj.sex = "male";
    console.log(obj.foo); //abc
}

// 定义1个匿名方法，并将函数指针赋值给变量onClickMeVar，var代表任意类型的变量（对象、实例），可以用任意类型（基本类型、复合类型、函数等）复制
var onClickMeVar = function () {
    alert("hello world on test!");

    return function () {
        alert("111-222");
    }
};

// 定义1个名为clickmeFunc的函数
function onClickMe() {
    alert("hello world on testFunc!");

    //动态在document尾部添加一个按钮
    var btn = document.createElement("BUTTON");
    var text = document.createTextNode("hello world!");
    btn.appendChild(text);
    document.body.appendChild(btn);

    return function () {
        alert("111-222-333");
    }
}

// bootstrap表格添加操作按钮
function operateFormatter(value, row, index) { //赋予的参数

    console.debug('on operateFormatter()');

    return [
        '<button class="btn btn-info btn-sm rightSize detailBtn" type="button"><i class="fa fa-paste"></i> 详情</button>',
        '<button class="btn btn-danger btn-sm rightSize packageBtn" type="button"><i class="fa fa-envelope"></i> 通知</button>'
    ].join('');
}

// bootstrap表格添加行样式
function rowStyle(row, index) {

    console.debug('on rowStyle()');

    var classesArr = ['success', 'info'];
    if (index % 2 === 0) { //偶数行
        return {
            classes: classesArr[0]
        };
    } else { //奇数行
        return {
            classes: classesArr[1]
        };
    }
}

// 初始化操作
function init() {
    testFunc();

    document.getElementById("btn_clickme").onclick = onClickMe;

    document.getElementById("btn_clickme").onmouseover = function () {
        // alert("onmouseover!");
        document.getElementById("btn_clickme").setAttribute("value", "ok");
    };

    document.getElementById("btn_clickme").onmouseout = function () {
        document.getElementById("btn_clickme").setAttribute("value", "点我");
    };
}

//////////////////////////////////////////////////////////////////////////////////////////////
var treeObj = {
        initTable: function () {

            var queryParams = function (params) {
                var param = {
                    pageIndex: Math.ceil(params.offset / params.limit) + 1,
                    pageSize: params.limit,
                    order: params.order,
                    ordername: params.sort,
                    startDateTime: $("#dateSearch .startDate").val(),
                    endDateTime: $("#dateSearch .endDate").val(),
                    search: $("#dateSearch .imuserid").val()
                };
                return param;
            }

            var responseHandler = function (e) {

                console.log(e);

                if (e.data && e.data.length > 0) {
                    return {
                        "rows": e.data,
                        "total": e.count
                    };
                } else {
                    return {
                        "rows": [],
                        "total": 0
                    };
                }

            }

            var uidHandle = function (res) {
                var html = "<a href='#'>" + res + "</a>";
                return html;
            }

            // bootstrap表格添加操作按钮
            function operateFormatter(value, row, index) { //赋予的参数

                console.debug('on operateFormatter()');

                return [
                    '<button class="btn btn-info btn-sm rightSize detailBtn" type="button"><i class="fa fa-paste"></i> 详情</button>',
                    '<button class="btn btn-danger btn-sm rightSize packageBtn" type="button"><i class="fa fa-envelope"></i> 通知</button>'
                ].join('');
            }

            // bootstrap表格添加行样式
            function rowStyle(row, index) {

                console.debug('on rowStyle()');

                var classesArr = ['success', 'info'];
                if (index % 2 === 0) { //偶数行
                    return {
                        classes: classesArr[0]
                    };
                } else { //奇数行
                    return {
                        classes: classesArr[1]
                    };
                }
            }

            // 初始化表格结构，并加载数据
            function initData(name) {
                var url, columns, tableName;
                switch (name) {
                    case 'loginLogTab':
                        tableName = "receiveLogs-table";
                        columns = [{
                                checkbox: true
                            },
                            {
                                field: 'uid',
                                title: '用户编号',
                                align: 'center',
                                formatter: uidHandle, //自定义方法设置uid跳转链接
                                width: 300
                            }, {
                                field: 'name',
                                title: '姓名',
                                align: 'center',
                                sortable: false //本列不可以排序
                            }, {
                                field: 'sex',
                                title: '性别',
                                align: 'center'
                            }, {
                                field: 'age',
                                title: '年龄',
                                align: 'center',
                                sortable: true,
                                clickToSelect: false,
                                sortName: "age",
                                order: "asc"
                            }, {
                                field: 'area',
                                title: '户籍所在地',
                                align: 'left',
                                halign: 'center' //设置表头列居中对齐
                            }, {
                                field: 'loginWay',
                                title: '登录方式',
                                align: 'center'
                            }, {
                                field: 'status',
                                title: '状态',
                                align: 'center'
                            }, {
                                field: 'createTime',
                                title: '登录时间',
                                align: 'center',
                                width: 90
                            }, {
                                field: 'orderService',
                                title: '购买服务',
                                align: 'center'
                            }, {
                                field: 'connectorIP',
                                title: '连接器IP',
                                align: 'center'
                            }, {
                                field: 'connectorPort',
                                title: '连接器端口',
                                align: 'center'
                            }, {
                                field: 'operate',
                                title: '操作',
                                align: 'center',
                                valign: 'middle',
                                formatter: operateFormatter //自定义方法，添加操作按钮
                            }
                        ];
                        break;
                    case 'receiveLogTab':
                        //省略
                        break;
                    case 'socketInputTab':
                        //省略
                        break;
                    case 'socketOutputTab':
                        //省略
                        break;
                }

                var data = [{
                        "uid": "1101",
                        "name": "owen",
                        "sex": "female",
                        "age": 28,
                        "area": "上海",
                        "loginWay": "phone",
                        "status": "1",
                        "createTime": "2017-04-10 12:23:35",
                        "orderService": "旅游",
                        "connectorIp": "172.16.24.35",
                        "connectorPort": "9090"
                    },
                    {
                        "uid": "1102",
                        "name": "owen",
                        "sex": "female",
                        "age": 28,
                        "area": "上海",
                        "loginWay": "phone",
                        "status": "1",
                        "createTime": "2017-04-10 12:23:35",
                        "orderService": "旅游",
                        "connectorIp": "172.16.24.35",
                        "connectorPort": "9090"
                    }
                ];

                $('#' + tableName).empty();
                $('#' + tableName).bootstrapTable('destroy').bootstrapTable({
                    url: '../data/login_info.json', //url一般是请求后台的url地址,调用ajax获取数据。此处我用本地的json数据来填充表格。
                    rowStyle: rowStyle,
                    method: "get", //使用get请求到服务器获取数据
                    dataType: "json",
                    contentType: 'application/json,charset=utf-8',
                    toolbar: "#toolbar", //一个jQuery 选择器，指明自定义的toolbar 例如:#toolbar, .toolbar.
                    uniqueId: "id", //每一行的唯一标识，一般为主键列
                    height: document.body.clientHeight - 165, //动态获取高度值，可以使表格自适应页面
                    cache: false, // 不缓存
                    striped: true, // 隔行加亮
                    queryParamsType: "limit", //设置为"undefined",可以获取pageNumber，pageSize，searchText，sortName，sortOrder 设置为"limit",符合 RESTFul 格式的参数,可以获取limit, offset, search, sort, order 
                    queryParams: queryParams,
                    sidePagination: "server", //分页方式：client客户端分页，server服务端分页（*）
                    sortable: true, //是否启用排序;意味着整个表格都会排序
                    sortName: 'uid', // 设置默认排序为 name
                    sortOrder: "asc", //排序方式
                    pagination: true, //是否显示分页（*）
                    search: true, //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
                    strictSearch: true,
                    showColumns: true, //是否显示所有的列
                    showRefresh: true, //是否显示刷新按钮
                    showToggle: true, //是否显示详细视图和列表视图
                    clickToSelect: true, //是否启用点击选中行
                    minimumCountColumns: 2, //最少允许的列数 clickToSelect: true, //是否启用点击选中行
                    pageNumber: 1, //初始化加载第一页，默认第一页
                    pageSize: 10, //每页的记录行数（*）
                    pageList: [10, 25, 50, 100], //可供选择的每页的行数（*）
                    paginationPreText: "Previous",
                    paginationNextText: "Next",
                    paginationFirstText: "First",
                    paginationLastText: "Last",
                    responseHandler: responseHandler,
                    columns: columns,
                    onLoadSuccess: function (data) { //加载成功时执行
                        console.log(data);
                    },
                    onLoadError: function (res) { //加载失败时执行
                        console.log(res);
                    }
                });
            }

            // 初始化表格
            function init() {

                console.debug('on initTable()');

                // 将这两个函数添加到全局作用域，以便bootstrap-table可以使用
                //window.operateFormatter = operateFormatter;
                //window.rowStyle = rowStyle;

                initData('loginLogTab');
            }

            // 执行初始化方法
            init();
        }
}
//////////////////////////////////////////////////////////////////////////////////////////////

        // 定义绑定控件事件的函数
        function onloadFinished() {
            console.debug("on onloadFinished()");

            //init();

            //window.operateFormatter = operateFormatter;
            // window.rowStyle = rowStyle;
            // treeObj.initTable();
        };

        // 绑定消息响应函数，右侧写函数名（代表函数指针）
        /*document.getElementById("btn_clickme").onclick=testFunc();
        document.getElementById("btn_clickme").onclick=testFunc;*/

        //----------------------------------------
        //  原生
        //----------------------------------------
        // 文档加载完成事件响应函数，必须保证这段脚本，在body元素加载完成后执行，否则body对象为空，即："Cannot set property 'onload' of null"
        //document.body.onload = bindEvent;
        //window.onload = onloadFinished;

        //----------------------------------------
        //  jquery
        //----------------------------------------
        // 方法一（jquery），文档加载完成事件响应函数
        /*$(document).ready(function(){
            alert("document is ready!");

            // $("#btn_clickme").onclick=testFunc;
            $("#btn_clickme").click(testFunc);
        });*/

        // 方法二（jquery），文档加载完成事件响应函数，推荐
        $(function () {
            //$("#btn_clickme").click(testFunc);
            onloadFinished();
        })