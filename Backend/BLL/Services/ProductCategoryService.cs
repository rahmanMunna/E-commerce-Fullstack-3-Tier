using BLL.DTOs;
using BLL.Helper;
using DAL;
using System.Collections.Generic;


namespace BLL.Services
{
    public class ProductCategoryService
    {
        public static List<CategoryDTO> Get()
        {
            var categories =  DataAccessFactory.CategoryData().Get();
            return MapperHelper.GetMapper().Map<List<CategoryDTO>>(categories);   
        }
    }
}
