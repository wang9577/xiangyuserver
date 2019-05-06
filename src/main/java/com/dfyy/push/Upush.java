package com.dfyy.push;

import com.dfyy.push.android.AndroidBroadcast;
import com.dfyy.push.android.AndroidUnicast;
import com.dfyy.push.ios.IOSBroadcast;
import com.dfyy.push.ios.IOSUnicast;

import java.util.HashMap;
import java.util.Map;


public class Upush {
	private String appkey ="5b07768ef43e48080c000011";
	private String appMasterSecret ="02njlzto5pymoaxrn3qxxzxcnzrgkh5v";
	/*private String deviceToken="e75c4c54e582f8ec9c32f0aa8f01d9abf76d707f856a64fbcacb128ebc1dd495";*/
	private String timestamp = null;
	private PushClient client = new PushClient();
	

	//Android全部推送  类型  type  1在线测评  2通知公告  3特殊党费   4党建风采   5活动/会议通知   6后台推送   7 视频    8讲话    9专题学习
	public void sendAndroidBroadcast(String count,String title,Map<String,String> map) throws Exception {
		AndroidBroadcast broadcast = new AndroidBroadcast("5b077233f43e481af30000ae","jn784mxipb9iuu2wpvgeqju2ndirjw1i");
		/*broadcast.setTicker( "这是一个测试问卷的推送");*/
		broadcast.setActivity("test");
		broadcast.setTitle(title);
		broadcast.setText(count);
		broadcast.goAppAfterOpen();
		broadcast.setDisplayType(AndroidNotification.DisplayType.NOTIFICATION);
		broadcast.setTestMode();
		map.forEach((key, value) -> {
			try {
				broadcast.setExtraField(key,value);
			} catch (Exception e) {
				e.printStackTrace();
			}
	      System.out.println(key + ":" + value);
	    });
		client.send(broadcast);
	}
	//Android单人推送  类型  type  1在线测评  2通知公告  3特殊党费   4党建风采   5活动/会议通知   6后台推送   7 视频    8讲话    9专题学习 10 唯一登录
	public void sendAndroidUnicast(String count,String title,String deviceToken, Map<String,String> map) throws Exception {
		AndroidUnicast unicast = new AndroidUnicast("5b077233f43e481af30000ae","jn784mxipb9iuu2wpvgeqju2ndirjw1i");
		unicast.setDeviceToken(deviceToken);
		/*unicast.setTicker( "这是一个测试问卷的推送");*/
		unicast.setActivity("text");
		unicast.setTitle(title);
		unicast.setText(count);
		unicast.goAppAfterOpen();
		unicast.setDisplayType(AndroidNotification.DisplayType.NOTIFICATION);
		unicast.setTestMode();
		map.forEach((key, value) -> {
			try {
				unicast.setExtraField(key,value);
			} catch (Exception e) {
				e.printStackTrace();
			}
	      System.out.println(key + ":" + value);
	    });
		client.send(unicast);
	}
	//ios全体推送  类型  type  1在线测评  2通知公告  3特殊党费   4党建风采   5活动/会议通知   6后台推送   7 视频    8讲话    9专题学习 
	public void sendIOSBroadcast(String count,Map<String,String> map) throws Exception {
		IOSBroadcast broadcast = new IOSBroadcast(appkey,appMasterSecret);
		broadcast.setAlert(count);
		broadcast.setBadge( 0);
		broadcast.setSound( "default");
		broadcast.setProductionMode();
		 map.forEach((key, value) -> {
				try {
					broadcast.setCustomizedField(key,value);
				} catch (Exception e) {
					e.printStackTrace();
				}
		      System.out.println(key + ":" + value);
		    });
		client.send(broadcast);
	}
	//ios单体推送  类型  type  1在线测评  2通知公告  3特殊党费   4党建风采   5活动/会议通知   6后台推送   7 视频    8讲话    9专题学习 10唯一登录
	public  void sendIOSUnicast(String count, Map<String, String> map,String deviceToken) throws Exception {
		IOSUnicast unicast = new IOSUnicast(appkey,appMasterSecret);
		unicast.setDeviceToken(deviceToken);
		unicast.setAlert(count);
		unicast.setBadge( 0);
		unicast.setSound( "default");
		unicast.setProductionMode();
		map.forEach((key, value) -> {
			try {
				unicast.setCustomizedField(key,value);
			} catch (Exception e) {
				e.printStackTrace();
			}
	      System.out.println(key + ":" + value);
	    });
		client.send(unicast);
	}
	public static void main(String[] args) throws Exception {
		Upush upush = new Upush();
		Map<String,String>map = new HashMap<>();
		map.put("type","3");
		map.put("countId","E201807099604");
		upush.sendAndroidBroadcast("这是内容","这是标题",map);
		
	}
	

}
