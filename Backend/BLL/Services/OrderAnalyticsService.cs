using BLL.DTOs;
using BLL.Helper;
using BLL.Models;
using DAL;
using DAL.EF;
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

        public static int TodayTotalCompletedOrders()
        {
           var orders = DataAccessFactory.OrderData().Get();
           var todayCompletedOrders = orders.Where(o => o.Date.Date == DateTime.Now.Date && o.OrderStatusID == 5).ToList();
           return todayCompletedOrders.Count;
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

        public static List<OrderDTO> LatestOrders(int count)
        {
            var orders = DataAccessFactory.OrderData().Get();   
            var latestOrder = orders.
                                     Where(o => o.OrderStatusID != 5 && o.OrderStatusID != 6) 
                                     .OrderByDescending(x => x.Id)
                                    .Take(count)
                                    .OrderBy(x => x.Id)
                                    .ToList();
            return MapperHelper.GetMapper().Map<List<OrderDTO>>(latestOrder); 
        }

        public static List<ProductDTO> LowStockProducts()
        {
            var products = DataAccessFactory.ProductData().Get();   
            var lowStock = products.Where(p => p.StockQty <= 5).ToList();

            return MapperHelper.GetMapper().Map<List<ProductDTO>>(lowStock); 

        }
        public static List<TopSellingProduct> TopSellingProducts(int count,int days)
        {
            var date = DateTime.Now.AddDays(-days);

            var orderDetails = DataAccessFactory.OrderDetailData().Get();
            var topProducts = orderDetails
                                          .Where(od => od.Order.Date <= date && od.Order.OrderStatusID == 5)
                                          .GroupBy(od => od.ProductId)
                                          .Select(g => new TopSellingProduct()
                                          {
                                              Id = g.Key,
                                              Name = g.FirstOrDefault().Product.Name,
                                              Price = g.FirstOrDefault().Product.Price,
                                              Discount = g.FirstOrDefault().Product.Discount,
                                              Category = g.FirstOrDefault().Product.Category.Name,
                                              TotalSold = g.Sum(od => od.Qty),
                                              TotalRevenue = g.Sum(od => od.OrderPrice) * g.Sum(od => od.Qty)
                                          })
                                          .OrderByDescending(x => x.TotalSold)
                                          .Take(count)
                                          .ToList();
            return topProducts;   


        }
    }
}
