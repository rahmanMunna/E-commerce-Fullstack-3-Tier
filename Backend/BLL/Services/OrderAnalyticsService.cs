using DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services
{
    public class OrderAnalyticsService
    {
        public static int TotalCompletedOrders()
        {
            var ordes = DataAccessFactory.OrderData().Get();
            var completedOrders = (from o in ordes
                                   where o.OrderStatusID == 5
                                   select o).ToList();
            return completedOrders.Count;
        }

        public static int TotalOrders(DateTime startDate, DateTime endDate)
        {
            var orders = DataAccessFactory.OrderData().Get();
            var totalOrders = orders
                .Where(o => o.Date.Date >= startDate.Date && o.Date.Date <= endDate.Date)
                .ToList();
            return totalOrders.Count;
        }

        public static int TotalCompletedOrders(DateTime startDate, DateTime endDate)
        {
            var orders = DataAccessFactory.OrderData().Get();
            var totalOrders = orders
                .Where(o => o.Date.Date >= startDate.Date
                            && o.Date.Date <= endDate.Date
                            && o.OrderStatusID == 5)
                .ToList();
            return totalOrders.Count;
        }

        public static int TotalCancelledOrders(DateTime startDate, DateTime endDate)
        {
            var orders = DataAccessFactory.OrderData().Get();
            var totalOrders = orders
                .Where(o => o.Date.Date >= startDate.Date
                            && o.Date.Date <= endDate.Date
                            && o.OrderStatusID == 6)
                .ToList();
            return totalOrders.Count;
        }

        public static int TotalPendingOrders(DateTime startDate, DateTime endDate)
        {
            var orders = DataAccessFactory.OrderData().Get();
            var totalOrders = orders
                .Where(o => o.Date.Date >= startDate.Date
                            && o.Date.Date <= endDate.Date
                            && o.OrderStatusID != 5
                            && o.OrderStatusID != 6)
                .ToList();
            return totalOrders.Count;
        }

        public static double LowestOrderAmount(DateTime startDate, DateTime endDate)
        {
            var orders = DataAccessFactory.OrderData().Get();
            var lowestOrder = orders
                .Where(o => o.Date.Date >= startDate.Date
                            && o.Date.Date <= endDate.Date
                            && o.OrderStatusID != 6)
                .OrderBy(o => o.Total)
                .FirstOrDefault();
            return lowestOrder != null ? lowestOrder.Total : 0;
        }

        public static double HighestOrderAmount(DateTime startDate, DateTime endDate)
        {
            var orders = DataAccessFactory.OrderData().Get();
            var highestOrder = orders
                .Where(o => o.Date.Date >= startDate.Date
                            && o.Date.Date <= endDate.Date
                            && o.OrderStatusID != 6)
                .OrderByDescending(o => o.Total)
                .FirstOrDefault();
            return highestOrder != null ? highestOrder.Total : 0;
        }

        public static double AverageOrderAmount(DateTime startDate, DateTime endDate)
        {
            var totalOrders = TotalOrders(startDate, endDate);
            var sales = FinanciaService.TotalSales(startDate, endDate);
            return totalOrders > 0 ? sales / totalOrders : 0;
        }

    }
}
