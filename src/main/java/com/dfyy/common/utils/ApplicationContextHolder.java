package com.dfyy.common.utils;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

/**
 * @author gjm
 * @date 2017年7月24日 下午6:33:24
 * @describe
 */
@Component
public class ApplicationContextHolder implements ApplicationContextAware {

	/**
	 * 当前spring [web应用上下文]
	 */
	private static ApplicationContext context;
	/**
	 * 设置当前上下文环境，此方法由spring自动装配
	 */
    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        context = applicationContext;   
    }

    public static ApplicationContext getContext() {
        return context;
    }
}
