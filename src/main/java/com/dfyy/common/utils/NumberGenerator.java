package com.dfyy.common.utils;

import org.springframework.beans.factory.annotation.Autowired;

import java.io.IOException;
import java.sql.*;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Properties;
import java.util.Random;
import java.util.UUID;

/**
 * 编号生成器
 * 使用之前确保oracle中存在SEQ_QUESTIONNAIRE这个序列
 * 创建语句	--CREATE SEQUENCE SEQ_QUESTIONNAIRE INCREMENT BY 1 START WITH 1 MAXVALUE 99999999 NOCYCLE NOCACHE;
 * 删除语句	--DROP SEQUENCE SEQ_QUESTIONNAIRE;
 * 查询语句	--select SEQ_QUESTIONNAIRE.CURRVAL,SEQ_QUESTIONNAIRE.NEXTVAL from dual;
 * @author gao
 */
public class NumberGenerator {
	
	@Autowired
	public static int count1;
	public static Boolean boolean1=false;
	
	/**
	 * uuid编号
	 * @return
	 */
	public static String getUUID() {
		return UUID.randomUUID().toString().replace("-", "");
	}
	/**
	 * 问卷编号
	 * wj+5位递增数字，例如：wj00001
	 * @return
	 */
	public static String getQuestionnaire() {
		return "T"+new SimpleDateFormat("yyyMMdd").format(new Date())+randomStr(4);
	}
	/**
	 * 消息编号
	 * wj+5位递增数字，例如：wj00001
	 * @return
	 */
	public static String getxx() {
		return "XX"+new SimpleDateFormat("yyyMMdd").format(new Date())+randomStr(4);
	}
	/**
	 * 教练编号
	 * wj+5位递增数字，例如：wj00001
	 * @return
	 */
	public static String getCoach() {
		return "C"+new SimpleDateFormat("yyyMMdd").format(new Date())+randomStr(4);
	}
	/**
	 * 商品编号
	 * wj+5位递增数字，例如：wj00001
	 * @return
	 */
	public static String getCurriculum() {
		return "CO"+new SimpleDateFormat("yyyMMdd").format(new Date())+randomStr(4);
	}

	/**
	 * 健康档案编号
	 * wj+5位递增数字，例如：wj00001
	 * @return
	 */
	public static String getHealthy() {
		return "JK"+new SimpleDateFormat("yyyMMdd").format(new Date())+randomStr(4);
	}

	/**
	 * 非健康指标_医学影像上传
	 * wj+5位递增数字，例如：wj00001
	 * @return
	 */
	public static String getF() {
		return "F"+new SimpleDateFormat("yyyMMdd").format(new Date())+randomStr(4);
	}

	/**
	 * 亚健康指标_医学影像上传
	 * wj+5位递增数字，例如：wj00001
	 * @return
	 */
	public static String getFy() {
		return "FY"+new SimpleDateFormat("yyyMMdd").format(new Date())+randomStr(4);
	}

	/**
	 * 体检报告上传
	 * wj+5位递增数字，例如：wj00001
	 * @return
	 */
	public static String getFe() {
		return "FE"+new SimpleDateFormat("yyyMMdd").format(new Date())+randomStr(4);
	}
	
	/**
	 * 视频编号
	 */
	public static String getVideoNum() {
		return "V"+new SimpleDateFormat("yyyMMdd").format(new Date())+randomStr(4);
	}

	/**
	 * 视频编号
	 */
	public static String getRechargeSetting() {
		return "RS"+new SimpleDateFormat("yyyMMdd").format(new Date())+randomStr(4);
	}

	/**
	 * 感悟编号
	 */
	public static String getViewpoint() {
		return "VP"+new SimpleDateFormat("yyyMMdd").format(new Date())+randomStr(4);
	}

	/**
	 * 感悟图片编号
	 */
	public static String getViewpointPicture() {
		return "GWT"+new SimpleDateFormat("yyyMMdd").format(new Date())+randomStr(4);
	}
	
	/**
	 * 图片编号
	 */
	public static String getPictureUrlNum() {
		return "PU"+new SimpleDateFormat("yyyMMdd").format(new Date())+randomStr(4);
	}
	
	/**
	 * 分馆介绍图片编号
	 */
	public static String getBranchUrlNum() {
		return "BR"+new SimpleDateFormat("yyyMMdd").format(new Date())+randomStr(4);
	}
	
	/**
	 * 商品封面编号
	 * wj+5位递增数字，例如：wj00001
	 * @return
	 */
	public static String getCoverUrl() {
		return "FM"+new SimpleDateFormat("yyyMMdd").format(new Date())+randomStr(4);
	}
	/**
	 * 商品课程图编号
	 * wj+5位递增数字，例如：wj00001
	 * @return
	 */
	public static String getCurriculumCoverId() {
		return "KC"+new SimpleDateFormat("yyyMMdd").format(new Date())+randomStr(4);
	}
	/**
	 * 业务员编号
	 * wj+5位递增数字，例如：wj00001
	 * @return
	 */
	public static String getSalesman() {
		return "SA"+new SimpleDateFormat("yyyMMdd").format(new Date())+randomStr(4);
	}
	
	/**
	 * 客服编号
	 * SV+5位递增数字，例如：SV00001
	 * @return
	 */
	public static String getSalesmanForService() {
		return "SV"+new SimpleDateFormat("yyyMMdd").format(new Date())+randomStr(4);
	}
	
	/**
	 * 用户编号
	 * u+年月日+四位递增数
	 * @return
	 */
	public static String getUser() {
		return "U"+new SimpleDateFormat("yyyMMdd").format(new Date())+randomStr(4);
	}
	/**
	 * 订单编号
	 * O+年月日+四位随机数
	 * @return
	 */
	public static String getOrderNumver() {
		return "O"+new SimpleDateFormat("yyyMMdd").format(new Date())+randomStr(4);
	}
	/**
	 * 视频编号
	 * 年月日+四位随机数
	 * @return
	 */
	public static String getVideo() {
		return "V"+new SimpleDateFormat("yyyMMdd").format(new Date())+randomStr(4);
	}
	/**
	 * 视频编号
	 * 年月日+四位随机数
	 * @return
	 */
	public static String getSpeak() {
		return "S"+new SimpleDateFormat("yyyMMdd").format(new Date())+randomStr(4);
	}
	/**
	 * 思想汇报编号
	 * @return
	 * String
	 * @author zpl
	 * @time 2018年5月16日下午3:44:50
	 */
	public static String getThinking() {
		return "H"+new SimpleDateFormat("yyyMMdd").format(new Date())+randomStr(4);
	}
	/**
	 *会议纪要编号
	 * @return
	 * String
	 * @author zpl
	 * @time 2018年5月16日下午3:44:50
	 */
	public static String getMetting() {
		return "M"+new SimpleDateFormat("yyyMMdd").format(new Date())+randomStr(4);
	}
	/**
	 * 分润编号
	 * @return
	 * String
	 * @author zpl
	 * @time 2018年9月27日下午2:07:00
	 */
	public static String getFenRun() {
		return "F"+new SimpleDateFormat("yyyMMdd").format(new Date())+randomStr(4);
	}
	
	/**
	 * 结算编号
	 * @return
	 * String
	 * @author zpl
	 * @time 2018年11月10日下午4:07:05
	 */
	public static String getJS() {
		return "R"+new SimpleDateFormat("yyyMMdd").format(new Date())+randomStr(4);
	}
	/**
	 * 活动编号
	 * @return
	 */
	public static String getActivity() {
		return "A"+new SimpleDateFormat("yyyMMdd").format(new Date())+randomStr(4);
	}
	
	/**
	 * 公司动态编号
	 * @return
	 */
	public static String getCompanynews() {
		return "CN"+new SimpleDateFormat("yyyMMdd").format(new Date())+randomStr(4);
	}
	
	/**
	 * 四位随机数
	 * @return
	 * String
	 * @author zpl
	 * @time 2018年11月26日下午2:16:12
	 */
	public static String randomStr() {
		return randomStr(4);
	}
	/**
	 * 获取随机字符串
	 * @param length
	 * @return
	 */
	public static String randomStr(int length) {
		StringBuffer sb= new StringBuffer();
		Random random = new Random();//默认构造使用系统时间纳秒值作为种子
		for(int i=0;i<length;i++) {
			sb.append(random.nextInt(10));
		}
		return sb.toString();
	}
		
	
	/**
	 * 查询序列值
	 * @return
	 */
	public static Sequence querySequence(String sequenceName) {
		String sql = "SELECT "+sequenceName+".CURRVAL,"+sequenceName+".NEXTVAL FROM DUAL";
		Properties properties= new Properties();
		try {
			properties.load(NumberGenerator.class.getResourceAsStream("/config/project.properties"));
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
		// Class.forName(properties.getProperty("jdbc.driver"));现在不加载驱动就可以获取数据库连接了？
		try (Connection conn = DriverManager.getConnection(properties.getProperty("jdbc.url"), properties.getProperty("jdbc.username"), properties.getProperty("jdbc.password"));
				Statement stmt = conn.createStatement();
				ResultSet rs = stmt.executeQuery(sql);) {
			if(rs.next()) {
				//System.out.println("CURRVAL: " + rs.getInt("CURRVAL"));
				//System.out.println("NEXTVAL: " + rs.getInt("NEXTVAL"));
				Sequence sequence= new Sequence();
				sequence.setCurrval(rs.getInt("CURRVAL"));
				sequence.setNextval(rs.getInt("NEXTVAL"));
				return sequence;
			}else {
				return null;
			}
		} catch (SQLException e) {
			throw new RuntimeException(e);
		}
	}
	/**
	 * 序列静态内部类
	 * @author gao
	 *
	 */
	static class Sequence {
		private int currval;
		private int nextval;

		public int getCurrval() {
			return currval;
		}

		public void setCurrval(int currval) {
			this.currval = currval;
		}

		public int getNextval() {
			return nextval;
		}

		public void setNextval(int nextval) {
			this.nextval = nextval;
		}

		@Override
		public String toString() {
			return "Sequence [currval=" + currval + ", nextval=" + nextval + "]";
		}
		
	}
}
