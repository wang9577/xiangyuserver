package com.dfyy.common.utils;

public class DataDictionary {
	
	/**
	 * 获得验证码类型
	 * @param type
	 * @return
	 */
	public static String getCodeType(String type){
        String typestr=type;       
        switch (typestr) {
        	case "0":// 登陆验证
	            typestr="loginCode";
	            break;
            case "1":// 注册验证
                typestr="registerCode";
                break;
            case "2":// 手机号重置
                typestr="resetCode";
                break;  
            case "3":// 绑定手机号验证
                typestr="mobileBind";
                break; 
            case "4":// 手机号码校验
                typestr="checkMobileCode";
                break; 
            case "5":// 活动通知
                typestr="activityNewsSend";
                break;
            case "6":// 会员到期通知
                typestr="membershipDue";
                break;
            case "7":// 开通会员通知
                typestr="openMemberDue";
                break;
            }
        return typestr;
    }  
}
