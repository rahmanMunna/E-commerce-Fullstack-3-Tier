using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BLL.Models
{
    public class FinancialSummary
    {
        public double TotalSales { get; set; }
        public double TotalRefunds { get; set; }
        public int TotalOrders { get; set; }
        public int TotalCompletedOrders { get; set; }
        public int TotalCancelledOrders { get; set; }
        public int TotalPendingOrders { get; set; }
        public double LowestOrderAmount { get; set; }
        public double HighestOrderAmount { get; set; }
        public double AverageOrderAmount { get; set; }
    }
}