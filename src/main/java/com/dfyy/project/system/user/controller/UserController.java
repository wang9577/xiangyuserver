package com.dfyy.project.system.user.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import com.dfyy.framework.aspectj.lang.annotation.Log;
import com.dfyy.framework.web.controller.BaseController;
import com.dfyy.framework.web.domain.Message;
import com.dfyy.framework.web.page.TableDataInfo;
import com.dfyy.project.system.post.domain.Post;
import com.dfyy.project.system.post.service.IPostService;
import com.dfyy.project.system.role.domain.Role;
import com.dfyy.project.system.role.service.IRoleService;
import com.dfyy.project.system.user.domain.User;
import com.dfyy.project.system.user.service.IUserService;

/**
 * 用户信息
 * 
 * @author dfyy
 */
@Controller
@RequestMapping("/system/user")
public class UserController extends BaseController
{

    private String prefix = "system/user";

    @Autowired
    private IUserService userService;

    @Autowired
    private IRoleService roleService;

    @Autowired
    private IPostService postService;
    

    @RequiresPermissions("system:user:view")
    @GetMapping()
    public String user()
    {
        return prefix + "/user";
    }

    @RequiresPermissions("system:user:list")
    @GetMapping("/list")
    @ResponseBody
    public TableDataInfo list(User user)
    {
        setPageInfo(user);
        List<User> list = userService.selectUserList(user);
        return getDataTable(list);
    }

    /**
     * 修改用户
     */
    @RequiresPermissions("system:user:edit")
    @Log(title = "系统管理", action = "用户管理-修改用户")
    @GetMapping("/edit/{userId}")
    public String edit(@PathVariable("userId") Long userId, Model model)
    {
        User user = userService.selectUserById(userId);
        List<Role> roles = roleService.selectRolesByUserId(userId);
        List<Post> posts = postService.selectPostsByUserId(userId);
        model.addAttribute("roles", roles);
        model.addAttribute("posts", posts);
        model.addAttribute("user", user);
        return prefix + "/edit";
    }

    /**
     * 新增用户
     */
    @RequiresPermissions("system:user:add")
    @Log(title = "系统管理", action = "用户管理-新增用户")
    @GetMapping("/add")
    public String add(Model model)
    {
        List<Role> roles = roleService.selectRolesOther();//添加系统用户时角色(已筛选)
        List<Post> posts = postService.selectPostAll();
        model.addAttribute("roles", roles);
        model.addAttribute("posts", posts);
        return prefix + "/add";
    }
    
    /**
	 * 根据手机号查用户
	 */
	@ResponseBody
	@PostMapping("/selectPhone")
	public String selectPhone(String phonenumber) {
		Map<String, Object> map = userService.selectUserByPhone(phonenumber);
		if(map!=null) {
			return "0";
		}
		return "1";
	}
	
	/**
	 * 根据手机号和id 查教练
	 */
	@ResponseBody
	@PostMapping("/selectPhoneB")
	public String selectPhoneAndUserId(String phonenumber, Long userId) {
		Map<String, Object> ma = new HashMap<>();
		ma.put("phonenumber", phonenumber);
		ma.put("userId", userId);
		Map<String, Object> map = userService.selectUserByPhoneAndUserId(ma);
		if (map != null) {
			return "0";
		}
		return "1";
	}

    @RequiresPermissions("system:user:resetPwd")
    @Log(title = "系统管理", action = "用户管理-重置密码")
    @GetMapping("/resetPwd/{userId}")
    public String resetPwd(@PathVariable("userId") Long userId, Model model)
    {
        User user = userService.selectUserById(userId);
        model.addAttribute("user", user);
        return prefix + "/resetPwd";
    }

    @RequiresPermissions("system:user:resetPwd")
    @Log(title = "系统管理", action = "用户管理-重置密码")
    @PostMapping("/resetPwd")
    @ResponseBody
    public Message resetPwd(User user)
    {
        int rows = userService.updateUser(user);
        if (rows > 0)
        {
            return Message.ok();
        }
        return Message.error();
    }

    @RequiresPermissions("system:user:remove")
    @Log(title = "系统管理", action = "用户管理-删除用户")
    @RequestMapping("/remove/{userId}")
    @Transactional(rollbackFor = Exception.class)
    @ResponseBody
    public Message remove(@PathVariable("userId") Long userId)
    {
        User user = userService.selectUserById(userId);
        if (user == null)
        {
            return Message.error("用户不存在");
        }
        if (userService.deleteUserById(userId) > 0)
        {
            return Message.ok();
        }
        return Message.error();
    }

    @RequiresPermissions("system:user:batchRemove")
    @Log(title = "系统管理", action = "用户管理-批量删除")
    @PostMapping("/batchRemove")
    @Transactional(rollbackFor = Exception.class)
    @ResponseBody
    public Message batchRemove(@RequestParam("ids[]") Long[] ids)
    {
        int rows = userService.batchDeleteUser(ids);
        if (rows > 0)
        {
            return Message.ok();
        }
        return Message.error();
    }

    /**
     * 保存
     */
    @RequiresPermissions("system:user:save")
    @Log(title = "系统管理", action = "部门管理-保存部门")
    @PostMapping("/save")
    @Transactional(rollbackFor = Exception.class)
    @ResponseBody
    public Message save(User user)
    {
        if (userService.saveUser(user) > 0)
        {
            return Message.ok();
        }
        return Message.error();
    }

    /**
     * 校验用户名
     */
    @PostMapping("/checkUserNameUnique")
    @ResponseBody
    public String checkUserNameUnique(User user)
    {
        String uniqueFlag = "0";
        if (user != null)
        {
            uniqueFlag = userService.checkUserNameUnique(user.getLoginName());
        }
        return uniqueFlag;
    }

    /**
     * 个人信息
     */
    @GetMapping("/profile")
    public String profile(Model model)
    {
        User user = getUser();
        String sex = user.getSex();
        if ("0".equals(sex))
        {
            user.setSex("性别：男");
        }
        else if ("1".equals(sex))
        {
            user.setSex("性别：女");
        }
        String roleGroup = userService.selectUserRoleGroup(user.getUserId());
        String postGroup = userService.selectUserPostGroup(user.getUserId());
        model.addAttribute("user", user);
        model.addAttribute("roleGroup", roleGroup);
        model.addAttribute("postGroup", postGroup);
        return prefix + "/profile";
    }

}