using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Models
{
    public class TopSellingProduct
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public double Discount { get; set; }
        public int TotalSold { get; set; }
        public double TotalRevenue { get; set; }
        public string Category { get; set; }
    }
}
