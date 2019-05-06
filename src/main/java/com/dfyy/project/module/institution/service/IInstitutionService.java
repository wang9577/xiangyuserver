package com.dfyy.project.module.institution.service;

import com.dfyy.project.module.institution.domain.Institution;
import java.util.List;

/**
 * 院系 服务层
 * 
 * @author dfyy
 * @date 2018-12-27
 */
public interface IInstitutionService 
{
	
	/**
     * 查询院系信息
     * 
     * @param id 院系ID
     * @return 院系信息
     */
	public Institution selectInstitutionById(Integer id);
	
	/**
     * 查询院系列表
     * 
     * @param institution 院系信息
     * @return 院系集合
     */
	public List<Institution> selectInstitutionList(Institution institution);
	
	/**
     * 新增院系
     * 
     * @param institution 院系信息
     * @return 结果
     */
	public int insertInstitution(Institution institution);
	
	/**
     * 修改院系
     * 
     * @param institution 院系信息
     * @return 结果
     */
	public int updateInstitution(Institution institution);
	
	/**
     * 保存院系
     * 
     * @param institution 院系信息
     * @return 结果
     */
	public int saveInstitution(Institution institution);
	
	/**
     * 删除院系信息
     * 
     * @param id 院系ID
     * @return 结果
     */
	public int deleteInstitutionById(Integer id);
	
	/**
     * 批量删除院系信息
     * 
     * @param ids 需要删除的数据ID
     * @return 结果
     */
	public int batchDeleteInstitution(Integer[] ids);
	
}
