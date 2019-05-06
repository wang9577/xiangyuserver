package com.dfyy.framework.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * 读取项目相关配置
 * 
 * @author dfyy
 */
@Component
@ConfigurationProperties(prefix = "dfyy")
public class DfyyConfig
{
    /** 项目名称 */
    private String name;
    /** 版本 */
    private String version;
    /** 版权年份 */
    private String copyrightYear;
    
    /** 视频上传路径 */
    private static String profile;
    /** 图片上传路径 */
    private static String imgfile;

    public static String getImgfile() {
		return imgfile;
	}

	public static void setImgfile(String imgfile) {
		DfyyConfig.imgfile = imgfile;
	}

	public static String getProfile() {
		return profile;
	}

	public static void setProfile(String profile) {
		DfyyConfig.profile = profile;
	}

	public String getName()
    {
        return name;
    }

    public void setName(String name)
    {
        this.name = name;
    }

    public String getVersion()
    {
        return version;
    }

    public void setVersion(String version)
    {
        this.version = version;
    }

    public String getCopyrightYear()
    {
        return copyrightYear;
    }

    public void setCopyrightYear(String copyrightYear)
    {
        this.copyrightYear = copyrightYear;
    }

}
