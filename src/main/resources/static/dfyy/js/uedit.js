/**
 * 菜单处理
 */
	$(function(){
        var ue = UE.getEditor('contents', {
        	toolbars: [
        	    [
        	        'bold', // 加粗
        	        'indent', // 首行缩进
        	        'italic', // 斜体
        	        'underline', // 下划线
        	        'strikethrough', // 删除线
        	        'subscript', // 下标
        	        'fontborder', // 字符边框
        	        'superscript', // 上标
        	        'formatmatch', // 格式刷
        	        'pasteplain', // 纯文本粘贴模式
        	        'selectall', // 全选
        	        'preview', // 预览
        	        'horizontal', // 分隔线
        	        'removeformat', // 清除格式
        	        'time', // 时间
        	        'date', // 日期
        	        'cleardoc', // 清空文档
        	        'fontfamily', // 字体
        	        'fontsize', // 字号
        	        'paragraph', // 段落格式
        	        'edittd', // 单元格属性
        	        'emotion', // 表情
        	        'spechars', // 特殊字符
        	        'searchreplace', // 查询替换
        	        'justifyleft', // 居左对齐
        	        'justifyright', // 居右对齐
        	        'justifycenter', // 居中对齐
        	        'justifyjustify', // 两端对齐
        	        'forecolor', // 字体颜色
        	        'backcolor', // 背景色
        	        'insertorderedlist', // 有序列表
        	        'insertunorderedlist', // 无序列表
        	        'fullscreen', // 全屏
        	        'customstyle', // 自定义标题
        	        'simpleupload', //单图上传
        	    ]
        ],
        	elementPathEnabled : false,　　// 是否启用元素路径，默认是true显示
            wordCount:false
        });   
    }); 
