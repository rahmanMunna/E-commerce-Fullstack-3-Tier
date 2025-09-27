using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace BLL.DTOs
{
    public class ProductDTO
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Product Name is required")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Stock quantity is required")]
        [Range(1, int.MaxValue, ErrorMessage = "Stock quantity must be greater than 0")]
        public int? StockQty { get; set; }  

        [Required(ErrorMessage = "Price is required")]
        [Range(0.01, double.MaxValue, ErrorMessage = "Price must be greater than 0")]
        public double? Price { get; set; }  

        [Range(0.0, 100.0, ErrorMessage = "Discount must be between 0 and 100")]
        public double? Discount { get; set; }  

        [Required(ErrorMessage = "Category is required")]
        public int? CategoryId { get; set; }

        public virtual CategoryDTO Category { get; set; }
    }
}
