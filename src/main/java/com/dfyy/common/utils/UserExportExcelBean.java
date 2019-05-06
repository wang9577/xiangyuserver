package com.dfyy.common.utils;

import java.io.IOException;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;


import net.sf.json.JSONObject;

//导出excel的工具类
public class UserExportExcelBean {

	public void exportExcelUtilForHealthy(HttpServletResponse response, List<?> m) {
		try {
			OutputStream os = response.getOutputStream();// 获得输出流
			response.reset(); // 清空输出流
			SimpleDateFormat sdf = new SimpleDateFormat("yyyMMddHHmmss");
			String time = sdf.format(new Date());
			String fileName = "健康档案列表" + time;
			response.setCharacterEncoding("utf-8");
			response.setHeader("Content-Disposition",
					"attachment;filename=" + new String((fileName + ".xls").getBytes(), "ISO8859-1")); // 设定输出文件头
			response.setContentType("application/vnd.ms-excel;charset=utf-8"); // 定义输出类型
			HSSFWorkbook workbook1 = ExcelUtil.makeExcelHead("提现结算列表", 4);

			String[] secondTitles = { "会员编号", "用户id", "出生日期", "身份证号", "地区", "详细地址", "血压", "血糖", "心率", "血脂", "脂肪肝", "酒精肝",
					"血管弹性", "胸闷气短", "肥胖度", "骨质疏松", "运动程度", "非健康状态_疾病名称", "非健康状态_治疗单位", "非健康状态_诊断结果", "非健康状态_医嘱",
					"亚健康状态_疾病名称", "亚健康状态_治疗单位", "亚健康状态_临床表现", "亚健康状态_医嘱", "体检时间", "体检机构", "体检项目", "体检结果", "我的健康运动",
					"我的健康饮食", "我的健康食品", "希望选择的产品方向" };
			HSSFWorkbook workbook2 = ExcelUtil.makeSecondHead(workbook1, secondTitles);
			String[] beanProperty = { "number", "name", "birth_date", "certificates", "region", "address",
					"blood_pressure", "blood_sugar", "heart_rate", "blood_fat", "fatty_liver", "alcoholic_liver",
					"blood_vessel", "chest_tightness", "obesity", "osteoporosis", "degreeofexercise",
					"fjk_disease_name", "fjk_department", "fjk_diagnostic_results", "fjk_doctors_order",
					"yjk_disease_name", "yjk_department", "yjk_diagnostic_results", "yjk_doctors_order", "inspect_time",
					"inspect_mechanism", "inspect_project", "inspect_result", "proposal_motion", "proposal_diet",
					"proposal_food", "proposal_product_direction" };

			JSONObject blood_fat = new JSONObject();// 血脂
			blood_fat.put(1, "高");
			blood_fat.put(2, "正常");
			JSONObject fatty_liver = new JSONObject();// 脂肪肝
			fatty_liver.put(1, "正常");
			fatty_liver.put(2, "异常");
			JSONObject alcoholic_liver = new JSONObject();// 酒精肝
			alcoholic_liver.put(1, "正常");
			alcoholic_liver.put(2, "异常");
			JSONObject blood_vessel = new JSONObject();// 血管弹性
			blood_vessel.put(1, "正常");
			blood_vessel.put(2, "异常");
			JSONObject chest_tightness = new JSONObject();// 胸闷气短
			chest_tightness.put(1, "有");
			chest_tightness.put(2, "无");
			JSONObject obesity = new JSONObject();// 肥胖度
			obesity.put(1, "重度");
			obesity.put(2, "中度");
			obesity.put(3, "正常");
			JSONObject osteoporosis = new JSONObject();// 骨质疏松
			osteoporosis.put(1, "重度");
			osteoporosis.put(2, "中度");
			osteoporosis.put(3, "正常");
			JSONObject degreeofexercise = new JSONObject();// 运动程度
			degreeofexercise.put(1, "高强度运动");
			degreeofexercise.put(2, "正常运动");
			degreeofexercise.put(3, "基本不运动");

			// 需转化的字段
			Map<String, JSONObject> switchItems = new HashMap<>();
			switchItems.put("blood_fat", blood_fat);
			switchItems.put("fatty_liver", fatty_liver);
			switchItems.put("alcoholic_liver", alcoholic_liver);
			switchItems.put("blood_vessel", blood_vessel);
			switchItems.put("chest_tightness", chest_tightness);
			switchItems.put("obesity", obesity);
			switchItems.put("osteoporosis", osteoporosis);
			switchItems.put("degreeofexercise", degreeofexercise);

			HSSFWorkbook workbook = ExcelUtil.exportExcelData2(workbook2, m, beanProperty, switchItems);
			workbook.write(os);
			os.flush();
			os.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

}
