package com.dfyy.common.utils;


import com.github.wxpay.sdk.WXPayConfig;
import org.apache.commons.io.IOUtils;

import java.io.ByteArrayInputStream;
import java.io.InputStream;

/** 配置我们自己的信息  */

public class OurWxPayConfig implements WXPayConfig {

    /** 加载证书  这里证书需要到微信商户平台进行下载*/
    private byte [] certData;

    public OurWxPayConfig() throws  Exception{
        InputStream certStream = Thread.currentThread().getContextClassLoader().getResourceAsStream("cert/1401241702_20181108_cert.p12");
        this.certData = IOUtils.toByteArray(certStream);
        certStream.close();
    }

    /** appid
     * 商户号
     * 秘钥
     * */
    //小程序appid
    @Override
    public String getAppID() {
        return "wx2440a1a790e4aa76";
//        return "wx0b4239e1a235e79a";
    }
    //微信支付的商户id
    @Override
    public String getMchID() {
        return "1401241702";
//        return "1498660722";
    }
    //微信支付的商户密钥
    @Override
    public String getKey() {
        return "1da03f39296a890d87b32991ce659b1e";
//        return "XjgVCc2vEXUaBdBYXc9QFUTnt5jLramE";
    }

    @Override
    public InputStream getCertStream() {
        return new ByteArrayInputStream(this.certData);
    }

    @Override
    public int getHttpConnectTimeoutMs() {
        return 0;
    }

    @Override
    public int getHttpReadTimeoutMs() {
        return 0;
    }
}