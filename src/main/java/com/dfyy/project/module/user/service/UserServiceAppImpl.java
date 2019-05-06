package com.dfyy.project.module.user.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.dfyy.common.utils.StringUtils;
import com.dfyy.project.module.user.dao.IUserAppDao;
import com.dfyy.project.module.user.domain.UserApp;

/**
 * 用户 服务层实现
 * 
 * @author dfyy
 * @date 2018-12-27
 */
@Service
public class UserServiceAppImpl implements IUserAppService
{
	@Autowired
	private IUserAppDao userDao;
	
	/**
     * 查询用户信息
     * 
     * @param id 用户ID
     * @return 用户信息
     */
	 @Override
	public UserApp selectUserById(Integer id)
	{
	    return userDao.selectUserById(id);
	}
	
	/**
     * 查询用户列表
     * 
     * @param user 用户信息
     * @return 用户集合
     */
	 @Override
	public List<UserApp> selectUserList(UserApp user)
	{
	    return userDao.selectUserList(user);
	}
	
    /**
     * 新增用户
     * 
     * @param user 用户信息
     * @return 结果
     */
	 @Override
	public int insertUser(UserApp user)
	{
	    return userDao.insertUser(user);
	}
	
	/**
     * 修改用户
     * 
     * @param user 用户信息
     * @return 结果
     */
	 @Override
	public int updateUser(UserApp user)
	{
	    return userDao.updateUser(user);
	}
	
	/**
     * 保存用户
     * 
     * @param user 用户信息
     * @return 结果
     */
	 @Override
	public int saveUser(UserApp user)
	{
	    Integer id = user.getId();
		int rows = 0;
		if (StringUtils.isNotNull(id))
        {
		    rows = userDao.updateUser(user);
		}
		else
        {
		    rows = userDao.insertUser(user);
		}
		return rows;
	}
	
	/**
     * 删除用户信息
     * 
     * @param id 用户ID
     * @return 结果
     */
	 @Override
	public int deleteUserById(Integer id)
	{
	    return userDao.deleteUserById(id);
	}
	
	/**
     * 批量删除用户对象
     * 
     * @param ids 需要删除的数据ID
     * @return 结果
     */
	 @Override
	public int batchDeleteUser(Integer[] ids)
	{
		return userDao.batchDeleteUser(ids);
	}

	@Override
	public int selectisuser(String userName) {
		return userDao.selectisuser(userName);
	}

	@Override
	public UserApp selectUserName(Map<String, Object> map) {
		return userDao.selectUserName(map);
	}

	@Override
	public Map<String, Object> selectPlan(Integer id) {
		return userDao.selectPlan(id);
	}

	@Override
	public Map<String, Object> selectCourseName(Integer id) {
		return userDao.selectCourseName(id);
	}

	@Override
	public List<Map<String, Object>> selectStudent(Integer id) {
		return userDao.selectStudent(id);
	}

	@Override
	public List<Map<String, Object>> selectMoreCourse(Integer id) {
		return userDao.selectMoreCourse(id);
	}

	@Override
	public List<Map<String, Object>> selectMorePlan(Integer id) {
		return userDao.selectMorePlan(id);
	}

}
