package com.dfyy.framework.web.domain;

import java.util.HashMap;
import java.util.Map;

/**
 * 操作消息提醒
 * 
 * @author dfyy
 */
public class Message extends HashMap<String, Object>
{
    private static final long serialVersionUID = 1L;

    /**
     * 初始化一个新创建的 Message 对象，默认成功。
     */
    public Message()
    {
        put("code", 0);
        put("msg", "操作成功");
    }

    /**
     * 返回错误消息
     * 
     * @return 错误消息
     */
    public static Message error()
    {
        return error(1, "操作失败");
    }

    /**
     * 返回错误消息
     * 
     * @param msg 内容
     * @return 错误消息
     */
    public static Message error(String msg)
    {
        return error(500, msg);
    }

    /**
     * 返回错误消息
     * 
     * @param code 错误码
     * @param msg 内容
     * @return 错误消息
     */
    public static Message error(int code, String msg)
    {
        Message json = new Message();
        json.put("code", code);
        json.put("msg", msg);
        return json;
    }

    /**
     * 返回成功消息
     * 
     * @param msg 内容
     * @return 成功消息
     */
    public static Message ok(String msg)
    {
        Message json = new Message();
        json.put("msg", msg);
        return json;
    }

    /**
     * 返回成功消息
     * 
     * @param map 内容
     * @return 成功消息
     */
    public static Message ok(Map<String, Object> map)
    {
        Message json = new Message();
        json.putAll(map);
        return json;
    }

    /**
     * 返回成功消息
     * 
     * @return 成功消息
     */
    public static Message ok()
    {
        return new Message();
    }

    /**
     * 返回成功消息
     * 
     * @param key 键值
     * @param value 内容
     * @return 成功消息
     */
    @Override
    public Message put(String key, Object value)
    {
        super.put(key, value);
        return this;
    }
}
