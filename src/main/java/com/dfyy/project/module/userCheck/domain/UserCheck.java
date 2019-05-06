package com.dfyy.project.module.userCheck.domain;

import java.io.Serializable;
import com.dfyy.framework.web.page.PageDomain;

/**
 * t_user_check 签到
 * 
 * @author dfyy
 * @date 2019-05-01
 */
public class UserCheck extends PageDomain implements Serializable 
{
	private static final long serialVersionUID = 1L;
	
	/**  */
	private Integer id;
	/**  */
	private Integer pId;
	/**  */
	private Integer stuId;
	/**  */
	private String createTime;
	/**  */
	private Integer type;

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
	 * 设置：
	 */
	public void setPId(Integer pId) 
	{
		this.pId = pId;
	}
	
	/**
	 * 获取：
	 */
	public Integer getPId() 
	{
		return pId;
	}
	
	/**
	 * 设置：
	 */
	public void setStuId(Integer stuId) 
	{
		this.stuId = stuId;
	}
	
	/**
	 * 获取：
	 */
	public Integer getStuId() 
	{
		return stuId;
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
	 * 设置：
	 */
	public void setType(Integer type) 
	{
		this.type = type;
	}
	
	/**
	 * 获取：
	 */
	public Integer getType() 
	{
		return type;
	}
	
}
