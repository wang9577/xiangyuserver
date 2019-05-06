$("#form-user-add").validate({
	rules:{
		xxxx:{
			required:true,
		},
	},
	submitHandler:function(form){
		add();
	}
});

function add() {
    _ajax_save(ctx + "module/user/save", $('#form-user-add').serialize());
}