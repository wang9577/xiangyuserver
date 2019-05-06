package com.dfyy.project.monitor.online.controller;

import java.util.List;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import com.dfyy.framework.aspectj.lang.annotation.Log;
import com.dfyy.framework.shiro.session.OnlineSessionDAO;
import com.dfyy.framework.web.controller.BaseController;
import com.dfyy.framework.web.domain.Message;
import com.dfyy.framework.web.page.TableDataInfo;
import com.dfyy.project.monitor.online.domain.OnlineSession;
import com.dfyy.project.monitor.online.domain.UserOnline;
import com.dfyy.project.monitor.online.service.IUserOnlineService;

/**
 * 在线用户监控
 * 
 * @author dfyy
 */
@Controller
@RequestMapping("/monitor/online")
public class UserOnlineController extends BaseController
{
    private String prefix = "monitor/online";

    @Autowired
    private IUserOnlineService userOnlineService;

    @Autowired
    private OnlineSessionDAO onlineSessionDAO;

    @RequiresPermissions("monitor:online:view")
    @GetMapping()
    public String online()
    {
        return prefix + "/online";
    }

    @RequiresPermissions("monitor:online:list")
    @GetMapping("/list")
    @ResponseBody
    public TableDataInfo list(UserOnline userOnline)
    {
        setPageInfo(userOnline);
        List<UserOnline> list = userOnlineService.selectUserOnlineList(userOnline);
        return getDataTable(list);
    }

    @RequiresPermissions("monitor:online:batchForceLogout")
    @Log(title = "监控管理", action = "在线用户-批量强退用户")
    @PostMapping("/batchForceLogout")
    @ResponseBody
    public Message batchForceLogout(@RequestParam("ids[]") String[] ids)
    {
        for (String sessionId : ids)
        {
            UserOnline online = userOnlineService.selectOnlineById(sessionId);
            if (online == null)
            {
                return Message.error("用户已下线");
            }
            OnlineSession onlineSession = (OnlineSession) onlineSessionDAO.readSession(online.getSessionId());
            if (onlineSession == null)
            {
                return Message.error("用户已下线");
            }
            onlineSession.setStatus(OnlineSession.OnlineStatus.off_line);
            online.setStatus(OnlineSession.OnlineStatus.off_line);
            userOnlineService.saveOnline(online);
        }
        return Message.ok();
    }

    @RequiresPermissions("monitor:online:forceLogout")
    @Log(title = "监控管理", action = "在线用户-强退用户")
    @RequestMapping("/forceLogout/{sessionId}")
    @ResponseBody
    public Message forceLogout(@PathVariable("sessionId") String sessionId)
    {
        UserOnline online = userOnlineService.selectOnlineById(sessionId);
        if (online == null)
        {
            return Message.error("用户已下线");
        }
        OnlineSession onlineSession = (OnlineSession) onlineSessionDAO.readSession(online.getSessionId());
        if (onlineSession == null)
        {
            return Message.error("用户已下线");
        }
        onlineSession.setStatus(OnlineSession.OnlineStatus.off_line);
        online.setStatus(OnlineSession.OnlineStatus.off_line);
        userOnlineService.saveOnline(online);
        return Message.ok();
    }

}
