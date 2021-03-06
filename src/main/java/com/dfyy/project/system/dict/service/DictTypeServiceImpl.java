package com.dfyy.project.system.dict.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.dfyy.common.constant.UserConstants;
import com.dfyy.common.utils.StringUtils;
import com.dfyy.common.utils.security.ShiroUtils;
import com.dfyy.project.system.dict.dao.IDictTypeDao;
import com.dfyy.project.system.dict.domain.DictType;

/**
 * 字典 业务层处理
 * 
 * @author dfyy
 */
@Service("dictTypeService")
public class DictTypeServiceImpl implements IDictTypeService
{
    @Autowired
    private IDictTypeDao dictTypeDao;

    /**
     * 根据条件分页查询字典类型
     * 
     * @param dictType 字典类型信息
     * @return 字典类型集合信息
     */
    @Override
    public List<DictType> selectDictTypeList(DictType dictType)
    {
        return dictTypeDao.selectDictTypeList(dictType);
    }

    /**
     * 根据字典类型ID查询信息
     * 
     * @param dictId 字典类型ID
     * @return 字典类型
     */
    @Override
    public DictType selectDictTypeById(Long dictId)
    {
        return dictTypeDao.selectDictTypeById(dictId);
    }

    /**
     * 通过字典ID删除字典信息
     * 
     * @param dictId 字典ID
     * @return 结果
     */
    @Override
    public int deleteDictTypeById(Long dictId)
    {
        return dictTypeDao.deleteDictTypeById(dictId);
    }

    /**
     * 批量删除字典类型
     * 
     * @param ids 需要删除的数据
     * @return 结果
     */
    @Override
    public int batchDeleteDictType(Long[] ids)
    {
        return dictTypeDao.batchDeleteDictType(ids);
    }

    /**
     * 保存字典类型信息
     * 
     * @param dictType 字典类型信息
     * @return 结果
     */
    @Override
    public int saveDictType(DictType dictType)
    {
        Long dictId = dictType.getDictId();
        if (StringUtils.isNotNull(dictId))
        {
            dictType.setUpdateBy(ShiroUtils.getLoginName());
            return dictTypeDao.updateDictType(dictType);
        }
        else
        {
            dictType.setCreateBy(ShiroUtils.getLoginName());
            return dictTypeDao.insertDictType(dictType);
        }
    }

    /**
     * 校验字典类型称是否唯一
     * 
     * @param dictType 字典类型
     * @return 结果
     */
    @Override
    public String checkDictTypeUnique(DictType dict)
    {
        if (dict.getDictId() == null)
        {
            dict.setDictId(-1L);
        }
        Long dictId = dict.getDictId();
        DictType dictType = dictTypeDao.checkDictTypeUnique(dict.getDictType());
        if (StringUtils.isNotNull(dictType) && dictType.getDictId() != dictId)
        {
            return UserConstants.NAME_NOT_UNIQUE;
        }
        return UserConstants.NAME_UNIQUE;
    }
}
