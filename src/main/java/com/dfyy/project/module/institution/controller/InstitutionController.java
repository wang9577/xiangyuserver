package com.dfyy.project.module.institution.controller;

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
import com.dfyy.project.module.institution.domain.Institution;
import com.dfyy.project.module.institution.service.IInstitutionService;
import com.dfyy.framework.web.controller.BaseController;
import com.dfyy.framework.web.page.TableDataInfo;
import com.dfyy.framework.web.domain.Message;

/**
 * 院系 控制层处理
 * 
 * @author dfyy
 * @date 2018-12-27
 */
@Controller
@RequestMapping("/module/institution")
public class InstitutionController extends BaseController
{
    private String prefix = "module/institution";
	
	@Autowired
	private IInstitutionService institutionService;
	
	@GetMapping()
	@RequiresPermissions("module:institution:view")
	String institution()
	{
	    return prefix + "/institution";
	}
	
	/**
	 * 查询院系列表
	 */
	@GetMapping("/list")
	@RequiresPermissions("module:institution:list")
	@ResponseBody
	public TableDataInfo list(Institution institution)
	{
		setPageInfo(institution);
        List<Institution> list = institutionService.selectInstitutionList(institution);
		return getDataTable(list);
	}
	
	/**
	 * 新增院系
	 */
	@GetMapping("/add")
	@RequiresPermissions("module:institution:add")
	public String add()
	{
	    return prefix + "/add";
	}

	/**
	 * 修改院系
	 */
	@GetMapping("/edit/{id}")
	@RequiresPermissions("module:institution:edit")
	public String edit(@PathVariable("id") Integer id, Model model)
	{
		Institution institution = institutionService.selectInstitutionById(id);
		model.addAttribute("institution", institution);
	    return prefix + "/edit";
	}
	
	/**
	 * 保存院系
	 */
	@ResponseBody
	@PostMapping("/save")
	@RequiresPermissions("module:institution:add")
	public Message save(Institution institution)
	{
		if (institutionService.saveInstitution(institution) > 0)
		{
			return Message.ok();
		}
		return Message.error();
	}
	
	/**
	 * 删除院系
	 */
	@PostMapping( "/remove/{id}")
	@ResponseBody
	@RequiresPermissions("module:institution:remove")
	public Message remove(@PathVariable("id") Integer id)
	{
		Institution institution = new Institution();
		institution.setId(id);
		institution.setIsDel(1);
		if (institutionService.updateInstitution(institution) > 0)
		{
		    return Message.ok();
		}
		return Message.error();
	}
	
	/**
	 * 批量删除院系
	 */
	@PostMapping( "/batchRemove")
	@ResponseBody
	@RequiresPermissions("module:institution:batchRemove")
	public Message remove(@RequestParam("ids[]") Integer[] ids)
	{
		int rows = institutionService.batchDeleteInstitution(ids);
		if (rows > 0)
        {
            return Message.ok();
        }
        return Message.error();
	}
	
}
