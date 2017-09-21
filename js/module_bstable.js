define([], function () {
    return {
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

                console.debug('on responseHandler()!');

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
                   // responseHandler: responseHandler,
                    columns: columns,
                    onLoadSuccess: function (data) { //加载成功时执行

                        console.debug('on onLoadSuccess()!');
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
        },

        initTableEx: function () {

            console.debug('init start...');

            $('#receiveLogs-table').bootstrapTable({
                url: '../data/data.json', // 请求数据源的路由
                dataType: "json",
                pagination: true, //前端处理分页
                singleSelect: false, //是否只能单选
                search: true, //显示搜索框，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
                toolbar: '#toolbar', //工具按钮用哪个容器
                striped: true, //是否显示行间隔色
                cache: false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
                pageNumber: 1, //初始化加载第10页，默认第一页
                pageSize: 10, //每页的记录行数（*）
                pageList: [10, 20, 50, 100], //可供选择的每页的行数（*）
                strictSearch: true, //设置为 true启用 全匹配搜索，false为模糊搜索
                showColumns: true, //显示内容列下拉框
                showRefresh: true, //显示刷新按钮
                minimumCountColumns: 2, //当列数小于此值时，将隐藏内容列下拉框
                clickToSelect: true, //设置true， 将在点击某行时，自动勾选rediobox 和 checkbox
                // {#height: 500, //表格高度，如果没有设置height属性，表格自动根据记录条数决定表格高度#}
                // uniqueId: "id", //每一行的唯一标识，一般为主键列
                // showToggle: true, //是否显示详细视图和列表视图的切换按钮
                // cardView: false, //是否显示详细视图
                // {#        detailView: true, //是否显示父子表，设置为 true 可以显示详细页面模式,在每行最前边显示+号#}
                sidePagination: "server", //分页方式：client客户端分页，server服务端分页（*）
                columns: [{ //定义表头,这个表头必须定义,下边field后边跟的字段名字必须与后端传递的字段名字相同.如:id、name、price跟后端的字段名id  name price是完全一样的.

                    field: 'id',
                    title: '序号',
                    align: 'center', //对齐方式，居中
                    // {#                width: '200px'  // 可以写各种样式#}

                }, {
                    field: 'name',
                    title: '名称',
                    align: 'center'
                }, {
                    field: 'price',
                    title: '价格',
                    align: 'center',

                }, {
                    title: '操作',
                    field: 'id',
                    align: 'center',
                    formatter: function (value, row, index) {
                        var e = '<a href="#" mce_href="#" onclick="edit(\'' + row.id + '\')">编辑</a> '; //row.id为每行的id
                        var d = '<a href="#" mce_href="#" onclick="del(\'' + row.id + '\')">删除</a> ';
                        return e + d;
                    }
                }],
            })
        }
    }
});