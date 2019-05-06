package com.dfyy.project.app;

import com.dfyy.framework.web.controller.BaseController;
import com.dfyy.project.module.user.domain.UserApp;
import com.dfyy.project.module.user.service.IUserAppService;
import com.dfyy.project.module.userCheck.domain.UserCheck;
import com.dfyy.project.module.userCheck.service.IUserCheckService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/app/teacher")
public class TeacherAppController extends BaseController {

    @Autowired
    private IUserAppService userAppService;

    @Autowired
    private IUserCheckService userCheckService;

    @RequestMapping(path = "/login",method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> loginEd(HttpServletRequest request){
        Map<String,Object> resultMap = new HashMap<>();
        String userName = request.getParameter("userName");
        String passWord = request.getParameter("passWord");
        String type = request.getParameter("type");
        String msg=  "";
        int status = 1;
        Map<String,Object> dataMap = new HashMap<>();
        if(userAppService.selectisuser(userName)>0){
            Map parmMap = new HashMap();
            parmMap.put("userName",userName);
            parmMap.put("passWord",passWord);
            UserApp userApp = userAppService.selectUserName(parmMap);
            if(userApp!=null){
                if(userApp.getType()!=Integer.parseInt(type)){
                    msg="身份不符";
                }else {
                    status=0;
                    msg="登陆成功";
                    dataMap.put("id",userApp.getId());
                    dataMap.put("name",userApp.getName());
                    Map<String,Object> courseId = userAppService.selectPlan(userApp.getId());
                    if(courseId!=null){
                        dataMap.put("courseId",courseId.get("id"));
                    }else {
                        dataMap.put("courseId",null);
                    }
                }
            }else {
                msg = "密码错误!";
            }
        }else {
            msg = "用户名不存在!";
        }
        resultMap.put("status",status);
        resultMap.put("msg",msg);
        resultMap.put("data",dataMap);
        return resultMap;

    }

    @RequestMapping(path = "/selectmain",method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> selectmain(HttpServletRequest request){
        String planId = request.getParameter("planId");
        Map<String,Object> map = userAppService.selectCourseName(Integer.parseInt(planId));
        List<Map<String,Object>> list = userAppService.selectStudent(Integer.parseInt(planId));
        List<Map<String,Object>> newList = new ArrayList<>();
        for(Map<String,Object> map1 : list){
            Map parmMap = new HashMap();
            parmMap.put("pId",planId);
            parmMap.put("stuId",map1.get("id"));
            UserCheck userCheck = userCheckService.selectAppinfo(parmMap);
            if(userCheck!=null){
                map1.put("type",userCheck.getType());
            }else {
                map1.put("type",0);
            }
            newList.add(map1);
        }
        Map dataMap = new HashMap();
        dataMap.put("courseName",map);
        dataMap.put("list",newList);
        return dataMap;
    }

    @RequestMapping(path = "/studentCheck",method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> studentCheck(HttpServletRequest request){
        Map<String,Object> resultMap = new HashMap<>();
        String userId = request.getParameter("userId");
        String planId = request.getParameter("planId");
        String type = request.getParameter("type");
        Map parmMap = new HashMap();
        parmMap.put("pId",planId);
        parmMap.put("stuId",userId);
        UserCheck userCheck = userCheckService.selectAppinfo(parmMap);
        if(userCheck!=null){
            userCheck.setType(Integer.parseInt(type));
            userCheckService.saveUserCheck(userCheck);
        }else {
            UserCheck u1 = new UserCheck();
            u1.setPId(Integer.parseInt(planId));
            u1.setType(Integer.parseInt(type));
            u1.setStuId(Integer.parseInt(userId));
            userCheckService.saveUserCheck(u1);
        }
        resultMap.put("status",0);
        resultMap.put("msg","操作成功");
        return resultMap;
    }

    @RequestMapping(path = "/selectCourse",method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> selectCourse(HttpServletRequest request){
        Map<String,Object> resultMap = new HashMap<>();
        String userId = request.getParameter("userId");
        List<Map<String,Object>> resultList = new ArrayList<>();
        List<Map<String,Object>> list = userAppService.selectMoreCourse(Integer.parseInt(userId));
        for(Map<String,Object> map : list){
            Map newMap = new HashMap();
            newMap.put("courseName",map.get("name"));
            List<Map<String,Object>> childList = userAppService.selectMorePlan(Integer.parseInt(map.get("id").toString()));
            newMap.put("childRen",childList);
            resultList.add(newMap);
        }
        resultMap.put("data",resultList);
        return resultMap;
    }
    @RequestMapping(path = "/checkErWei",method = {RequestMethod.GET,RequestMethod.POST})
    @ResponseBody
    public Map<String,Object> checkErWei(HttpServletRequest request){
        Map<String,Object> resultMap = new HashMap<>();
        String planId = request.getParameter("planId");
        String userId = request.getParameter("userId");
        Map parmMap = new HashMap();
        parmMap.put("pId",planId);
        parmMap.put("stuId",userId);
        if(userId!=null && !"".equals(userId)) {
            UserCheck userCheck = userCheckService.selectAppinfo(parmMap);
            if (userCheck != null) {
                resultMap.put("status", 1);
                resultMap.put("msg", "亲,您已经签过到了,么么哒");
            } else {
                UserCheck u1 = new UserCheck();
                u1.setPId(Integer.parseInt(planId));
                u1.setType(1);
                u1.setStuId(Integer.parseInt(userId));
                int i = userCheckService.saveUserCheck(u1);
                if (i > 0) {
                    resultMap.put("status", 0);
                    resultMap.put("msg", "签到成功");
                } else {
                    resultMap.put("status", 1);
                    resultMap.put("msg", "签到失败");
                }
            }
        }else {
            resultMap.put("status", 1);
            resultMap.put("msg", "签到失败");
        }
        return resultMap;
    }

    @RequestMapping(path = "/checkPie",method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> checkPie(HttpServletRequest request){
        Map<String,Object> resultMap = new HashMap<>();
        String planId = request.getParameter("planId");
        List<Map<String,Object>> list = userCheckService.pie(Integer.parseInt(planId));
        int totalNum = userCheckService.totalNum(Integer.parseInt(planId));
        int checkNum = userCheckService.checkNum(Integer.parseInt(planId));
        int noNum = totalNum-checkNum;
        Map checkMap = new HashMap<>();
        checkMap.put("totalNum",totalNum);
        checkMap.put("checkNum",checkNum);
        checkMap.put("noNum",noNum);
        resultMap.put("checkMap",checkMap);
        resultMap.put("pie",list);
        return resultMap;
    }

    @RequestMapping(path = "/selectCheckList",method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> selectCheckList(HttpServletRequest request){
        Map<String,Object> resultMap = new HashMap<>();
        String userId = request.getParameter("userId");
        List<Map<String,Object>> list = userCheckService.selectCheckList(Integer.parseInt(userId));
        resultMap.put("status", 0);
        resultMap.put("msg", "成功");
        if(list.size()==0){
            resultMap.put("status", 1);
            resultMap.put("msg", "无数据");
        }
        resultMap.put("data",list);
        return resultMap;
    }

//    @RequestMapping(path = "/updatePassword",method = RequestMethod.POST)
//    @ResponseBody
//    public Map<String,Object> updatePassword(HttpServletRequest request){
//        Map<String,Object> resultMap = new HashMap<>();
//        String userName = request.getParameter("userName");
//        String oldPassword = request.getParameter("oldPassword");
//        String newPassword = request.getParameter("newPassword");
//        String msg=  "";
//        int status = 1;
//        if(userAppService.selectisuser(userName)>0){
//            Map parmMap = new HashMap();
//            parmMap.put("userName",userName);
//            parmMap.put("passWord",oldPassword);
//            UserApp userApp = userAppService.selectUserName(parmMap);
//
//        }else {
//            msg="用户名不存在!";
//        }
//        resultMap.put("status",status);
//        resultMap.put("msg",msg);
//        return resultMap;
//    }
}
