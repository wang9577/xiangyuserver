package com.dfyy.project.system.dept.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.tomcat.util.http.fileupload.FileUploadBase.FileSizeLimitExceededException;
import org.springframework.http.HttpRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.dfyy.common.exception.file.FileNameLengthLimitExceededException;
import com.dfyy.common.utils.FileUploadUtils;
import com.dfyy.common.utils.IpUtils;
import com.dfyy.framework.config.DfyyConfig;



/**
 * 视频 控制层处理
 * 
 * @author zhdj
 * @date 2018-05-15
 */
@Controller
public class UploadController {

	@RequestMapping(value = "/ueditor")
	@ResponseBody
	public String ueditor(HttpServletRequest request, HttpServletResponse response) {
		/* 上传图片配置项 */
		String s = "{\n" + "            \"imageActionName\": \"uploadimage\",\n"
				+ "                \"imageFieldName\": \"file\", \n" + "                \"imageMaxSize\": 2048000, \n"
				+ "                \"imageAllowFiles\": [\".png\", \".jpg\", \".jpeg\", \".gif\", \".bmp\"], \n"
				+ "                \"imageCompressEnable\": true, \n"
				+ "                \"imageCompressBorder\": 1600, \n"
				+ "                \"imageInsertAlign\": \"none\", \n" + "                \"imageUrlPrefix\": \"\",\n"
				+ "                \"imagePathFormat\": \"/ueditor/jsp/upload/image/{yyyy}{mm}{dd}/{time}{rand:6}\" }";
		return s;

	}

	@RequestMapping(value = "/imgUpdate")
	@ResponseBody
	public String imgUpdate(MultipartFile file,HttpServletRequest request)
			throws FileSizeLimitExceededException, FileNameLengthLimitExceededException {
		if (file.isEmpty()) {
			return "error";
		}
		try {
			String ip = IpUtils.getIpAddr(request);
			if ("0:0:0:0:0:0:0:1".equals(ip.toString())) {
				ip="localhost";
			}
			System.err.println("ip:"+ip);
			 /*String path = this.getClass().getResource("").getPath();
			 String [] b = path.split("com");
			 String dir = b[0]+"static/uploadDir/";*/
			 String day = new SimpleDateFormat("yyyy/MM/dd").format(new Date());
			//String avatar = zhdjConfig.getImgfile()+day+"/"+FileUploadUtils.upload(zhdjConfig.getImgfile()+day+"/", file, ".jpg");
			 String avatar = day+"/"+FileUploadUtils.upload(DfyyConfig.getImgfile()+day+"/", file, ".jpg");
			 // "\"url\": \"http://127.0.0.1/img/profile_small.jpg\"," +    //图片路径
			String url2=request.getScheme()+"://"+ request.getServerName()+":"+request.getLocalPort()+"";
//			String url2=request.getScheme()+"://"+ request.getServerName();
			 /*String config = "{\"state\": \"SUCCESS\"," +        //是否成功状态
			            "\"url\": \"http://192.168.1.10:8085/imgfile/"+avatar+"\"," +    //图片路径
			            "\"title\": \" \"," +    //图片标题
			            "\"original\": \""+file.getOriginalFilename()+"\"}"; */  //图片原来的名字
			// String	avatar ="/uploadDir/"+day+"/"+ FileUploadUtils.upload(dir+day+"/", file, ".jpg");
			String config = "{\"state\": \"SUCCESS\"," +        //是否成功状态
		            "\"url\": \""+url2+"/imgfile/"+avatar+"\"," +    //图片路径
		            "\"title\": \" \"," +    //图片标题
		            "\"original\": \""+file.getOriginalFilename()+"\"}";   //图片原来的名字
			return config ;
		} catch (IllegalStateException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return "error";
	}
	
	//prizeid 图片绝对路径
		@RequestMapping("readImg")
		public void readImg(HttpServletResponse response, String prizeid) {

			FileInputStream fis= null;
			OutputStream out=null;
			try {
				out = response.getOutputStream();
				fis = new FileInputStream(new File(prizeid));
				byte[] buffer = new byte[1024*8];
				//读取文件流
				int len = 0;
				while ((len = fis.read(buffer)) != -1){
					out.write(buffer,0,len);
				}
				out.flush();
			} catch (Exception e) {
				e.printStackTrace();
			} finally {
				if(fis != null){
					try {
						fis.close();
					} catch (IOException e) {
						e.printStackTrace();
					}
				}
				if(out != null){
					try {
						out.close();
					} catch (IOException e) {
						e.printStackTrace();
					}
				}
			}
		}
		
		//链接地址是否有效
		@RequestMapping("strLink")
		@ResponseBody
		public String strLink(String strLink) {
			URL url;
			try {
				url = new URL(strLink);
				HttpURLConnection connt = (HttpURLConnection)url.openConnection();
				connt.setRequestMethod("HEAD");
				 String strMessage = connt.getResponseMessage();
				 if (strMessage.compareTo("Not Found") == 0) {
					 return "1";
				 }
				 connt.disconnect();								
			} catch (Exception e) { 
				return "1";
			}
			return "0";
		}

}
