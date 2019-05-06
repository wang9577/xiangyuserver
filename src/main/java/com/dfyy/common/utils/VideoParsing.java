package com.dfyy.common.utils;
import java.util.HashMap;
import java.util.Map;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import com.qcloud.vod.VodApi;
import com.qcloud.vod.response.VodUploadCommitResponse;
import com.dfyy.framework.config.DfyyConfig;

/*import Decoder.BASE64Encoder;*/



public class VideoParsing {
	private final static String SecretId ="AKIDOeBbv4QoQuDKNFuQp5A3voX5RcfZ90Sj";		//腾讯云中secretId
	private final static String SecretKey = "EH8ThkcMyPm15zkPuENL8lpndKpBOQI0";		//腾讯云中secretId
	/*private long currentTime;
	private int random;
	private int signValidDuration;
	private static final String HMAC_ALGORITHM = "HmacSHA1";
	private static final String CONTENT_CHARSET = "UTF-8";
ss
	    public static byte[] byteMerger(byte[] byte1, byte[] byte2) {  
	        byte[] byte3 = new byte[byte1.length + byte2.length];
	        System.arraycopy(byte1, 0, byte3, 0, byte1.length);
	        System.arraycopy(byte2, 0, byte3, byte1.length, byte2.length);
	        return byte3;
	    }

	    public String getUploadSignature() throws Exception {
	        String strSign = "";
	        String contextStr = "";

	        long endTime = (currentTime + signValidDuration);
	        contextStr += "secretId=" + java.net.URLEncoder.encode(SecretId, "utf8");
	        contextStr += "&currentTimeStamp=" + currentTime;
	        contextStr += "&expireTime=" + endTime;
	        contextStr += "&random=" + random;

	        try {
	            Mac mac = Mac.getInstance(HMAC_ALGORITHM);
	            SecretKeySpec secretKey = new SecretKeySpec(this.SecretKey.getBytes(CONTENT_CHARSET), mac.getAlgorithm());
	            mac.init(secretKey);

	            byte[] hash = mac.doFinal(contextStr.getBytes(CONTENT_CHARSET));
	            byte[] sigBuf = byteMerger(hash, contextStr.getBytes("utf8"));
	            strSign = new String(new BASE64Encoder().encode(sigBuf).getBytes());
	            strSign = strSign.replace(" ", "").replace("\n", "").replace("\r", "");
	        } catch (Exception e) {
	            throw e;
	        }
	        return strSign;
	    }


	    public void setCurrentTime(long currentTime) {
	        this.currentTime = currentTime;
	    }

	    public void setRandom(int random) {
	        this.random = random;
	    }

	    public void setSignValidDuration(int signValidDuration) {
	        this.signValidDuration = signValidDuration;
	    }*/
	
	  
	    
	/**
	 * 视频解析上传腾讯云（返回url参数）
	 * @param mm
	 * @return
	 * @throws Exception
	 * boolean
	 * @author xushijie
	 * @time 2018年2月7日下午4:08:46
	 */
	public static Map<String,Object> getVideoParam(Map<String,Object> mm) throws Exception{
		VodApi vodApi = new VodApi(SecretId,SecretKey);
		Map<String,Object>  m = new HashMap<String,Object>();
		VodUploadCommitResponse response = vodApi.upload(mm.get("filePath").toString());
		System.out.println("-----------"+response);
		m.put("videoUrl", response.getVideo().getUrl());	//视频返回url
		m.put("fileId", response.getFileId());	//对应腾讯云视频管理视频id
		m.put("response", response);
		return m;
	}
}
