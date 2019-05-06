var prefix = ctx + "module/institution"

$(function() {
    var columns = [{
        checkbox: true
    },
        {
            field : 'id',
            title : 'id'
        },
        {
            field : 'name',
            title : '院系名称'
        },
        {
            field : 'isDel',
            title : '是否删除',
            align: 'center',
            formatter: function(value, row, index) {
                if (value == 1) {
                    return '<span class="label label-danger">删除</span>';
                } else if (value == 2) {
                    return '<span class="label label-success">正常</span>';
                }
            }
        },
        {
            title: '操作',
            align: 'center',
            formatter: function(value, row, index) {
                var actions = [];
                actions.push('<a class="btn btn-primary btn-sm ' + editFlag + '" href="#" title="编辑" mce_href="#" onclick="edit(\'' + row.id + '\')"><i class="fa fa-edit"></i></a> ');
                actions.push('<a class="btn btn-warning btn-sm ' + removeFlag + '" href="#" title="删除" onclick="remove(\'' + row.id + '\')"><i class="fa fa-remove"></i></a>');
                return actions.join('');
            }
        }];
    var url = prefix + "/list";
    $.initTable(columns, url);
});

/*院系-新增*/
function add() {
    var url = prefix + '/add';
    layer_showAuto("新增院系", url);
}

/*院系-修改*/
function edit(id) {
    var url = prefix + '/edit/' + id;
    layer_showAuto("修改院系", url);
}

// 单条删除
function remove(id) {
    $.modalConfirm("确定要删除选中院系吗？", function() {
        _ajax(prefix + "/remove/" + id, "", "post");
    })
}

// 批量删除
function batchRemove() {
    var rows = $.getSelections("id");
    if (rows.length == 0) {
        $.modalMsg("请选择要删除的数据", "warning");
        return;
    }
    $.modalConfirm("确认要删除选中的" + rows.length + "条数据吗?", function() {
        _ajax(prefix + '/batchRemove', { "ids": rows }, "post");
    });
}
