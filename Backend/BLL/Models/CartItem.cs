using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Models
{
    public class CartItem
    {
        public int ProductId { get; set; }  
        public int Qty { get; set; }
        public double Price { get; set; }   
        public double Discount { get; set; }    
    }
}
