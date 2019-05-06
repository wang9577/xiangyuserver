package com.dfyy.common.utils;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import java.io.File;

@Configuration
public class WebMvcConf extends WebMvcConfigurerAdapter {
    public static final String separator=File.separator;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/imgfile/**").addResourceLocations("file:E:/imgfile/");
//         registry.addResourceHandler("/imgfile/**").addResourceLocations("file:/server/project/dfyy/imgfile/");
    } 

}