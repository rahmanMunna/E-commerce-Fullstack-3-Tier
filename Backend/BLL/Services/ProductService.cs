using BLL.DTOs;
using BLL.Helper;
using DAL;
using DAL.EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services
{
    public class ProductService
    {
        public static List<ProductGroupByCategoryDTO> Get() {

            var products = DataAccessFactory.ProductData().Get();
            var productDTO = MapperHelper.GetMapper().Map<List<ProductDTO>>(products);

            var productGroupByCategory = from p in productDTO
                                         group p by p.Category.Name into g
                                         select new ProductGroupByCategoryDTO
                                         {
                                             CategoryName = g.Key,
                                             Products = g.ToList()
                                         };

            return productGroupByCategory.ToList();



        }
        public static ProductDTO Get(int id) { 
            var product = DataAccessFactory.ProductData().Get(id);  
            return MapperHelper.GetMapper().Map<ProductDTO>(product);   
        }
        public static List<ProductDTO> GetByCategory(int id) { 
            var products = DataAccessFactory.ProductDataByCategory().GetByCategory(id); 
            return MapperHelper.GetMapper().Map<List<ProductDTO>>(products);    
        }
        public static ProductDTO Create(ProductDTO obj) { 
            var newProduct = MapperHelper.GetMapper().Map<Product>(obj);
            var result = DataAccessFactory.ProductData().Create(newProduct);
            if(result != null)
            {
                return MapperHelper.GetMapper().Map<ProductDTO>(result);    
            }
            return null;    
        }
        public static bool Update(ProductDTO obj) { 
            var result = DataAccessFactory.ProductData().Update(MapperHelper.GetMapper().Map<Product>(obj));    
            return result;
        }
        public static bool Delete(int id) { 
            var result = DataAccessFactory.ProductData().Delete(id);    
            return result;
        }
        

    }
}
