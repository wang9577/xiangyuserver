package com.dfyy.common.utils;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;
import java.util.TimeZone;
import java.util.Vector;

/**
 * @ClassName: DateTools
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author WangQuanYong
 * @date 2015年03月22日 上午9:35:58
 * 
 */

/**
 * @author Administrator
 *
 */
public class DateTools {
	/**
	 * yyyy-MM-dd HH:mm:ss 格式
	 */
	public static final String FORMAT_STYLE_1 = "yyyy-MM-dd HH:mm:ss";
	
	/**
	 * yyyy-MM-dd 格式
	 */
	public static final String FORMAT_STYLE_2 = "yyyy-MM-dd";
    /**
	 * @Title: getDayOfYear
	 * @Description: 根据日期获取一年中第几天
	 * @param date
	 * @return
	 * @return int
	 * @throws
	 */
	public static int getDayOfYear(Date date) {
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		return c.get(Calendar.DAY_OF_YEAR);
	}

	/**
	 * @Title: getDayOfMonth
	 * @Description: 根据日期获取一月中第几天
	 * @param date
	 * @return
	 * @return int
	 * @throws
	 */
	public static int getDayOfMonth(Date date) {
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		return c.get(Calendar.DAY_OF_MONTH);
	}

	/**
	 * @Title: getDayOfNum
	 * @Description: 根据一年中天数，获取日期
	 * @param days
	 * @return
	 * @return Date
	 * @throws
	 */
	public static Date getDayOfNum(int days) {
		Calendar c = Calendar.getInstance();
		c.set(Calendar.DAY_OF_YEAR, days);
		return c.getTime();
	}

	public static int getYear(Date date) {
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		return c.get(Calendar.YEAR);
	}

	public static int getMonth(Date date) {
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		return c.get(Calendar.MONTH) + 1;
	}

	/**
	 * @Title: getHourOfDay
	 * @Description: TODO
	 * @param date
	 * @return
	 * @return int
	 * @throws
	 */
	public static int getHourOfDay(Date date) {
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		return c.get(Calendar.HOUR_OF_DAY);
	}

	/**
	 * @Title: getMinuteOfDay
	 * @Description: TODO
	 * @param date
	 * @return
	 * @return int
	 * @throws
	 */
	public static int getMinuteOfDay(Date date) {
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		return c.get(Calendar.MINUTE);
	}

	/**
	 * @Title: getDateBefore
	 * @Description: 得到几天前的时间
	 * @param d
	 * @param day
	 * @return
	 * @return Date
	 * @throws
	 */
	public static Date getDateBefore(Date d, int day) {
		Calendar now = Calendar.getInstance();
		now.setTime(d);
		now.set(Calendar.DATE, now.get(Calendar.DATE) - day);
		return now.getTime();
	}

	/**
	 * @Title: getSubHour
	 * @Description: 减去多少小时
	 * @param d
	 * @param hour
	 * @return
	 * @return Date
	 * @throws
	 */
	public static Date getSubHour(Date d, int hour) {
		Calendar now = Calendar.getInstance();
		now.setTime(d);
		now.add(Calendar.HOUR_OF_DAY, -hour);
		return now.getTime();
	}

	public static Date setHour(Date d, int hour) {
		Calendar now = Calendar.getInstance();
		now.setTime(d);
		now.set(Calendar.HOUR_OF_DAY, hour);
		// now.add(Calendar.HOUR_OF_DAY, -hour);
		return now.getTime();
	}

	public static Date setDay(Date d, int day) {
		Calendar now = Calendar.getInstance();
		now.setTime(d);
		now.set(Calendar.DAY_OF_MONTH, day);
		// now.add(Calendar.HOUR_OF_DAY, -hour);
		return now.getTime();
	}

	public static Date setYear(Date d, int Year) {
		Calendar now = Calendar.getInstance();
		now.setTime(d);
		now.set(Calendar.YEAR, Year);
		// now.add(Calendar.HOUR_OF_DAY, -hour);
		return now.getTime();
	}

	public static Date setMin(Date d, int min) {
		Calendar now = Calendar.getInstance();
		now.setTime(d);
		now.set(Calendar.MINUTE, min);
		// now.add(Calendar.HOUR_OF_DAY, -hour);
		return now.getTime();
	}

	public static Date setSec(Date d, int sec) {
		Calendar now = Calendar.getInstance();
		now.setTime(d);
		now.set(Calendar.SECOND, sec);
		// now.add(Calendar.HOUR_OF_DAY, -hour);
		return now.getTime();
	}

	/**
	 * @Title: getSubMinute
	 * @Description: 减去多少分钟
	 * @param d
	 * @param minute
	 * @return
	 * @return Date
	 * @throws
	 */
	public static Date getSubMinute(Date d, int minute) {
		Calendar now = Calendar.getInstance();
		now.setTime(d);
		now.add(Calendar.MINUTE, -minute);
		return now.getTime();
	}

	/**
	 * @Title: getDateAfter
	 * @Description: 得到几天后的时间
	 * @param d
	 * @param day
	 * @return
	 * @return Date
	 * @throws
	 */
	public static Date getDateAfter(Date d, int day) {
		Calendar now = Calendar.getInstance();
		now.setTime(d);
		now.set(Calendar.DATE, now.get(Calendar.DATE) + day);
		return now.getTime();
	}

	/**
	 * @Title: getAddYear
	 * @Description: 日期增加年
	 * @param d
	 * @param year
	 * @return Date 返回类型
	 * @throws
	 */
	public static Date getAddYear(Date d, int year) {
		Calendar now = Calendar.getInstance();
		now.setTime(d);
		now.add(Calendar.YEAR, year);
		return now.getTime();
	}
	/** 
	* @Title: getAddMonth 
	* @Description: 日期
	* @param d
	* @param month
	* @return Date    返回类型 
	* @throws 
	*/
	public static Date getAddMonth(Date d, int month) {
		Calendar now = Calendar.getInstance();
		now.setTime(d);
		now.add(Calendar.MONTH, month);
		return now.getTime();
	}
	/**
	 * @Title: getAddHour
	 * @Description: 日期增加多少小时
	 * @param d
	 * @param hour
	 * @return
	 * @return Date
	 * @throws
	 */
	public static Date getAddHour(Date d, int hour) {
		Calendar now = Calendar.getInstance();
		now.setTime(d);
		now.add(Calendar.HOUR_OF_DAY, hour);
		return now.getTime();
	}

	/**
	 * @Title: getAddMinute
	 * @Description: 日期增加多少分钟
	 * @param d
	 * @param minute
	 * @return
	 * @return Date
	 * @throws
	 */
	public static Date getAddMinute(Date d, int minute) {
		Calendar now = Calendar.getInstance();
		now.setTime(d);
		now.add(Calendar.MINUTE, minute);
		return now.getTime();
	}

	/**
	 * @Title: getDifferDays
	 * @Description: 两日期相差天数
	 * @param largeDate
	 * @param smallDate
	 * @return
	 * @return long
	 * @throws
	 */
	public static long getDifferDays(Date largeDate, Date smallDate) {
		long quot = getDifferMilliseconds(largeDate, smallDate);
		quot = quot / 1000 / 60 / 60 / 24;
		return quot;
	}
	
    /**
     * @Title: getDifferRealDays
     * @Description: 两日期相差天数 例如2005-09-28 23:59:59与2005-09-29 00:00:00相差一天
     * @param largeDate
     * @param smallDate
     * @return
     * @return long
     * @throws
     */
    public static long getDifferRealDays(Date largeDate, Date smallDate) {
        SimpleDateFormat format=new SimpleDateFormat("yyyy-MM-dd");

        try {
            largeDate = format.parse(format.format(largeDate));
            smallDate = format.parse(format.format(smallDate));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        long quot = getDifferMilliseconds(largeDate, smallDate);
        quot = quot / 1000 / 60 / 60 / 24;
        return quot;
    }
	/**
	 * @Title: getDifferHours
	 * @Description: 两日期相差小时数
	 * @param largeDate
	 * @param smallDate
	 * @return
	 * @return long
	 * @throws
	 */
	public static long getDifferHours(Date largeDate, Date smallDate) {
		long quot = getDifferMilliseconds(largeDate, smallDate);
		quot = quot / 1000 / 60 / 60;
		return quot;
	}

	/**
	 * @Title: getDifferMinute
	 * @Description: 两日期相差分钟数
	 * @param largeDate
	 * @param smallDate
	 * @return
	 * @return long
	 * @throws
	 */
	public static long getDifferMinute(Date largeDate, Date smallDate) {
		long quot = getDifferMilliseconds(largeDate, smallDate);
		quot = quot / 1000 / 60;
		return quot;
	}
	/**
	 * @Title: getDifferMinute
	 * @Description: 两日期相差秒数
	 * @param largeDate
	 * @param smallDate
	 * @return
	 * @return long
	 * @throws
	 */
	public static long getDifferSecond(Date largeDate, Date smallDate) {
		long quot = getDifferMilliseconds(largeDate, smallDate);
		quot = quot / 1000 ;
		return quot;
	}

	/**
	 * @Title: getDifferMilliseconds
	 * @Description: 两日期相差 毫秒数
	 * @param largeDate
	 * @param smallDate
	 * @return
	 * @return long
	 * @throws
	 */
	public static long getDifferMilliseconds(Date largeDate, Date smallDate) {
		long quot = largeDate.getTime() - smallDate.getTime();
		return quot;
	}

	/**
	 * 字符串转化为日期(时间).
	 * 
	 * @param formater
	 *            日期或时间的格式.
	 * @param dateStr
	 *            日期字符串
	 * @return 日期转化后的字符串.
	 */
	public static Date string2Date(String formater, String dateStr) {
		if (formater == null || "".equals(formater))
			return null;
		if (dateStr == null)
			return null;
		try {
			return (new SimpleDateFormat(formater)).parse(dateStr);
		} catch (ParseException e) {
			e.printStackTrace();
			return null;
		}
	}

	/**
	 * 日期(时间)转化为字符串.
	 * 
	 * @param formater
	 *            日期或时间的格式.
	 * @param aDate
	 *            java.util.Date类的实例.
	 * @return 日期转化后的字符串.
	 */
	public static String date2String(String formater, Date aDate) {
		if (formater == null || "".equals(formater))
			return null;
		if (aDate == null)
			return null;
		return (new SimpleDateFormat(formater)).format(aDate);
	}

	/**
	 * 当前日期(时间)转化为字符串.
	 * 
	 * @param formater
	 *            日期或时间的格式.
	 * @return 日期转化后的字符串.
	 */
	public static String date2String(String formater) {
		return date2String(formater, new Date());
	}

	/**
	 * 获取当前日期对应的星期数. <br>
	 * 1=星期天,2=星期一,3=星期二,4=星期三,5=星期四,6=星期五,7=星期六
	 * 
	 * @return 当前日期对应的星期数
	 */
	public static int dayOfWeek() {
		GregorianCalendar g = new GregorianCalendar();
		int ret = g.get(Calendar.DAY_OF_WEEK);
		g = null;
		return ret;
	}

	/**
	 * 获取所有的时区编号. <br>
	 * 排序规则:按照ASCII字符的正序进行排序. <br>
	 * 排序时候忽略字符大小写.
	 * 
	 * @return 所有的时区编号(时区编号已经按照字符[忽略大小写]排序).
	 */
	public static String[] fecthAllTimeZoneIds() {
		Vector v = new Vector();
		String[] ids = TimeZone.getAvailableIDs();
		for (int i = 0; i < ids.length; i++) {
			v.add(ids[i]);
		}
		java.util.Collections.sort(v, String.CASE_INSENSITIVE_ORDER);
		v.copyInto(ids);
		v = null;
		return ids;
	}

	/**
	 * 将日期时间字符串根据转换为指定时区的日期时间.
	 * 
	 * @param srcFormater
	 *            待转化的日期时间的格式.
	 * @param srcDateTime
	 *            待转化的日期时间.
	 * @param dstFormater
	 *            目标的日期时间的格式.
	 * @param dstTimeZoneId
	 *            目标的时区编号.
	 * 
	 * @return 转化后的日期时间.
	 */
	public static String stringUTC2Timezone(String srcFormater,
			String srcDateTime, String dstFormater, String dstTimeZoneId) {
		if (srcFormater == null || "".equals(srcFormater))
			return null;
		if (srcDateTime == null || "".equals(srcDateTime))
			return null;
		if (dstFormater == null || "".equals(dstFormater))
			return null;
		if (dstTimeZoneId == null || "".equals(dstTimeZoneId))
			return null;
		SimpleDateFormat sdf = new SimpleDateFormat(srcFormater);
		try {
			int diffTime = getTimeZoneRawOffset(dstTimeZoneId);
			Date d = sdf.parse(srcDateTime);
			long nowTime = d.getTime();
			long newNowTime = nowTime + diffTime;
			d = new Date(newNowTime);
			return date2String(dstFormater, d);
		} catch (ParseException e) {
			// Log.output(e.toString(), Log);
			return null;
		} finally {
			sdf = null;
		}
	}

	public static String stringUnify2Timezone(String srcFormater,
			String srcDateTime, String dstFormater, String dstTimeZoneId1,
			String dstTimeZoneId2) {
		if (srcFormater == null || "".equals(srcFormater))
			return null;
		if (srcDateTime == null || "".equals(srcDateTime))
			return null;
		if (dstFormater == null || "".equals(dstFormater))
			return null;
		if (dstTimeZoneId1 == null || "".equals(dstTimeZoneId1))
			return null;
		if (dstTimeZoneId2 == null || "".equals(dstTimeZoneId2))
			return null;
		SimpleDateFormat sdf = new SimpleDateFormat(srcFormater);
		try {
			int diffTime = getDiffTimeZoneRawOffset(dstTimeZoneId1,
					dstTimeZoneId2);
			Date d = sdf.parse(srcDateTime);
			long nowTime = d.getTime();
			long newNowTime = nowTime - diffTime;
			d = new Date(newNowTime);
			return date2String(dstFormater, d);
		} catch (ParseException e) {
			// Log.output(e.toString(), Log);
			return null;
		} finally {
			sdf = null;
		}
	}

	public static Date dateUnify2Timezone(Date date, String dstTimeZoneId1,
			String dstTimeZoneId2) {
		if (dstTimeZoneId1 == null || "".equals(dstTimeZoneId1))
			return null;
		if (dstTimeZoneId2 == null || "".equals(dstTimeZoneId2))
			return null;
		int diffTime = getDiffTimeZoneRawOffset(dstTimeZoneId1, dstTimeZoneId2);
		long nowTime = date.getTime();
		long newNowTime = nowTime - diffTime;
		date = new Date(newNowTime);
		return date;
	}

	public static String stringLAL2Timezone(String srcFormater,
			String srcDateTime, String dstFormater, String dstTimeZoneId) {
		if (srcFormater == null || "".equals(srcFormater))
			return null;
		if (srcDateTime == null || "".equals(srcDateTime))
			return null;
		if (dstFormater == null || "".equals(dstFormater))
			return null;
		if (dstTimeZoneId == null || "".equals(dstTimeZoneId))
			return null;
		SimpleDateFormat sdf = new SimpleDateFormat(srcFormater);
		try {
			int diffTime = getDiffTimeZoneRawOffset(dstTimeZoneId);
			Date d = sdf.parse(srcDateTime);
			long nowTime = d.getTime();
			long newNowTime = nowTime - diffTime;
			d = new Date(newNowTime);
			return date2String(dstFormater, d);
		} catch (ParseException e) {
			// Log.output(e.toString(), Log);
			return null;
		} finally {
			sdf = null;
		}
	}

	public static String stringLAL2Timezone(Date localDate, String dstFormater,
			String dstTimeZoneId) {
		if (dstFormater == null || "".equals(dstFormater))
			return null;
		if (dstTimeZoneId == null || "".equals(dstTimeZoneId))
			return null;
		try {
			int diffTime = getDiffTimeZoneRawOffset(dstTimeZoneId);
			long newNowTime = localDate.getTime() - diffTime;
			localDate = new Date(newNowTime);
			return date2String(dstFormater, localDate);
		} catch (Exception e) {
			return null;
		}
	}

	public static Date dateLAL2Timezone(Date localDate, String dstTimeZoneId) {
		if (dstTimeZoneId == null || "".equals(dstTimeZoneId))
			return null;
		try {
			int diffTime = getDiffTimeZoneRawOffset(dstTimeZoneId);
			long newNowTime = localDate.getTime() - diffTime;
			localDate = new Date(newNowTime);
			return localDate;
		} catch (Exception e) {
			return null;
		}
	}

	/**
	 * 获取系统当前默认时区与UTC的时间差.(单位:毫秒)
	 * 
	 * @return 系统当前默认时区与UTC的时间差.(单位:毫秒)
	 */
	private static int getDefaultTimeZoneRawOffset() {
		return TimeZone.getDefault().getRawOffset();
	}

	/**
	 * 获取指定时区与UTC的时间差.(单位:毫秒)
	 * 
	 * @param timeZoneId
	 *            时区Id
	 * @return 指定时区与UTC的时间差.(单位:毫秒)
	 */
	private static int getTimeZoneRawOffset(String timeZoneId) {
		return TimeZone.getTimeZone(timeZoneId).getRawOffset();
	}

	/**
	 * 获取系统当前默认时区与指定时区的时间差.(单位:毫秒)
	 * 
	 * @param
	 *
	 * @return 系统当前默认时区与指定时区的时间差.(单位:毫秒)
	 */
	private static int getDiffTimeZoneRawOffset(String timeZoneId1,
			String timeZoneId2) {
		return TimeZone.getTimeZone(timeZoneId1).getRawOffset()
				- TimeZone.getTimeZone(timeZoneId2).getRawOffset();
	}

	private static int getDiffTimeZoneRawOffset(String timeZoneId) {
		return TimeZone.getDefault().getRawOffset()
				- TimeZone.getTimeZone(timeZoneId).getRawOffset();
	}

	/**
	 * 将本地日期时间字符串根据转换为指定时区的日期时间.
	 * 
	 * @param srcDateTime
	 *            待转化的日期时间.
	 * @param dstTimeZoneId
	 *            目标的时区编号.
	 * 
	 * @return 转化后的日期时间.
	 * @see #(String, String, String, String)
	 */
	public static String stringLAL2Timezone(String srcDateTime,
			String dstTimeZoneId) {
		return stringLAL2Timezone("yyyy-MM-dd HH:mm:ss", srcDateTime,
				"yyyy-MM-dd HH:mm:ss", dstTimeZoneId);
	}

	/**
	 * 将UTC日期时间字符串根据转换为指定时区的日期时间.
	 * 
	 * @param srcDateTime
	 *            待转化的日期时间.
	 * @param dstTimeZoneId
	 *            目标的时区编号.
	 * 
	 * @return 转化后的日期时间.
	 * @see #(String, String, String, String)
	 */
	public static String stringUTC2Timezone(String srcDateTime,
			String dstTimeZoneId) {
		return stringUTC2Timezone("yyyy-MM-dd HH:mm:ss", srcDateTime,
				"yyyy-MM-dd HH:mm:ss", dstTimeZoneId);
	}

	/**
	 * @Title: stringUnify2Timezone
	 * @Description: TODO
	 * @param srcDateTime
	 *            待转时间
	 * @param dstTimeZoneId1
	 *            待转时间时区
	 * @param dstTimeZoneId2
	 *            目标时间时区
	 * @return
	 * @return String
	 * @throws
	 */
	public static String stringUnify2Timezone(String srcDateTime,
			String dstTimeZoneId1, String dstTimeZoneId2) {
		return stringUnify2Timezone("yyyy-MM-dd HH:mm:ss", srcDateTime,
				"yyyy-MM-dd HH:mm:ss", dstTimeZoneId1, dstTimeZoneId2);
	}
	
	
	/**
	 * 获取日期的前后年份 之间的集合 值
	 * @param date   当前日期
	 * @param pattern  日期格式
	 * @param dayMark  int  -负数向前推N年  
	 * @return
	 */
	public static List getOtherYearList(Date date, String pattern, int dayMark){
			DateFormat df = new SimpleDateFormat(pattern);
			List dateList = new ArrayList();
			
			int num = (int) Math.abs(dayMark);
		for (int i = 0; i < num; i++) {
			Date dt=null;
			try {
				dt = df.parse(df.format(date));
			} catch (ParseException e) {
				e.printStackTrace();
			}
			Calendar c = Calendar.getInstance();
			c.setTime(dt);
			if(dayMark>0){
				c.add(Calendar.YEAR, i);
			}else {
				c.add(Calendar.YEAR, -i);
			}
			String mDateTime = df.format(c.getTime());
			dateList.add(mDateTime.substring(0, 4));
//			Collections.sort(dateList);//升序
			 Collections.sort(dateList,Collections.reverseOrder()); //降序排列
		}
		return dateList;
	}

	/**
     * 判断当前日期是星期几
     * 
     * @param pTime 修要判断的时间
     * @return dayForWeek 判断结果
     * @Exception 发生异常
     */

	 public static String dayForWeek(String pTime){
	  SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
	  Calendar c = Calendar.getInstance();
	  String dayWeek="";
		try {
			c.setTime(format.parse(pTime));
		} catch (ParseException e) {	
			e.printStackTrace();
			return dayWeek;
		}
	  int dayForWeek = 0;
	  String dayNames[] = {"星期一","星期二","星期三","星期四","星期五","星期六","星期日"}; 
	  if(c.get(Calendar.DAY_OF_WEEK) == 1){
	   dayForWeek = 7;
	  }else{
	   dayForWeek = c.get(Calendar.DAY_OF_WEEK) - 1;
	  }
	  dayWeek =dayNames[dayForWeek-1];
	  return dayWeek;
	 }
	 
	 


	 	
	 	/**
	 	 * 返回两个日期相差 小时
	 	 * 
	 	 * @param
	 	 * @param
	 	 * @return
	 	 */													
	 	public static int getDateDifference(Date d1, Date d2) {
	 		long dayNumber = 0;
	 		long DAY = 24L * 60L * 60L * 1000L;
	 		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
	 		try {
	 			dayNumber = (d2.getTime() - d1.getTime()) / DAY;
	 		} catch (Exception e) {
	 			e.printStackTrace();
	 		}
	 		return (Integer.parseInt("" + dayNumber) + 1);

	 	}

	 	
	 	/*
	 	 * 取得当前时间的字符串形式yyyyMMddHHmmss
	 	 */
	 	public static String getCurrTime() {
	 		return format(new Date(), "yyyyMMddHHmmss");
	 	}
	 	
	 	/*
	 	 * 转换日期为指定格式的字符串
	 	 */
	 	public static String format(Date d) {
	 		if (d == null) {
	 			return null;
	 		}
	 		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
	 		String s = sdf.format(d);
	 		//        sdf.applyPattern("yyyy-MM-dd");
	 		return s;
	 	}
	 	public static String allformat(Date d) {
	 		if (d == null) {
	 			return null;
	 		}
	 		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd  HH:mm:ss");
	 		String s = sdf.format(d);
	 		//        sdf.applyPattern("yyyy-MM-dd");
	 		return s;
	 	}
	 	/*
	 	 * 转换日期为指定格式的字符串

	 	 * 用例：format(new Now(), "yyyy-MM-dd")
	 	 *      format(new Now(), "yyyy-MM")
	 	 */
	 	public static String format(Date d, String format) {
	 		if (d == null) {
	 			return null;
	 		}
	 		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	 		sdf.applyPattern(format);
	 		String s = sdf.format(d);
	 		//        sdf.applyPattern("yyyy-MM-dd");
	 		return s;
	 	}

	 	/**
	 	 * Description：生成时间戳
	 	 * @return
	 	 */
	 	public static String getTimeStamp() {
	 		SimpleDateFormat sdfTS = new SimpleDateFormat("yyMMddHHmmss");
	 		return sdfTS.format(new Date());
	 	}

	 	/**
	 	 * Description：生成时间戳
	 	 * @return
	 	 */
	 	public static String formatToDate(String date) {
	 		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	 		String newDate = null;
	 		try {
	 			SimpleDateFormat df = new SimpleDateFormat("yyyyMMdd");
	 			Date d1 = sdf.parse(date);
	 			newDate = df.format(d1);
	 		} catch (Exception e) {
	 			// TODO Auto-generated catch block
	 			e.printStackTrace();
	 		}
	 		return newDate;
	 	}

	 	/**
	 	 * Description：将格式yyyy-MM-dd HH:mm:ss 转换成为yyyyMMddHHmmss
	 	 * @return
	 	 * @throws ParseException 
	 	 */
	 	public static String formatToDateStr(String date) throws ParseException {
	 		String newDate = null;
	 		SimpleDateFormat df = new SimpleDateFormat("yyyyMMddHHmmss");
	 		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	 		Date d1 = sdf.parse(date);
	 		newDate = df.format(d1);
	 		return newDate;
	 	}

	 	/**
	 	 * 当前系统时间
	 	 */
	 	public static Date getSysDate() {
	 		return new Date();
	 	}

	 	/*
	 	 * 取得当前时间的字符串形式yyyy-MM-dd HH:mm:ss
	 	 */
	 	public static String getSysTime() {
	 		return format(new Date(), "yyyy-MM-dd HH:mm:ss");
	 	}
	 	
	 	/*
	 	 * 取得当前时间的字符串形式yyyy-MM-dd
	 	 */
	 	public static String getFormatDate() {
	 		return format(new Date(), "yyyyMMddHHmmss");
	 	}
	 	
	 	/**
	 	 * 返回几点几分
	 	 * 
	 	 * @return
	 	 */
	 	public static String getHourTime() {
	 		DateFormat format = new SimpleDateFormat("HH:mm");
	 		Calendar cal = Calendar.getInstance();
	 		String time = format.format(cal.getTime());
	 		return time;

	 	}

	 	/**
	 	 * 返回今天
	 	 * 
	 	 * @return
	 	 */
	 	public static String getToday() {
	 		DateFormat format = new SimpleDateFormat("yyyy-MM-dd");
	 		Calendar cal = Calendar.getInstance();
	 		String time = format.format(cal.getTime());

	 		return time;

	 	}

	 	/**
	 	 * 字符串转换成日期
	 	 * 
	 	 * @param str
	 	 * @return date
	 	 */
	 	public static Date StrToDate(String str) {

	 		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
	 		Date date = null;
	 		try {
	 			date = format.parse(str);
	 		} catch (Exception e) {
	 			e.printStackTrace();
	 		}
	 		return date;
	 	}

	 	/**
	 	 * 字符串转换成时间
	 	 * 
	 	 * @param str
	 	 * @return date
	 	 */
	 	public static Date StrToTime(String str) {

	 		SimpleDateFormat format = new SimpleDateFormat("HH:mm");
	 		Date date = null;
	 		try {
	 			date = format.parse(str);
	 		} catch (Exception e) {
	 			e.printStackTrace();
	 		}
	 		return date;
	 	}

	 	/**
	 	 * 通过日期算周几
	 	 * 
	 	 * @param dt
	 	 * @return
	 	 */
	 	public static String getWeekOfDate(Date dt) {
	 		String[] weekDays = { "星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六" };
	 		Calendar cal = Calendar.getInstance();
	 		cal.setTime(dt);

	 		int w = cal.get(Calendar.DAY_OF_WEEK) - 1;
	 		if (w < 0)
	 			w = 0;
	 		return weekDays[w];

	 	}

	 	public static String getStarLvById(String starlv_id) {
	 		if ("40".equals(starlv_id)) {
	 			return "一星";
	 		} else if ("41".equals(starlv_id)) {
	 			return "二星";
	 		} else if ("42".equals(starlv_id)) {
	 			return "三星";
	 		} else if ("43".equals(starlv_id)) {
	 			return "四星";
	 		} else if ("44".equals(starlv_id)) {
	 			return "五星";
	 		} else if ("46".equals(starlv_id)) {
	 			return "五星";
	 		} else {
	 			return "无";
	 		}
	 	}

	 	/**
	 	 * 比较两个时间
	 	 * 
	 	 * @param _time
	 	 * @param _type
	 	 * @return
	 	 */
	 	public static boolean getIsTimeBeforeSysdate(String _time, String _type) {

	 		if (_type.equals("大于")) {
	 			if (((StrToTime(getCurrTime()).getTime()) - (StrToTime(_time).getTime())) > 0) {
	 				return true;
	 			} else {
	 				return false;
	 			}

	 		} else if (_type.equals("小于")) {
	 			if (((StrToTime(getCurrTime()).getTime()) - (StrToTime(_time).getTime())) < 0) {
	 				return true;
	 			} else {
	 				return false;
	 			}

	 		}
	 		return false;

	 	}

	 	public static boolean getIsTimeBeforeOtherTime(String _time, String _time2, String _type) {

	 		if (_type.equals("大于")) {
	 			if ((StrToTime(_time2).getTime()) - (StrToTime(_time).getTime()) > 0) {
	 				return true;
	 			} else {
	 				return false;
	 			}

	 		} else if (_type.equals("小于")) {
	 			if ((StrToTime(_time2).getTime()) - (StrToTime(_time).getTime()) < 0) {
	 				return true;
	 			} else {
	 				return false;
	 			}

	 		}
	 		return false;

	 	}
	 	
	 	public static boolean getIsTimeBeforeOtherTime(String _time, String _time2) {

	 		if ((StrToTime(_time2).getTime()) - (StrToTime(_time).getTime()) > 0) {
	 			return true;
	 		} else {
	 			return false;
	 		}
	 	}
	 	

	 	/**
	 	 * 返回当前日期返回本周的周一的日期
	 	 * 
	 	 * @param _date1
	 	 * @return
	 	 */
	 	public static String getDateWeekBefore(String _date1) {
	 		if ("星期日".equals(getWeekOfDate(StrToDate(_date1)))) {
	 			return getDaysOper(_date1, -6);
	 		} else if ("星期六".equals(getWeekOfDate(StrToDate(_date1)))) {
	 			return getDaysOper(_date1, -5);
	 		} else if ("星期五".equals(getWeekOfDate(StrToDate(_date1)))) {
	 			return getDaysOper(_date1, -4);
	 		} else if ("星期四".equals(getWeekOfDate(StrToDate(_date1)))) {
	 			return getDaysOper(_date1, -3);
	 		} else if ("星期三".equals(getWeekOfDate(StrToDate(_date1)))) {
	 			return getDaysOper(_date1, -2);
	 		} else if ("星期二".equals(getWeekOfDate(StrToDate(_date1)))) {
	 			return getDaysOper(_date1, -1);
	 		} else if ("星期一".equals(getWeekOfDate(StrToDate(_date1)))) {
	 			return _date1;
	 		}

	 		return _date1;

	 	}

	 	/**
	 	 * 返回当前日期返回本周的周日的日期
	 	 * 
	 	 * @param _date1
	 	 * @return
	 	 */
	 	public static String getDateWeekAfter(String _date1) {
	 		if ("星期日".equals(getWeekOfDate(StrToDate(_date1)))) {
	 			return _date1;
	 		} else if ("星期六".equals(getWeekOfDate(StrToDate(_date1)))) {
	 			return getDaysOper(_date1, 1);
	 		} else if ("星期五".equals(getWeekOfDate(StrToDate(_date1)))) {
	 			return getDaysOper(_date1, 2);
	 		} else if ("星期四".equals(getWeekOfDate(StrToDate(_date1)))) {
	 			return getDaysOper(_date1, 3);
	 		} else if ("星期三".equals(getWeekOfDate(StrToDate(_date1)))) {
	 			return getDaysOper(_date1, 4);
	 		} else if ("星期二".equals(getWeekOfDate(StrToDate(_date1)))) {
	 			return getDaysOper(_date1, 5);
	 		} else if ("星期一".equals(getWeekOfDate(StrToDate(_date1)))) {
	 			return getDaysOper(_date1, 6);
	 		}

	 		return _date1;

	 	}

	 	/**
	 	 * 返回日期增加或者减少
	 	 * 
	 	 * @param _date1
	 	 * @return
	 	 */
	 	public static String getDaysOper(String _date1, int _days) {
	 		DateFormat format = new SimpleDateFormat("yyyy-MM-dd");
	 		Calendar calendar = Calendar.getInstance();
	 		String[] date1s = _date1.split("-");
	 		calendar.set(Integer.parseInt(date1s[0]), Integer.parseInt(date1s[1]) - 1, Integer.parseInt(date1s[2]));
	 		calendar.add(Calendar.DAY_OF_MONTH, _days);
	 		return format.format(calendar.getTime());

	 	}

	 	/**
	 	 * 返回日期递增
	 	 * 
	 	 * @param _date1
	 	 * @return
	 	 */
	 	public static String getDaysAdd(String _date1) {
	 		DateFormat format = new SimpleDateFormat("yyyy-MM-dd");
	 		Calendar calendar = Calendar.getInstance();
	 		String[] date1s = _date1.split("-");
	 		calendar.set(Integer.parseInt(date1s[0]), Integer.parseInt(date1s[1]) - 1, Integer.parseInt(date1s[2]));
	 		calendar.add(Calendar.DAY_OF_MONTH, 1);
	 		return format.format(calendar.getTime());

	 	}
	 	
	 	public static String getWeekendDefine(String _str) {
	 		StringBuffer sb_week = new StringBuffer();
	 		if (_str == null || "".equals(_str)) {
	 			return "";
	 		} else {
	 			if ("1".equals("" + _str.charAt(0))) {
	 				sb_week.append("星期一");
	 				sb_week.append(",");
	 			}
	 			if ("1".equals("" + _str.charAt(1))) {
	 				sb_week.append("星期二");
	 				sb_week.append(",");
	 			}
	 			if ("1".equals("" + _str.charAt(2))) {
	 				sb_week.append("星期三");
	 				sb_week.append(",");
	 			}
	 			if ("1".equals("" + _str.charAt(3))) {
	 				sb_week.append("星期四");
	 				sb_week.append(",");
	 			}
	 			if ("1".equals("" + _str.charAt(4))) {
	 				sb_week.append("星期五");
	 				sb_week.append(",");
	 			}
	 			if ("1".equals("" + _str.charAt(5))) {
	 				sb_week.append("星期六");
	 				sb_week.append(",");
	 			}
	 			if ("1".equals("" + _str.charAt(6))) {
	 				sb_week.append("星期日");
	 				sb_week.append(",");
	 			}
	 			return sb_week.toString();
	 		}
	 	}
	 	
	 	/**
	 	 * 把字符串转换为时间
	 	 * 
	 	 * @param _parm
	 	 * @return
	 	 */
	 	public static String replaceTimeFromStr(String _parm) {
	 		if ("0".equals(_parm)) {
	 			return "00:00";
	 		} else if ("1".equals(_parm)) {
	 			return "01:00";
	 		} else if ("2".equals(_parm)) {
	 			return "02:00";
	 		} else if ("3".equals(_parm)) {
	 			return "03:00";
	 		} else if ("4".equals(_parm)) {
	 			return "04:00";
	 		} else if ("5".equals(_parm)) {
	 			return "05:00";
	 		} else if ("6".equals(_parm)) {
	 			return "06:00";
	 		} else if ("7".equals(_parm)) {
	 			return "07:00";
	 		} else if ("8".equals(_parm)) {
	 			return "08:00";
	 		} else if ("9".equals(_parm)) {
	 			return "09:00";
	 		} else if ("10".equals(_parm)) {
	 			return "10:00";
	 		} else if ("11".equals(_parm)) {
	 			return "11:00";
	 		} else if ("12".equals(_parm)) {
	 			return "12:00";
	 		} else if ("13".equals(_parm)) {
	 			return "13:00";
	 		} else if ("14".equals(_parm)) {
	 			return "14:00";
	 		} else if ("15".equals(_parm)) {
	 			return "15:00";
	 		} else if ("16".equals(_parm)) {
	 			return "16:00";
	 		} else if ("17".equals(_parm)) {
	 			return "17:00";
	 		} else if ("18".equals(_parm)) {
	 			return "18:00";
	 		} else if ("19".equals(_parm)) {
	 			return "19:00";
	 		} else if ("20".equals(_parm)) {
	 			return "20:00";
	 		} else if ("21".equals(_parm)) {
	 			return "21:00";
	 		} else if ("22".equals(_parm)) {
	 			return "22:00";
	 		} else if ("23".equals(_parm)) {
	 			return "23:00";
	 		} else {
	 			return "14:00";
	 		}
	 	}
	 	
	 	
	 	public static String getCurrentTimeMillis(){
	 		return System.currentTimeMillis()+"";
	 	}
	 	
	 	/**
	 	 * 返回两个时间(格式：HH:mm)的差值
	 	 * @param _time1 (例：08:00)
	 	 * @param _time2 (例：09:00)
	 	 * @return
	 	 */
	 	public static int getTimeDifference(String _time1, String _time2){
	 		String[] temp1 = _time1.split(":");
	 		String[] temp2 = _time2.split(":");
	 		int hour1 = Integer.valueOf(temp1[0]);
	 		int hour2 = Integer.valueOf(temp2[0]);
	 		int minute1 = Integer.valueOf(temp1[1]);
	 		int minute2 = Integer.valueOf(temp2[1]);
	 		
	 		return (hour1-hour2) == 0 ? minute1-minute2 : hour1-hour2;
	 		
	 	}
	 	
	 	 /**
	      * 取指定期间的第一天
	      * @return
	      */
	     public static String getFirstDayOfMonth(String dateString){
	     	String year = dateString.substring(0, 4);
	     	String month = dateString.substring(5, 7);
	         return year+"-"+month+"-01";
	     }
	     /**    
	      * 得到指定月的最后一天    
	      *     
	     * @return    2010-09-10
	      */     
	     public static String getMonthLastDay(String dateString) {   
	     	String year = dateString.substring(0, 4);
	     	String month = ""+(Integer.valueOf(dateString.substring(5, 7))+1);
	     	String date = year+"-"+month+"-01";
	      return getBeforeDate(date);      
	     }
	     /**
	      * 得到某一天的前一天
	      * @param
	      * @param dateString
	      * @return
	      */
	     public static String getBeforeDate(String dateString) {
	         Calendar now_Time = Calendar.getInstance();
	         DateFormat df=new SimpleDateFormat("yyyy-MM-dd");
	         try {
	             now_Time.setTime(df.parse(dateString));
	         } catch (Exception e) {
	             // TODO 自动生成 catch 块
	             e.printStackTrace();
	         }
	         now_Time.add(Calendar.DATE,-1);
	         SimpleDateFormat sdNowDate = new SimpleDateFormat("yyyy-MM-dd");
	         return sdNowDate.format(now_Time.getTime());
	     }
	     
	 	/**
	 	 * 返回两个时间差
	 	 * @param _date1  格式：yyyy-MM-dd HH:mm:ss
	 	 * @param _date2  格式：yyyy-MM-dd HH:mm:ss
	 	 * @param accuray 精确度：0——天；1——小时；2——分钟；3——秒；4——毫秒
	 	 * @return
	 	 */
	 	public static long getDateTimeDifference(String _date1, String _date2, int accuray) {
	 		long Diff = 0;
	 		/*转化成为相应精确度*/
	 		long[] ACCURAY = {24L * 60L * 60L * 1000L, 60L * 60L * 1000L, 60L * 1000L, 1000L, 1L};
	 		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	 		try {
	 			java.util.Date d1 = df.parse(_date1);
	 			java.util.Date d2 = df.parse(_date2);
	 			Diff = (d2.getTime() - d1.getTime()) / ACCURAY[accuray];
	 		} catch (Exception e) {
	 			e.printStackTrace();
	 		}
	 		//return (Integer.parseInt("" + Diff));
	 		return Diff;
	 	}
	 	/**
	 	 * 时间增减
	 	 * @param date
	 	 * @param index：增减数量
	 	 * @param type 1:分钟 2：小时 3：天 4：月 5：年
	 	 * 
	 	 * @return
	 	 */
	 	public static Date getLastDateAndNextDate(Date date,int index ,int type){
	 		SimpleDateFormat df =  null ;
	 		if(date!=null){
	 			Calendar cal = Calendar.getInstance();
	 			cal.setTime(date);
	 			switch (type) {
	 			case 1:cal.add(cal.MINUTE,index);break;
	 			case 2:cal.add(cal.HOUR,index);break;
	 			case 3:cal.add(cal.DATE,index);break;
	 			case 4:cal.add(cal.MONTH,index);break;
	 			case 5:cal.add(cal.YEAR,index);break;
	 			}
	 			Date endDate = cal.getTime();
	 			return endDate;
	 		}else{
	 			return null ;
	 		}
	 		
	 	}
	 	
	 	
	 	/**获取时间的年月日
	 	 * @param
	 	 * @param
	 	 * @return
	 	 */													
	 	public static Date getDate(String _date,String formate) {
	 		SimpleDateFormat df = new SimpleDateFormat(formate);
	 		Date time = null ;
	 		try {
	 			time = df.parse(_date);
	 		} catch (Exception e) {
	 			e.printStackTrace();
	 		}
	 		return time;

	 	}
	 	
	 	public static long getDateDifference(Date begin , Date end,Integer type){
	 	        long between = 0;
	 	        try {
	 	            between = (begin.getTime() - end.getTime());// 得到两者的毫秒数
	 	            long day = between / (24 * 60 * 60 * 1000);
	 		        long hour = (between / (60 * 60 * 1000) - day * 24);
	 		        long min = ((between / (60 * 1000)) - day * 24 * 60 - hour * 60);
	 		        long s = (between / 1000 - day * 24 * 60 * 60 - hour * 60 * 60 - min * 60);
	 		        long ms = (between - day * 24 * 60 * 60 * 1000 - hour * 60 * 60 * 1000
	 		                - min * 60 * 1000 - s * 1000);
	 		        System.out.println(day + "天" + hour + "小时" + min + "分" + s + "秒" + ms  + "毫秒");
	 		        if(type==1){
	 		        	between = day;
	 		        }else if(type==2){
	 		        	between = hour;
	 		        }else if(type==3){
	 		        	between = min;
	 		        }else if(type==4){
	 		        	between = s;
	 		        }else if(type==5){
	 		        	between = ms;
	 		        }
	 	        } catch (Exception ex) {
	 	            ex.printStackTrace();
	 	        }
	 	     return between ;   
	 	}
	 	
	 	
	 	/**
	 	 * 把日期转化为==> yyyyMMddHHmmss
	 	 */
	 	public static String getCurrDate(Date date) {
	 		return format(date, "yyyy/MM/dd HH:mm:ss");
	 	}
	 	
	 	//根据身份证号提取年龄
	 	public static Integer IDCardNoToAge(String idCardNo){

	 		int length = idCardNo.length();

	 		String dates = "";

	 		if (length == 18) {

	 			//int se = Integer.valueOf(idCardNo.substring(length - 1)) % 2;
	 			dates = idCardNo.substring(6, 10);

	 			SimpleDateFormat df = new SimpleDateFormat("yyyy");

	 			String year = df.format(new Date());

	 			int u = Integer.parseInt(year) - Integer.parseInt(dates);

	 			return u;

	 		} else {

	 			if (length == 15) {

	 				SimpleDateFormat df = new SimpleDateFormat("yyyy");
	 				String year = df.format(new Date());
	 				dates = idCardNo.substring(6, 8);
	 				String y="19"+dates+"";
	 				int u = Integer.parseInt(year) - Integer.parseInt(y);
	 				return u;

	 			} else {
	 				return 0;
	 			}

	 		}

	   }
	 	
	 	public static void main(String[] args){
//	 		System.out.println("HH:mm==>" + getHourTime());
	 		int a=IDCardNoToAge("130503670401001");
	 		System.err.println(a);
	 		//System.out.println("==========" + getDateDifference(new Date(),new Date(),5));
	 	}
	 	
	 	//【今天的起始时间2017-08-29 00:00:00】
	 	public static Date getStartTime() {  
	         Calendar todayStart = Calendar.getInstance();  
	         todayStart.set(Calendar.HOUR_OF_DAY, 0);  
	         todayStart.set(Calendar.MINUTE, 0);  
	         todayStart.set(Calendar.SECOND, 0);  
	         todayStart.set(Calendar.MILLISECOND, 0);  
	         return todayStart.getTime();  
	     }  
	 	//【今天的结束时间2017-08-29 23:59:59】
	 	public static Date getEndTime() {  
	         Calendar todayEnd = Calendar.getInstance();  
	         todayEnd.set(Calendar.HOUR_OF_DAY, 23);  
	         todayEnd.set(Calendar.MINUTE, 59);  
	         todayEnd.set(Calendar.SECOND, 59);  
	         todayEnd.set(Calendar.MILLISECOND, 999);  
	         return todayEnd.getTime();  
	     } 
	 	
	 	 /**
	     *
	     * @param
	     * @return 该毫秒数转换为 * days * hours * minutes * seconds 后的格式
	     * @author fy.zhang
	     */
	    public static String formatDuring(long mss) {
	        long days = mss / (1000 * 60 * 60 * 24);
	        long hours = (mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60);
	        long minutes = (mss % (1000 * 60 * 60)) / (1000 * 60);
	        long seconds = (mss % (1000 * 60)) / 1000;
	        return hours+"时"+minutes+"分"+seconds+"秒";
	    }

}
