$("#form-user-edit").validate({
	rules:{
		xxxx:{
			required:true,
		},
	},
	submitHandler:function(form){
		edit();
	}
});

function edit() {
    _ajax_save(ctx + "module/user/save", $('#form-user-edit').serialize());
}