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
    internal class OrderDetailsService
    {
        public static bool AddOrderDetails(List<CartItem> items, int oId)
        {
            List<OrderDetail> details = new List<OrderDetail>();
            foreach (var item in items)
            {
                OrderDetail detail = new OrderDetail()
                {
                    ProductId = item.ProductId,
                    Qty = item.Qty,
                    OrderId = oId,
                    OrderPrice = item.Price - (item.Price * item.Discount / 100)
                };
                details.Add(detail);
            }
            return DataAccessFactory.OrderDetailDataExtended().InsertToOrderDetails(details);
        }
    }
}
