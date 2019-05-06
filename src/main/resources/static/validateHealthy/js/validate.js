(function() {
	/**
	 * 所有类的基类，提供继承机制
	 */
	var initializing = false, fnTest = /xyz/.test(function() {xyz;}) ? /\b_super\b/ : /.*/;
	this.Class = function() {};
	Class.extend = function(prop) {
		var _super = this.prototype;
		initializing = true;
		var prototype = new this();
		initializing = false;
		for ( var name in prop) {
			prototype[name] = typeof prop[name] == "function" 
					&& typeof _super[name] == "function" && fnTest.test(prop[name]) ? 
				(function(name, fn) {
					return function() {
						var tmp = this._super;

						this._super = _super[name];

						var ret = fn.apply(this, arguments);
						this._super = tmp;

						return ret;
					};
				})(name, prop[name]) : prop[name];
		}
		function Class() {
			if (!initializing && this.init)
				this.init.apply(this, arguments);
		}
		Class.prototype = prototype;
		Class.prototype.constructor = Class;
		Class.extend = arguments.callee;
		return Class;
	};
})();
var validate = Class
		.extend({
			defaultCfg:{
				rules:{},
				submitFun:function(){},
				errorLabel:'<label style="color:red"></label>',
				errorFun:function(){}
			},
			init:function(cfg){				
				this.cfg = $.extend({},this.defaultCfg,cfg);
				this.flag=0;
				this.toAction(this);
				if(this.flag==0){
					for(var i in this.cfg.rules){
						$("#"+i).unbind("keyup");
					}
					this.cfg.submitFun();
				}
			},
			toAction:function(that){				
				for(var i in that.cfg.rules){
					this.toVal("#"+i,that.cfg.rules[i]);
				}
			},
			toVal:function(ele,constant){
				validateConstant[constant].test($(ele).val())?
					this.toRemoveError(ele):this.toShowError(ele,errorMsg[constant]);

			},
			toRemoveError:function(ele){
				var that = this;
				if($(ele).closest(".form-group").attr("not-allow")){
					$(ele).removeAttr("style").closest(".form-group").removeAttr("style")
							.removeAttr("not-allow");
					$(ele).next().remove();		
					$(ele).keyup(function(){
						ele = ele.replace("#","");
						that.toVal("#"+ele,that.cfg.rules[ele]);
					});							
				}				
			},
			toShowError:function(ele,message){
				var error = $(this.cfg.errorLabel).text(message);
				if(!$(ele).closest(".form-group").attr("not-allow")){
					$(ele).after(error);
					$(ele).css("border","1px solid red").closest(".form-group")
							.css("color","red").attr("not-allow","true");
					$(ele).keyup(function(){
						ele = ele.replace("#","");
						that.toVal("#"+ele,that.cfg.rules[ele]);
					});
				}	
				this.flag++;	
				var that = this;			
				
			}
		})
var validateConstant = {
	"notEmpty" : /^.+$/,// 合法字符
	"password" : /^[0-9A-Za-z]{1,18}$/,// 密码
	"rightfulString" : /^[A-Za-z0-9_-]+$/,// 合法字符
	"number" : /^\d+$/,// 数字
	"endlish" : /^[A-Za-z]+$/,// 纯英文
	"numberEnglish" : /^[A-Za-z0-9]+$/,// 英文和数字
	"float" : /^[+]?\d+(\.\d+)?$/,// 浮点型
	"money" : /(^[1-9]\d{0,9}(\.\d{1,2})?$)/,
	"chinese" : "/^[\u4e00-\u9fa5]+$/",// 纯中文
	"mobile" : /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(14[0-9]{1}))+\d{8})$/,// 手机号
	"tel" : /^(\d{3,4}-?)?\d{7,9}$/g,// 电话
	"qq" : /^[1-9]\d{4,12}$/,// qq
	"zipCode" : /^[0-9]{6}$/,// 邮政编码
	"email" : /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,// 邮箱
	"positive":/^[1-9][0-9]+$/,//大于0的数字
	"shenfen":/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,  //15位身份证
}
var errorMsg = {
	"notEmpty" : "不能为空",
	"password" : "请输入正确的密码",
	"rightfulString" : "请输入合法字符",// 合法字符
	"number" : "只能输入数字",// 数字
	"endlish" : "只能输入英文",// 纯英文
	"numberEnglish" : "只能输入英文或数字",// 英文和数字
	"float" : "只能输入小数",// 浮点型
	"money" : "请输入合法价格",
	"chinese" : "只能输入汉字",// 纯中文
	"mobile" : "请输入正确的手机号",// 手机号
	"tel" : "请输入正确的电话号码",// 电话
	"qq" : "请输入正确的QQ号",// qq
	"zipCode" : "请输入正确的QQ号",
	"email" : "请输入正确的邮箱",// 邮箱
	"positive":"请输入大于0的数字",//大于0的数字
    "shenfen" : "请输入正确的身份证号",// 校验身份证
}