package com.dfyy;

import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;

/**
 * web容器中进行部署
 * 
 * @author dfyy
 */
public class DfyyYiServletInitializer extends SpringBootServletInitializer
{
    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application)
    {
        return application.sources(DfyyiApplication.class);
    }

}
