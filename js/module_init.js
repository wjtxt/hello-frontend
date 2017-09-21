// define([
//     'libs/jquery-3.2.1', 'libs/ztree/jquery.ztree.all'
// ], function (jq, zt) {
define([
    'module_bstable',
    'module_tree'
],function(bstable,tree){
    return {
        init: function () {

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
                var newNode = document.body.appendChild(btn);
                newNode.onclick = function () {
                    alert('you click new button！');
                };

                return function () {
                    alert("111-222-333");
                }
            };

            // 定义1个名为onClickTest的函数
            function onClickTest() {
                //alert('你点的是测试按钮！');
                var username = $('#tb_username').prop('value');
                var password = $('#tb_password').prop('value');
                var queryString = '用户名：' + username + '，密码：' + password;
                alert(queryString);
            }

            // 初始化mix_pane页面
            function initMixPane() {
                //document.getElementById("btn_clickme").onclick = onClickMe;
                $("#btn_clickme").click(onClickMe);
                $('#btn_test').click(onClickTest);

                // document.getElementById("btn_clickme").onmouseover = function () {
                //     // alert("onmouseover!");
                //     document.getElementById("btn_clickme").setAttribute("value", "ok");;
                // };
                $('#btn_clickme').mouseenter(function () {
                    // $('#btn_clickme').setAttribute('value','ok');
                    $('#btn_clickme').attr('value', 'ok');
                });

                // document.getElementById("btn_clickme").onmouseout = function () {
                //     document.getElementById("btn_clickme").setAttribute("value", "点我");
                // };
                $('#btn_clickme').mouseleave(function () {
                    // $('btn_clickme').setAttribute('value','点我');
                    $('#btn_clickme').attr('value', '点我');
                })
            }

            // 初始化环境
            function initSys() {
                $('.tooltip-check').mouseover(function () {
                    $(this).tooltip('show')
                })
                $('.tooltip-check').mouseout(function () {
                    $(this).tooltip('hide')
                })
            }

            // 初始化
            function initAll() {
                console.debug('init page begin');

                initSys();
                initMixPane();

                tree.initTree();
                bstable.initTable();
            }

            // 定义绑定控件事件的函数
            function onloadFinished() {
                initAll();
            };

            // 初始化页面
            initAll();
        }
    }
});