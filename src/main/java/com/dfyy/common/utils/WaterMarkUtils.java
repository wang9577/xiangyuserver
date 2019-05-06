package com.dfyy.common.utils;
import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;

import javax.imageio.ImageIO;
/**
 * @use 利用Java代码给图片加水印
 */
public class WaterMarkUtils {

    /**
     * @param srcImgPath 源图片路径
     * @param tarImgPath 保存的图片路径
     * @param waterMarkContent 水印内容
     * @param markContentColor 水印颜色
     * @param font 水印字体
     */
    public void addWaterMark(String srcImgPath, String tarImgPath, String waterMarkContent,String  waterMarkContent1,String  waterMarkContent2,String waterMarkContent3,String waterMarkContent4,String waterMarkContent5,String waterMarkContent6,String waterMarkContent7, Color markContentColor,Font font) {

        try {
            // 读取原图片信息
            File srcImgFile = new File(srcImgPath);//得到文件
            Image srcImg = ImageIO.read(srcImgFile);//文件转化为图片
            int srcImgWidth = srcImg.getWidth(null);//获取图片的宽
            int srcImgHeight = srcImg.getHeight(null);//获取图片的高
            // 加水印
            BufferedImage bufImg = new BufferedImage(srcImgWidth, srcImgHeight, BufferedImage.TYPE_INT_RGB);
            Graphics2D g = bufImg.createGraphics();
            g.drawImage(srcImg, 0, 0, srcImgWidth, srcImgHeight, null);
            g.setColor(markContentColor); //根据图片的背景设置水印颜色
            g.setFont(font);              //设置字体

            //设置水印的坐标 
            int x=120;
            int x1=230;
            int x2=320;
            int x3=460;
            int x4=545;
            int x5=610;
            int x6=480;
            int x7=170;
            int x8=630;
            int x9=695;
            int x10=735;
            int y=247;
            int y1=287;
            int y2=517;
            int y3=540;
            g.drawString(waterMarkContent, x, y);  //画出水印
            g.drawString(waterMarkContent1, x1, y);
            g.drawString(waterMarkContent2, x2, y);
            g.drawString(waterMarkContent3, x3, y);
            g.drawString(waterMarkContent4, x4, y);
            g.drawString(waterMarkContent5, x5, y);
            g.drawString(waterMarkContent6, x6, y1);
            g.drawString(waterMarkContent7, x7, y2);
            g.drawString(waterMarkContent3, x8, y3);
            g.drawString(waterMarkContent4, x9, y3);
            g.drawString(waterMarkContent5, x10, y3);
            g.dispose();  
            // 输出图片  
            FileOutputStream outImgStream = new FileOutputStream(tarImgPath);  
            ImageIO.write(bufImg, "jpg", outImgStream);
            System.out.println("添加水印完成");  
            outImgStream.flush();  
            outImgStream.close();  

        } catch (Exception e) {
            // TODO: handle exception
        }
    }
   /*public static void main(String[] args) {
        Font font = new Font("微软雅黑", Font.PLAIN, 20);                     //水印字体
        String srcImgPath="C:/Users/qt/Pictures/东方易元证书(1).jpg"; //源图片地址
        String tarImgPath="C:/Users/qt/Pictures/dfyy1.jpg"; //待存储的地址
        String waterMarkContent="赵小雷";  //水印内容
        String waterMarkContent1="男";  //水印内容
        String waterMarkContent2="河南";  //水印内容
        String waterMarkContent3="2018";  //水印内容
        String waterMarkContent4="11";  //水印内容
        String waterMarkContent5="11";  //水印内容
        String waterMarkContent6="小关";  //水印内容
        String waterMarkContent7="DM0860371001215101";  //水印内容
        Color color=new Color(00,00,00,255);                               //水印图片色彩以及透明度
        new WaterMarkUtils().addWaterMark(srcImgPath, tarImgPath, waterMarkContent,waterMarkContent1,waterMarkContent2,waterMarkContent3,waterMarkContent4, waterMarkContent5,waterMarkContent6,waterMarkContent7,color,font);

    }*/

}
