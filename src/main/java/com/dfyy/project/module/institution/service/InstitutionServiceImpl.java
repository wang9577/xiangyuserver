package com.dfyy.project.module.institution.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.dfyy.common.utils.StringUtils;
import com.dfyy.project.module.institution.dao.IInstitutionDao;
import com.dfyy.project.module.institution.domain.Institution;
import com.dfyy.project.module.institution.service.IInstitutionService;

/**
 * 院系 服务层实现
 * 
 * @author dfyy
 * @date 2018-12-27
 */
@Service
public class InstitutionServiceImpl implements IInstitutionService 
{
	@Autowired
	private IInstitutionDao institutionDao;
	
	/**
     * 查询院系信息
     * 
     * @param id 院系ID
     * @return 院系信息
     */
	 @Override
	public Institution selectInstitutionById(Integer id)
	{
	    return institutionDao.selectInstitutionById(id);
	}
	
	/**
     * 查询院系列表
     * 
     * @param institution 院系信息
     * @return 院系集合
     */
	 @Override
	public List<Institution> selectInstitutionList(Institution institution)
	{
	    return institutionDao.selectInstitutionList(institution);
	}
	
    /**
     * 新增院系
     * 
     * @param institution 院系信息
     * @return 结果
     */
	 @Override
	public int insertInstitution(Institution institution)
	{
	    return institutionDao.insertInstitution(institution);
	}
	
	/**
     * 修改院系
     * 
     * @param institution 院系信息
     * @return 结果
     */
	 @Override
	public int updateInstitution(Institution institution)
	{
	    return institutionDao.updateInstitution(institution);
	}
	
	/**
     * 保存院系
     * 
     * @param institution 院系信息
     * @return 结果
     */
	 @Override
	public int saveInstitution(Institution institution)
	{
	    Integer id = institution.getId();
		int rows = 0;
		if (StringUtils.isNotNull(id))
        {
		    rows = institutionDao.updateInstitution(institution);
		}
		else
        {
		    rows = institutionDao.insertInstitution(institution);
		}
		return rows;
	}
	
	/**
     * 删除院系信息
     * 
     * @param id 院系ID
     * @return 结果
     */
	 @Override
	public int deleteInstitutionById(Integer id)
	{
	    return institutionDao.deleteInstitutionById(id);
	}
	
	/**
     * 批量删除院系对象
     * 
     * @param ids 需要删除的数据ID
     * @return 结果
     */
	 @Override
	public int batchDeleteInstitution(Integer[] ids)
	{
		return institutionDao.batchDeleteInstitution(ids);
	}
	
}
