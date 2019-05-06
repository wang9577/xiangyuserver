package com.dfyy;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 * 启动程序
 * 
 * @author dfyy
 */
@SpringBootApplication
@EnableTransactionManagement
@MapperScan("com.dfyy.project.*.*.dao")
@EnableScheduling
public class DfyyiApplication
{
    public static void main(String[] args)
    {
        SpringApplication.run(DfyyiApplication.class, args);
        System.out.println("(♥◠‿◠)ﾉﾞ  我的LOL皮肤启动中   ლ(´ڡ`ლ)ﾞ  \n" +
                " .-------.       ____     __        \n" +
                " |  _ _   \\      \\   \\   /  /    \n" +
                " | ( ' )  |       \\  _. /  '       \n" +
                " |(_ o _) /        _( )_ .'         \n" +
                " | (_,_).' __  ___(_ o _)'          \n" +
                " |  |\\ \\  |  ||   |(_,_)'         \n" +
                " |  | \\ `'   /|   `-'  /           \n" +
                " |  |  \\    /  \\      /           \n" +
                " ''-'   `'-'    `-..-'              ");
    }
}
