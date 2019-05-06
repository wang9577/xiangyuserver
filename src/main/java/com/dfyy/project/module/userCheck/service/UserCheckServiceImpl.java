package com.dfyy.project.module.userCheck.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.dfyy.common.utils.StringUtils;
import com.dfyy.project.module.userCheck.dao.IUserCheckDao;
import com.dfyy.project.module.userCheck.domain.UserCheck;
import com.dfyy.project.module.userCheck.service.IUserCheckService;

/**
 * 签到 服务层实现
 * 
 * @author dfyy
 * @date 2019-05-01
 */
@Service
public class UserCheckServiceImpl implements IUserCheckService 
{
	@Autowired
	private IUserCheckDao userCheckDao;
	
	/**
     * 查询签到信息
     * 
     * @param id 签到ID
     * @return 签到信息
     */
	 @Override
	public UserCheck selectUserCheckById(Integer id)
	{
	    return userCheckDao.selectUserCheckById(id);
	}
	
	/**
     * 查询签到列表
     * 
     * @param userCheck 签到信息
     * @return 签到集合
     */
	 @Override
	public List<UserCheck> selectUserCheckList(UserCheck userCheck)
	{
	    return userCheckDao.selectUserCheckList(userCheck);
	}
	
    /**
     * 新增签到
     * 
     * @param userCheck 签到信息
     * @return 结果
     */
	 @Override
	public int insertUserCheck(UserCheck userCheck)
	{
	    return userCheckDao.insertUserCheck(userCheck);
	}
	
	/**
     * 修改签到
     * 
     * @param userCheck 签到信息
     * @return 结果
     */
	 @Override
	public int updateUserCheck(UserCheck userCheck)
	{
	    return userCheckDao.updateUserCheck(userCheck);
	}
	
	/**
     * 保存签到
     * 
     * @param userCheck 签到信息
     * @return 结果
     */
	 @Override
	public int saveUserCheck(UserCheck userCheck)
	{
	    Integer id = userCheck.getId();
		int rows = 0;
		if (StringUtils.isNotNull(id))
        {
		    rows = userCheckDao.updateUserCheck(userCheck);
		}
		else
        {
		    rows = userCheckDao.insertUserCheck(userCheck);
		}
		return rows;
	}
	
	/**
     * 删除签到信息
     * 
     * @param id 签到ID
     * @return 结果
     */
	 @Override
	public int deleteUserCheckById(Integer id)
	{
	    return userCheckDao.deleteUserCheckById(id);
	}
	
	/**
     * 批量删除签到对象
     * 
     * @param ids 需要删除的数据ID
     * @return 结果
     */
	 @Override
	public int batchDeleteUserCheck(Integer[] ids)
	{
		return userCheckDao.batchDeleteUserCheck(ids);
	}

	@Override
	public UserCheck selectAppinfo(Map map) {
		return userCheckDao.selectAppinfo(map);
	}

	@Override
	public List<Map<String, Object>> pie(Integer id) {
		return userCheckDao.pie(id);
	}

	@Override
	public int totalNum(Integer id) {
		return userCheckDao.totalNum(id);
	}

	@Override
	public int checkNum(Integer id) {
		return userCheckDao.checkNum(id);
	}

	@Override
	public List<Map<String, Object>> selectCheckList(Integer id) {
		return userCheckDao.selectCheckList(id);
	}

}
