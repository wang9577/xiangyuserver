$("#form-institution-edit").validate({
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
    _ajax_save(ctx + "module/institution/save", $('#form-institution-edit').serialize());
}