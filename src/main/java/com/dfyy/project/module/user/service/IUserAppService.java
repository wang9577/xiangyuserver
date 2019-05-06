package com.dfyy.project.module.user.service;

import com.dfyy.project.module.user.domain.UserApp;
import java.util.List;
import java.util.Map;

/**
 * 用户 服务层
 * 
 * @author dfyy
 * @date 2018-12-27
 */
public interface IUserAppService
{
	
	/**
     * 查询用户信息
     * 
     * @param id 用户ID
     * @return 用户信息
     */
	public UserApp selectUserById(Integer id);
	
	/**
     * 查询用户列表
     * 
     * @param user 用户信息
     * @return 用户集合
     */
	public List<UserApp> selectUserList(UserApp user);
	
	/**
     * 新增用户
     * 
     * @param user 用户信息
     * @return 结果
     */
	public int insertUser(UserApp user);
	
	/**
     * 修改用户
     * 
     * @param user 用户信息
     * @return 结果
     */
	public int updateUser(UserApp user);
	
	/**
     * 保存用户
     * 
     * @param user 用户信息
     * @return 结果
     */
	public int saveUser(UserApp user);
	
	/**
     * 删除用户信息
     * 
     * @param id 用户ID
     * @return 结果
     */
	public int deleteUserById(Integer id);
	
	/**
     * 批量删除用户信息
     * 
     * @param ids 需要删除的数据ID
     * @return 结果
     */
	public int batchDeleteUser(Integer[] ids);

	public int selectisuser(String userName);

	public UserApp selectUserName(Map<String,Object> map);

	public Map<String,Object> selectPlan(Integer id);

	public Map<String,Object> selectCourseName(Integer id);

	public List<Map<String,Object>> selectStudent(Integer id);


	public List<Map<String,Object>> selectMoreCourse(Integer id);

	public List<Map<String,Object>> selectMorePlan(Integer id);

}
