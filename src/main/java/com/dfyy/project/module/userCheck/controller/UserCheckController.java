package com.dfyy.project.module.userCheck.controller;

import java.util.List;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import com.dfyy.project.module.userCheck.domain.UserCheck;
import com.dfyy.project.module.userCheck.service.IUserCheckService;
import com.dfyy.framework.web.controller.BaseController;
import com.dfyy.framework.web.page.TableDataInfo;
import com.dfyy.framework.web.domain.Message;

/**
 * 签到 控制层处理
 * 
 * @author dfyy
 * @date 2019-05-01
 */
@Controller
@RequestMapping("/module/userCheck")
public class UserCheckController extends BaseController
{
    private String prefix = "module/userCheck";
	
	@Autowired
	private IUserCheckService userCheckService;
	
	@GetMapping()
	@RequiresPermissions("module:userCheck:view")
	String userCheck()
	{
	    return prefix + "/userCheck";
	}
	
	/**
	 * 查询签到列表
	 */
	@GetMapping("/list")
	@RequiresPermissions("module:userCheck:list")
	@ResponseBody
	public TableDataInfo list(UserCheck userCheck)
	{
		setPageInfo(userCheck);
        List<UserCheck> list = userCheckService.selectUserCheckList(userCheck);
		return getDataTable(list);
	}
	
	/**
	 * 新增签到
	 */
	@GetMapping("/add")
	@RequiresPermissions("module:userCheck:add")
	public String add()
	{
	    return prefix + "/add";
	}

	/**
	 * 修改签到
	 */
	@GetMapping("/edit/{id}")
	@RequiresPermissions("module:userCheck:edit")
	public String edit(@PathVariable("id") Integer id, Model model)
	{
		UserCheck userCheck = userCheckService.selectUserCheckById(id);
		model.addAttribute("userCheck", userCheck);
	    return prefix + "/edit";
	}
	
	/**
	 * 保存签到
	 */
	@ResponseBody
	@PostMapping("/save")
	@RequiresPermissions("module:userCheck:add")
	public Message save(UserCheck userCheck)
	{
		if (userCheckService.saveUserCheck(userCheck) > 0)
		{
			return Message.ok();
		}
		return Message.error();
	}
	
	/**
	 * 删除签到
	 */
	@PostMapping( "/remove/{id}")
	@ResponseBody
	@RequiresPermissions("module:userCheck:remove")
	public Message remove(@PathVariable("id") Integer id)
	{
		if (userCheckService.deleteUserCheckById(id) > 0)
		{
		    return Message.ok();
		}
		return Message.error();
	}
	
	/**
	 * 批量删除签到
	 */
	@PostMapping( "/batchRemove")
	@ResponseBody
	@RequiresPermissions("module:userCheck:batchRemove")
	public Message remove(@RequestParam("ids[]") Integer[] ids)
	{
		int rows = userCheckService.batchDeleteUserCheck(ids);
		if (rows > 0)
        {
            return Message.ok();
        }
        return Message.error();
	}
	
}
