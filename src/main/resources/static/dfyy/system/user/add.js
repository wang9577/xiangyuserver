$("#form-user-add").validate({
	rules : {
		loginName : {
			required : true,
			minlength : 5,
			remote : {
				url : ctx + "system/user/checkUserNameUnique",
				type : "post",
				dataType : "text",
				data : {
					name : function() {
						return $.trim($("#loginName").val());
					}
				},
				dataFilter : function(data, type) {
					if (data == "0")
						return true;
					else
						return false;
				}
			}
		},
		userName : {
			required : true,
		},
		password : {
			required : true,
			minlength : 6
		},
		email : {
			required : true,
			email : true
		},
		phonenumber : {
			required : true,
			remote : {
				url : ctx + "system/user/selectPhone",
				type : "post",
				dataType : "text",
				data : {
					phonenumber : function() {
						return $.trim($("#phonenumber").val());
					}
				},
				dataFilter : function(data, type) {
					if (data == "1")
						return true;
					else
						return false;
				}
			}
		},
	},
	messages : {
		"loginName" : {
			remote : "用户已经存在"
		},
		"phonenumber" : {
			remote : "手机号已占用"
		}
	},
	submitHandler : function(form) {
		var phonenumber = $("#phonenumber").val();
		if (!(/^1[34578]\d{9}$/.test(phonenumber))) {
			alert("手机号码有误，请重填");
			return false;
		}
		add();
		/*$.post(
			'/system/user/selectPhone.json',
			{phonenumber : phonenumber},
			function(data) {
				if (data != "1") {
					layer.msg("该手机号已被占用！");
					return false;
				} else {
					add();
				}
			},
			"json"
		);*/
	}
});

function add() {
	var userId = $("input[name='userId']").val();
	var deptId = $("input[name='deptId']").val();
	var branchId = $("select[name='branchId']").val();
	var loginName = $("input[name='loginName']").val();
	var userName = $("input[name='userName']").val();
	var password = $("input[name='password']").val();
	var email = $("input[name='email']").val();
	var phonenumber = $("input[name='phonenumber']").val();
	var sex = $("input[name='sex']:checked").val();
	var status = $("input[name='status']").is(':checked') == true ? 0 : 1;
	var roleIds = $.getCheckeds("role");
	var postIds = $.getSelects("post");
	$.ajax({
		cache : true,
		type : "POST",
		url : ctx + "system/user/save",
		data : {
			"userId" : userId,
			"deptId" : deptId,
			"branchId" : branchId,
			"loginName" : loginName,
			"userName" : userName,
			"password" : password,
			"email" : email,
			"phonenumber" : phonenumber,
			"sex" : sex,
			"status" : status,
			"roleIds" : roleIds
		/*
		 * , "postIds" : postIds
		 */
		},
		async : false,
		error : function(request) {
			$.modalAlert("系统错误", "error");
		},
		success : function(data) {
			if (data.code == 0) {
				parent.layer.msg("新增成功,正在刷新数据请稍后……", {
					icon : 1,
					time : 500,
					shade : [ 0.1, '#fff' ]
				}, function() {
					$.parentReload();
				});
			} else {
				$.modalAlert(data.msg, "error");
			}

		}
	});
}

/* 用户管理-新增-选择部门树 */
function selectDeptTree() {
	var treeId = $("#treeId").val();
	var deptId = treeId == null || treeId == "" ? "100" : treeId;
	var url = ctx + "system/dept/selectDeptTree/" + deptId;
	layer_show("选择部门", url, '380', '380');
}
