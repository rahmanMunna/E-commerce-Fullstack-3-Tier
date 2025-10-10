using BLL.Models;
using DAL;
using System;
using System.Collections.Generic;
using System.Linq;


namespace BLL.Services
{
    public class FinanciaService
    {
        public static double TotalSales(DateTime startDate, DateTime endDate)
        {
            var payments = DataAccessFactory.PaymentData().Get();
            var sales = payments
                .Where(p => p.PaymentStatusId == 2
                            && p.TransactionTypeId == 1
                            && p.ProcessedAt != null
                            && p.ProcessedAt.Value.Date >= startDate.Date
                            && p.ProcessedAt.Value.Date <= endDate.Date)
                .Sum(p => p.Amount);

            return sales;
        }
        public static double TotalRefund(DateTime startDate, DateTime endDate)
        {
            var payments = DataAccessFactory.PaymentData().Get();
            var refund = payments
                .Where(p => p.PaymentStatusId == 3
                            && p.TransactionTypeId == 2
                            && p.ProcessedAt != null
                            && p.ProcessedAt.Value.Date >= startDate.Date
                            && p.ProcessedAt.Value.Date <= endDate.Date)
                .Sum(p => p.Amount);

            return refund;
        }
        public static double TodayTotalSale()
        {
            var payments = DataAccessFactory.PaymentData().Get();
            var todayTotalSales = (from p in payments
                                   where p.ProcessedAt != null && p.ProcessedAt.Value.Date == DateTime.Now.Date
                                   && p.PaymentStatusId == 2 // 2 is the ID for 'Completed' status
                                   && p.Order.OrderStatusID == 5 // 5 is the ID for 'Delivered' status
                                   && p.TransactionTypeId == 1
                                   select p.Amount).Sum();

            return todayTotalSales;

        }
        public static double TodayTotalRefund()
        {
            var payments = DataAccessFactory.PaymentData().Get();
            var todayTotalSales = (from p in payments
                                   where p.ProcessedAt != null && p.ProcessedAt.Value.Date == DateTime.Now.Date
                                   && p.PaymentStatusId == 3 // 3 is the ID for 'Refunded' status                                 
                                   && p.TransactionTypeId == 2 //Credit
                                   select p.Amount).Sum();

            return todayTotalSales;

        }
        public static FinancialSummary GetFinancialSummary(DateTime startDate,DateTime endDate)
        {
            var totalSale = TotalSales(startDate, endDate);
            var totalRefund = TotalRefund(startDate, endDate);
            var totalOrders = OrderAnalyticsService.TotalOrders(startDate, endDate);
            var totalCompletedOrders = OrderAnalyticsService.TotalCompletedOrders(startDate, endDate);
            var totalCancelledOrders = OrderAnalyticsService.TotalCancelledOrders(startDate, endDate);
            var totalPendingOrders = OrderAnalyticsService.TotalPendingOrders(startDate, endDate);
            var lowestOrderAmount = OrderAnalyticsService.LowestOrderAmount(startDate, endDate);
            var highestOrderAmount = OrderAnalyticsService.HighestOrderAmount(startDate, endDate);
            var averageOrderAmount = OrderAnalyticsService.AverageOrderAmount(startDate, endDate);

            var summary = new FinancialSummary
            {
                TotalSales = totalSale,
                TotalRefunds = totalRefund,
                TotalOrders = totalOrders,
                TotalCompletedOrders = totalCompletedOrders,
                TotalCancelledOrders = totalCancelledOrders,
                TotalPendingOrders = totalPendingOrders,
                LowestOrderAmount = lowestOrderAmount,
                HighestOrderAmount = highestOrderAmount,
                AverageOrderAmount = averageOrderAmount
            };

            return summary;
        }

        public static List<SalesWeekly> GetSalesWeekly()
        {
            var savenDaysAgo = DateTime.Now.AddDays(-6);

            var payments = DataAccessFactory.PaymentData().Get();   
            var saleWeekly = payments.Where(p => p.PaymentStatusId == 2 && p.ProcessedAt != null && p.ProcessedAt >= savenDaysAgo && p.TransactionTypeId == 1)
                                     .GroupBy(p => p.ProcessedAt.Value.Date)
                                     .Select(g => new SalesWeekly()
                                     {
                                         Date = g.Key,
                                         sales = g.Sum(p => p.Amount)
                                     })
                                     .OrderBy(sw => sw.Date)
                                     .Take(7)
                                     .ToList();
            
            return saleWeekly;   

        }

    }
}
