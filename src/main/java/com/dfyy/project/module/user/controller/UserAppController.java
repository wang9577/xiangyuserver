package com.dfyy.project.module.user.controller;

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
import com.dfyy.project.module.user.domain.UserApp;
import com.dfyy.project.module.user.service.IUserAppService;
import com.dfyy.framework.web.controller.BaseController;
import com.dfyy.framework.web.page.TableDataInfo;
import com.dfyy.framework.web.domain.Message;

/**
 * 用户 控制层处理
 * 
 * @author dfyy
 * @date 2018-12-27
 */
@Controller
@RequestMapping("/module/user")
public class UserAppController extends BaseController
{
    private String prefix = "module/user";
	
	@Autowired
	private IUserAppService userAppService;
	
	@GetMapping()
	@RequiresPermissions("module:user:view")
	String user()
	{
	    return prefix + "/user";
	}
	
	/**
	 * 查询用户列表
	 */
	@GetMapping("/list")
	@RequiresPermissions("module:user:list")
	@ResponseBody
	public TableDataInfo list(UserApp user)
	{
		setPageInfo(user);
        List<UserApp> list = userAppService.selectUserList(user);
		return getDataTable(list);
	}
	
	/**
	 * 新增用户
	 */
	@GetMapping("/add")
	@RequiresPermissions("module:user:add")
	public String add()
	{
	    return prefix + "/add";
	}

	/**
	 * 修改用户
	 */
	@GetMapping("/edit/{id}")
	@RequiresPermissions("module:user:edit")
	public String edit(@PathVariable("id") Integer id, Model model)
	{
		UserApp user = userAppService.selectUserById(id);
		model.addAttribute("user", user);
	    return prefix + "/edit";
	}
	
	/**
	 * 保存用户
	 */
	@ResponseBody
	@PostMapping("/save")
	@RequiresPermissions("module:user:add")
	public Message save(UserApp user)
	{
		if (userAppService.saveUser(user) > 0)
		{
			return Message.ok();
		}
		return Message.error();
	}
	
	/**
	 * 删除用户
	 */
	@PostMapping( "/remove/{id}")
	@ResponseBody
	@RequiresPermissions("module:user:remove")
	public Message remove(@PathVariable("id") Integer id)
	{
		if (userAppService.deleteUserById(id) > 0)
		{
		    return Message.ok();
		}
		return Message.error();
	}
	
	/**
	 * 批量删除用户
	 */
	@PostMapping( "/batchRemove")
	@ResponseBody
	@RequiresPermissions("module:user:batchRemove")
	public Message remove(@RequestParam("ids[]") Integer[] ids)
	{
		int rows = userAppService.batchDeleteUser(ids);
		if (rows > 0)
        {
            return Message.ok();
        }
        return Message.error();
	}
	
}
