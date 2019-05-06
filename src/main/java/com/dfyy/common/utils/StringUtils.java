package com.dfyy.common.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.lang.text.StrBuilder;

/**
 * 字符串工具类
 * 
 * @author dfyy
 */
public class StringUtils
{
    /** 空字符串 */
    private static final String NULLSTR = "";

    /**
     * 获取参数不为空值
     * 
     * @param value defaultValue 要判断的value
     * @return value 返回值
     */
    public static <T> T nvl(T value, T defaultValue)
    {
        return value != null ? value : defaultValue;
    }

    /**
     * * 判断一个Collection是否为空， 包含List，Set，Queue
     * 
     * @param coll 要判断的Collection
     * @return true：为空 false：非空
     */
    public static boolean isEmpty(Collection<?> coll)
    {
        return isNull(coll) || coll.isEmpty();
    }

    /**
     * * 判断一个Collection是否非空，包含List，Set，Queue
     * 
     * @param coll 要判断的Collection
     * @return true：非空 false：空
     */
    public static boolean isNotEmpty(Collection<?> coll)
    {
        return !isEmpty(coll);
    }

    /**
     * * 判断一个对象数组是否为空
     * 
     * @param objects 要判断的对象数组
     ** @return true：为空 false：非空
     */
    public static boolean isEmpty(Object[] objects)
    {
        return isNull(objects) || (objects.length == 0);
    }

    /**
     * * 判断一个对象数组是否非空
     * 
     * @param objects 要判断的对象数组
     * @return true：非空 false：空
     */
    public static boolean isNotEmpty(Object[] objects)
    {
        return !isEmpty(objects);
    }

    /**
     * * 判断一个Map是否为空
     * 
     * @param map 要判断的Map
     * @return true：为空 false：非空
     */
    public static boolean isEmpty(Map<?, ?> map)
    {
        return isNull(map) || map.isEmpty();
    }

    /**
     * * 判断一个Map是否为空
     * 
     * @param map 要判断的Map
     * @return true：非空 false：空
     */
    public static boolean isNotEmpty(Map<?, ?> map)
    {
        return !isEmpty(map);
    }

    /**
     * * 判断一个字符串是否为空串
     * 
     * @param str String
     * @return true：为空 false：非空
     */
    public static boolean isEmpty(String str)
    {
        return isNull(str) || NULLSTR.equals(str.trim());
    }

    /**
     * * 判断一个字符串是否为非空串
     * 
     * @param str String
     * @return true：非空串 false：空串
     */
    public static boolean isNotEmpty(String str)
    {
        return !isEmpty(str);
    }

    /**
     * * 判断一个对象是否为空
     * 
     * @param object Object
     * @return true：为空 false：非空
     */
    public static boolean isNull(Object object)
    {
        return object == null;
    }

    /**
     * * 判断一个对象是否非空
     * 
     * @param object Object
     * @return true：非空 false：空
     */
    public static boolean isNotNull(Object object)
    {
        return !isNull(object);
    }

    /**
     * * 判断一个对象是否是数组类型（Java基本型别的数组）
     * 
     * @param object 对象
     * @return true：是数组 false：不是数组
     */
    public static boolean isArray(Object object)
    {
        return isNotNull(object) && object.getClass().isArray();
    }

    /**
     * 去空格
     */
    public static String trim(String str)
    {
        return (str == null ? "" : str.trim());
    }

    /**
     * 截取字符串
     * 
     * @param str 字符串
     * @param start 开始
     * @return 结果
     */
    public static String substring(final String str, int start)
    {
        if (str == null)
        {
            return NULLSTR;
        }

        if (start < 0)
        {
            start = str.length() + start;
        }

        if (start < 0)
        {
            start = 0;
        }
        if (start > str.length())
        {
            return NULLSTR;
        }

        return str.substring(start);
    }

    /**
     * 截取字符串
     * 
     * @param str 字符串
     * @param start 开始
     * @param end 结束
     * @return 结果
     */
    public static String substring(final String str, int start, int end)
    {
        if (str == null)
        {
            return NULLSTR;
        }

        if (end < 0)
        {
            end = str.length() + end;
        }
        if (start < 0)
        {
            start = str.length() + start;
        }

        if (end > str.length())
        {
            end = str.length();
        }

        if (start > end)
        {
            return NULLSTR;
        }

        if (start < 0)
        {
            start = 0;
        }
        if (end < 0)
        {
            end = 0;
        }

        return str.substring(start, end);
    }

    public static String uncapitalize(String str)
    {
        int strLen;
        if (str == null || (strLen = str.length()) == 0)
        {
            return str;
        }
        return new StrBuilder(strLen).append(Character.toLowerCase(str.charAt(0))).append(str.substring(1)).toString();
    }

    /**
     * 是否包含字符串
     * 
     * @param str 验证字符串
     * @param strs 字符串组
     * @return 包含返回true
     */
    public static boolean inStringIgnoreCase(String str, String... strs)
    {
        if (str != null && strs != null)
        {
            for (String s : strs)
            {
                if (str.equalsIgnoreCase(trim(s)))
                {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * 将下划线大写方式命名的字符串转换为驼峰式。如果转换前的下划线大写方式命名的字符串为空，则返回空字符串。 例如：HELLO_WORLD->HelloWorld
     * 
     * @param name 转换前的下划线大写方式命名的字符串
     * @return 转换后的驼峰式命名的字符串
     */
    public static String convertToCamelCase(String name)
    {
        StringBuilder result = new StringBuilder();
        // 快速检查
        if (name == null || name.isEmpty())
        {
            // 没必要转换
            return "";
        }
        else if (!name.contains("_"))
        {
            // 不含下划线，仅将首字母大写
            return name.substring(0, 1).toUpperCase() + name.substring(1);
        }
        // 用下划线将原始字符串分割
        String[] camels = name.split("_");
        for (String camel : camels)
        {
            // 跳过原始字符串中开头、结尾的下换线或双重下划线
            if (camel.isEmpty())
            {
                continue;
            }
            // 首字母大写
            result.append(camel.substring(0, 1).toUpperCase());
            result.append(camel.substring(1).toLowerCase());
        }
        return result.toString();
    }
    
    
    
    /**
	 * @Title: isNumeric
	 * @Description: TODO(是否是整数)
	 * @param value
	 * @return boolean 返回类型
	 * @throws
	 */
	public static boolean isNumeric(String value) {
		Pattern pattern = Pattern.compile("^\\-?[0-9]+$");
		return pattern.matcher(value).matches();
	}

	public static boolean isFloat(String value) {
		Pattern pattern = Pattern.compile("^([-]|[0-9])[0-9]*(\\.\\d*)?$");
		return pattern.matcher(value).matches();
	}

	public static boolean isEmail(String value) {
		Pattern pattern = Pattern.compile("^[\\w-]+(\\.[\\w-]+)*@[\\w-]+(\\.[\\w-]+)+$");
		return pattern.matcher(value).matches();
	}

	public static boolean isUnicode(String value) {
		Pattern pattern = Pattern.compile("^[\\u4E00-\\u9FA5\\uE815-\\uFA29]+$");
		return pattern.matcher(value).matches();
	}

	/**
	 * @Title: IsIpAddress
	 * @Description: TODO(是否是IP地址)
	 * @param value
	 * @return boolean 返回类型
	 * @throws
	 */
	public static boolean isIpAddress(String value) {
		Pattern pattern = Pattern.compile("^(\\d(25[0-5]|2[0-4][0-9]|1?[0-9]?[0-9])\\d\\.){3}\\d(25[0-5]|2[0-4][0-9]|1?[0-9]?[0-9])\\d$");
		return pattern.matcher(value).matches();
	}

	public static boolean isUrl(String value) {
		Pattern pattern = Pattern
				.compile("^(http|https|ftp|rtsp|mms):(\\/\\/|\\\\\\\\)[A-Za-z0-9%\\-_@]+\\.[A-Za-z0-9%\\-_@]+[A-Za-z0-9\\.\\/=\\?%\\-&_~`@:\\+!;]*$");
		return pattern.matcher(value).matches();
	}

	public static boolean isIdentityCard(String value) {

		Pattern pattern = Pattern.compile("^(^\\d{15}$|^\\d{18}$|^\\d{17}(\\d|X|x))$");
		return pattern.matcher(value).matches();
	}

	public static boolean isMobileNumber(String value, boolean isRestrict) {
		Pattern pattern = Pattern.compile(isRestrict ? "^[1][3-8]\\d{9}$" : "^[1]\\d{10}$");
		return pattern.matcher(value).matches();
	}

	public static boolean isMobileNumber(String value) {
		return isMobileNumber(value, false);
	}

	public static boolean isNullOrEmpty(String value) {
		return value == null || value.isEmpty();
	}
	public static boolean isValidDate(String str) {
		boolean convertSuccess = true;
		// 指定日期格式为四位年/两位月份/两位日期，注意yyyy/MM/dd区分大小写；
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		try {
			// 设置lenient为false.
			// 否则SimpleDateFormat会比较宽松地验证日期，比如2007/02/29会被接受，并转换成2007/03/01
			format.setLenient(false);
			format.parse(str);
		} catch (ParseException e) {
			// e.printStackTrace();
			// 如果throw java.text.ParseException或者NullPointerException，就说明格式不对
			System.out.println(e.getMessage());
			convertSuccess = false;
		}
		return convertSuccess;
	}

	public static boolean isChineseName(String str) {
		Pattern pattern = Pattern.compile("^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]){2,5}$");

		Matcher matcher = pattern.matcher(str);

		if (matcher.find()) {
			return true;
		}
		return false;
	}

	/** @Title: processSalary
	  * @author mengfj
	  * @param @param salary
	  * @param @return
	  * @date 2015年8月28日
	  * @Description: TODO(工资范围拆分)
	  */
	
	public static Map processSalary(String salary) {
		Map map = new HashMap();
		if (salary.contains("上")) {
			Pattern p = Pattern.compile("[0-9\\.]+");
			Matcher m = p.matcher(salary);
			while (m.find()) {
				map.put("max", 0);
				map.put("min", Integer.valueOf(m.group()));
			}
		} else if (salary.contains("下")) {
			Pattern p = Pattern.compile("[0-9\\.]+");
			Matcher m = p.matcher(salary);
			while (m.find()) {
				map.put("min", 0);
				map.put("max", Integer.valueOf(m.group()));
			}
		} else if (salary.contains("-")) {
			Pattern p = Pattern.compile("[0-9\\.]+");
			Matcher m = p.matcher(salary);
			int i=0;
			while (m.find()) {
				if(i==0){
					map.put("min", Integer.valueOf(m.group()));
				}else if(i==1){
					map.put("max", Integer.valueOf(m.group()));
				}
				i++;
			}
		}else if(salary.equals("面议")){
			map.put("min", 0);
			map.put("max", 999999999);
		}
		return map;

	}
	
	/** @Title: processWorking
	  * @author wumf
	  * @param @param working
	  * @param @return
	  * @date 2015年8月28日
	  * @Description: TODO(工作经验拆分)
	  */
	
	public static Map processWorking(String working) {
		Map map = new HashMap();
		if (working.contains("上")) {
			Pattern p = Pattern.compile("[0-9\\.]+");
			Matcher m = p.matcher(working);
			while (m.find()) {
				map.put("max", 0);
				map.put("min", Integer.valueOf(m.group()));
			}
		} else if (working.contains("下")) {
			Pattern p = Pattern.compile("[0-9\\.]+");
			Matcher m = p.matcher(working);
			while (m.find()) {
				map.put("min", 0);
				map.put("max", Integer.valueOf(m.group()));
			}
		} else if (working.contains("-")) {
			Pattern p = Pattern.compile("[0-9\\.]+");
			Matcher m = p.matcher(working);
			int i=0;
			while (m.find()) {
				if(i==0){
					map.put("min", Integer.valueOf(m.group()));
				}else if(i==1){
					map.put("max", Integer.valueOf(m.group()));
				}
				i++;
			}
		}else{// 应届毕业生
			map.put("min", 0);
			map.put("max", 0);
		}
		return map;

	}
 
    
    
    
    
    
    
    
    
    
    
    
    
    
    
}