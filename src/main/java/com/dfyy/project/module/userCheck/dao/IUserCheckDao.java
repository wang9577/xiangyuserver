package com.dfyy.project.module.userCheck.dao;

import com.dfyy.project.module.userCheck.domain.UserCheck;
import java.util.List;
import java.util.Map;

/**
 * 签到 数据层
 * 
 * @author dfyy
 * @date 2019-05-01
 */
public interface IUserCheckDao 
{

	/**
     * 查询签到信息
     * 
     * @param id 签到ID
     * @return 签到信息
     */
	public UserCheck selectUserCheckById(Integer id);
	
	/**
     * 查询签到列表
     * 
     * @param userCheck 签到信息
     * @return 签到集合
     */
	public List<UserCheck> selectUserCheckList(UserCheck userCheck);
	
	/**
     * 新增签到
     * 
     * @param userCheck 签到信息
     * @return 结果
     */
	public int insertUserCheck(UserCheck userCheck);
	
	/**
     * 修改签到
     * 
     * @param userCheck 签到信息
     * @return 结果
     */
	public int updateUserCheck(UserCheck userCheck);
	
	/**
     * 删除签到
     * 
     * @param id 签到ID
     * @return 结果
     */
	public int deleteUserCheckById(Integer id);
	
	/**
     * 批量删除签到
     * 
     * @param ids 需要删除的数据ID
     * @return 结果
     */
	public int batchDeleteUserCheck(Integer[] ids);

	public UserCheck selectAppinfo(Map map);

	public List<Map<String,Object>> pie(Integer id);

	public int totalNum(Integer id);

	public int checkNum(Integer id);

	public List<Map<String,Object>> selectCheckList(Integer id);

}