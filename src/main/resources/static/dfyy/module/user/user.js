var prefix = ctx + "module/user"

$(function() {
	var columns = [{
            checkbox: true
        },
				{
			field : 'id', 
			title : '' 
		},
				{
			field : 'username', 
			title : '登录名' 
		},
				{
			field : 'password', 
			title : '密码' 
		},
				{
			field : 'type', 
			title : '1 教师 2 学生' 
		},
				{
			field : 'createTime', 
			title : '' 
		},
				{
			field : 'isdel', 
			title : '1 删除 2 未删除' 
		},
				{
			field : 'institutionId', 
			title : '院系' 
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

/*用户-新增*/
function add() {
    var url = prefix + '/add';
    layer_showAuto("新增用户", url);
}

/*用户-修改*/
function edit(id) {
    var url = prefix + '/edit/' + id;
    layer_showAuto("修改用户", url);
}

// 单条删除
function remove(id) {
	$.modalConfirm("确定要删除选中用户吗？", function() {
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
