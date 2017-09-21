define([

], function () {
    return {
        initTree: function () {
            
            function init() {

                var zTreeObj;

                // zTree 的参数配置，深入使用请参考 API 文档（setting 配置详解）
                function zTreeOnClick(event, treeId, treeNode) {
                    alert(treeNode.id + ", " + treeNode.name + ',' + treeNode.custom);
                };
                // function zTreeOnClick() {
                //     alert('hello world!');
                // };

                var setting = {
                    callback: {
                        onClick: zTreeOnClick
                    }
                };

                // zTree 的数据属性，深入使用请参考 API 文档（zTreeNode 节点数据详解）
                var zNodes = [{
                        name: "pds",
                        open: true,
                        children: [{
                                name: "be",
                                id: 1,
                                custom: 'hello'
                            },
                            {
                                name: "bw",
                                id: 2,
                                custom: 'hello'
                            }
                        ]
                    },
                    {
                        name: "express",
                        open: true,
                        children: [{
                                name: "mds",
                                id: 3,
                                custom: 'hello'
                            },
                            {
                                name: "apps",
                                id: 4,
                                custom: 'hello'
                            }
                        ]
                    },
                    {
                        name: "bimapp",
                        open: true,
                        children: [{
                                name: "steel",
                                id: 5,
                                custom: '钢筋'
                            },
                            {
                                name: 'architecture',
                                id: 7,
                                custom: '土建'
                            },
                            {
                                name: 'mep',
                                id: 6,
                                custom: '安装'
                            }
                        ]
                    }
                ];

                zTreeObj = $.fn.zTree.init($("#tree"), setting, zNodes)
                // if(typeof($.fn.zTree) != 'undefined')
                //     zTreeObj = $.fn.zTree.init($("#tree"), setting, zNodes)
                // else 
                //     console.log('zTree load failed!');
            }

            init();
        }
    }
});