package com.dfyy.project.module.user.domain;

import java.io.Serializable;
import com.dfyy.framework.web.page.PageDomain;

/**
 * t_user 用户
 * 
 * @author dfyy
 * @date 2018-12-27
 */
public class UserApp extends PageDomain implements Serializable
{
	private static final long serialVersionUID = 1L;
	
	/**  */
	private Integer id;
	/** 登录名 */
	private String username;
	/** 密码 */
	private String password;
	/** 1 教师 2 学生 */
	private Integer type;
	/**  */
	private String createTime;
	/** 1 删除 2 未删除 */
	private Integer isdel;
	/** 院系 */
	private Integer institutionId;

	private String name;

	/**
	 * 设置：
	 */
	public void setId(Integer id) 
	{
		this.id = id;
	}
	
	/**
	 * 获取：
	 */
	public Integer getId() 
	{
		return id;
	}
	
	/**
	 * 设置：登录名
	 */
	public void setUsername(String username) 
	{
		this.username = username;
	}
	
	/**
	 * 获取：登录名
	 */
	public String getUsername() 
	{
		return username;
	}
	
	/**
	 * 设置：密码
	 */
	public void setPassword(String password) 
	{
		this.password = password;
	}
	
	/**
	 * 获取：密码
	 */
	public String getPassword() 
	{
		return password;
	}
	
	/**
	 * 设置：1 教师 2 学生
	 */
	public void setType(Integer type) 
	{
		this.type = type;
	}
	
	/**
	 * 获取：1 教师 2 学生
	 */
	public Integer getType() 
	{
		return type;
	}
	
	/**
	 * 设置：
	 */
	public void setCreateTime(String createTime) 
	{
		this.createTime = createTime;
	}
	
	/**
	 * 获取：
	 */
	public String getCreateTime() 
	{
		return createTime;
	}
	
	/**
	 * 设置：1 删除 2 未删除
	 */
	public void setIsdel(Integer isdel) 
	{
		this.isdel = isdel;
	}
	
	/**
	 * 获取：1 删除 2 未删除
	 */
	public Integer getIsdel() 
	{
		return isdel;
	}
	
	/**
	 * 设置：院系
	 */
	public void setInstitutionId(Integer institutionId) 
	{
		this.institutionId = institutionId;
	}
	
	/**
	 * 获取：院系
	 */
	public Integer getInstitutionId() 
	{
		return institutionId;
	}

	public static long getSerialVersionUID() {
		return serialVersionUID;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}
