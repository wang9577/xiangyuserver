package com.dfyy.project.monitor.job.task;

import org.springframework.stereotype.Component;

import com.dfyy.common.utils.NumberGenerator;

/**
 * 定时任务调度测试
 * 
 * @author dfyy
 */
@Component("ryTask")
public class RyTask
{
	
	
    public void ryParams(String params)
    { 
    	NumberGenerator.count1=1;
		
    }

    public void ryNoParams()
    {
        System.out.println("执行无参方法");
    }

}
