$("#form-institution-add").validate({
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
    _ajax_save(ctx + "module/institution/save", $('#form-institution-add').serialize());
}