package com.dfyy.common.utils;

import com.github.qcloudsms.SmsMultiSender;
import com.github.qcloudsms.SmsMultiSenderResult;
import com.github.qcloudsms.SmsSingleSender;
import com.github.qcloudsms.SmsSingleSenderResult;
import com.github.qcloudsms.httpclient.HTTPException;
import org.json.JSONException;

import java.io.IOException;
import java.util.ArrayList;


public class QcloudSms {


        // 短信应用SDK AppID
	 private static int appid =1400152728; // 1400开头
        // 短信应用SDK AppKey
        private static String appkey = "60ac67c78ab4d2fe9b8125174f3dffb9";

        // 短信模板ID，需要在短信应用中申请
        // NOTE: 这里的模板ID`7839`只是一个示例，
        // 真实的模板ID需要在短信控制台中申请
        private static int templateId = 158243;

        // 签名
        // NOTE: 这里的签名"腾讯云"只是一个示例，
        // 真实的签名需要在短信控制台中申请，另外
        // 签名参数使用的是`签名内容`，而不是`签名ID`
        private static String smsSign = "三伏天短信";

        // 单发短信
        public static String df(String phone,String Code) {
            try {
                SmsSingleSender ssender = new SmsSingleSender(1400090207, "78cebde322a37875a25a9e0e0447b3d6");
                SmsSingleSenderResult result = ssender.send(0, "86", phone,
                        "您的验证码是: "+Code, "", "");
                System.out.print(result);
            } catch (HTTPException e) {
                // HTTP响应码错误
                e.printStackTrace();
            } catch (JSONException e) {
                // json解析错误
                e.printStackTrace();
            } catch (IOException e) {
                // 网络IO错误
                e.printStackTrace();
            }
                return "1";
        }
        /**
         * 发送模板消息 单条
         * @param phone
         * @param tempId
         * @param params
         * void
         * @author zpl
         * @time 2018年11月29日上午10:06:08
         */
        public static void sendSms(String phone, int tempId,ArrayList<String> params) {
        	 SmsSingleSender ssender = new SmsSingleSender(appid, appkey);
        	 try {
        		 SmsSingleSenderResult result = ssender.sendWithParam( "86", phone,
        				 tempId,params, "", "","");
        		 System.err.println("result:"+result);
			} catch (Exception e) {
				e.printStackTrace();
			}
        	 
        	 
    		}
        
        // 指定模板ID单发短信
        public static String dmfb(String[] phone) {
            try {
                String[] params = {"5678"};
                SmsMultiSender msender = new SmsMultiSender(appid, appkey);
                SmsMultiSenderResult result = msender.sendWithParam("86", phone,
                        templateId, params, smsSign, "", "");  // 签名参数未提供或者为空时，会使用默认签名发送短信
                System.out.print(result);
            } catch (HTTPException e) {
                // HTTP响应码错误
                e.printStackTrace();
            } catch (JSONException e) {
                // json解析错误
                e.printStackTrace();
            } catch (IOException e) {
                // 网络IO错误
                e.printStackTrace();
            }
            return "1";
        }
     
      


}
