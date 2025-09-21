using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.DTOs
{
    public class ProductDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int StockQty { get; set; }
        public double Price { get; set; }
        public double Discount { get; set; }
        public int CategoryId { get; set; }

        public virtual CategoryDTO Category { get; set; }
    }
}
