using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.DTOs
{
    public class ProductGroupByCategoryDTO
    {
        public string CategoryName { get; set; }
        public List<ProductDTO> Products { get; set; }

    }
}
