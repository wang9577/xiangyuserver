package com.dfyy.project.module.institution.domain;

import java.io.Serializable;
import com.dfyy.framework.web.page.PageDomain;

/**
 * institution 院系
 * 
 * @author dfyy
 * @date 2018-12-27
 */
public class Institution extends PageDomain implements Serializable 
{
	private static final long serialVersionUID = 1L;
	
	/**  */
	private Integer id;
	/** 院系名称 */
	private String name;
	/**  */
	private String createTime;
	/** 1 删除 2 未删除 */
	private Integer isDel;

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
	 * 设置：院系名称
	 */
	public void setName(String name) 
	{
		this.name = name;
	}
	
	/**
	 * 获取：院系名称
	 */
	public String getName() 
	{
		return name;
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
	public void setIsDel(Integer isDel) 
	{
		this.isDel = isDel;
	}
	
	/**
	 * 获取：1 删除 2 未删除
	 */
	public Integer getIsDel() 
	{
		return isDel;
	}
	
}
