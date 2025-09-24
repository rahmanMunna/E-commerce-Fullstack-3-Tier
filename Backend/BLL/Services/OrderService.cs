using BLL.DTOs;
using BLL.Helper;
using BLL.Models;
using DAL;
using DAL.EF;
using DAL.Repos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services
{
    public class OrderService
    {
        public static double GetTotalPrice(List<CartItem> items)
        {
            double total = 0;
            foreach (var item in items)
            {
                double priceAfterDiscount = item.Price - (item.Price * item.Discount / 100);
                total = total + priceAfterDiscount * item.Qty;
            }
            return total;
        }
        public static bool PlaceOrder(List<CartItem> items)
        {
            //corner case
            if (items.Count == 0)
                return false;

            var total = GetTotalPrice(items);

            var orderCreated = AddToOrder(total);

            if (orderCreated != null &&
                OrderDetailService.AddOrderDetails(items, orderCreated.Id) &&
                PaymentService.AddToPayment(orderCreated.Id, total)
                )
            {
                return true;
            }
            return false;
        }
        public static Order AddToOrder(double total)
        {
            Order order = new Order()
            {
                Date = DateTime.Now,
                ProductTotal = total,
                ShippingCharge = 60, // hardcoded for now
                Total = total + 60,
                CustomerId = 1, // hardcoded for now
                OrderStatusID = 1 // Placed
            };
            var orderCreated = DataAccessFactory.OrderDataExtended().PlaceOrder(order);
            return orderCreated;
        }
        public static List<OrderDTO> Get()
        {
            var orders = DataAccessFactory.OrderData().Get();
            return MapperHelper.GetMapper().Map<List<OrderDTO>>(orders);
        }
        public static OrderDTO Get(int id)
        {
            var order = DataAccessFactory.OrderData().Get(id);
            return MapperHelper.GetMapper().Map<OrderDTO>(order);
        }
        public static ShippingAddressDTO GetShippingAddress(int orderId)
        {
            var order = Get(orderId);
            if (order != null)
            {
                var addressDTO = order.Customer.ShippingAddress;
                return addressDTO;
            }
            return null;
        }
        public static List<OrderDTO> GetAllPlacedOrder()
        {
            var orders = DataAccessFactory.OrderDataExtended().GetAllPlacedOrder();
            return MapperHelper.GetMapper().Map<List<OrderDTO>>(orders);
        }
        public static List<OrderDTO> GetAllProcessingOrder()
        {
            var orders = DataAccessFactory.OrderDataExtended().GetAllProcessingOrder();
            return MapperHelper.GetMapper().Map<List<OrderDTO>>(orders);
        }
        public static List<OrderDTO> GetAllAssignedOrder()
        {
            var orders = DataAccessFactory.OrderDataExtended().GetAllAssignedOrder();
            return MapperHelper.GetMapper().Map<List<OrderDTO>>(orders);
        }
        public static List<OrderDTO> GetAllOnTheWayOrder()
        {
            var orders = DataAccessFactory.OrderDataExtended().GetAllOnTheWayOrder();
            return MapperHelper.GetMapper().Map<List<OrderDTO>>(orders);
        }
        public static bool UpdateStatus(int orderId, int statusId)
        {
            return DataAccessFactory.OrderDataExtended().UpdateOrderStatus(orderId, statusId);
        }
        public static bool AssignDeliveryMan(int orderId, int deliveryManId)
        {
            var result = DataAccessFactory.OrderDataExtended().AssignDeliveryMan(orderId, deliveryManId);
            if (result)
            {
                return OrderStatusService.ChangeStatusToAssignedToDeliveryman(orderId);
                //return UpdateStatus(orderId, 3); // 3 = Assigned to Deliveryman 
            }
            return result;

        }

        public static bool DeliveredOrder(int orderId)
        {
            var result = PaymentService.UpdateAfterDelivery(orderId);
            if (result)
            {
                return OrderStatusService.ChangeStatusToDelivered(orderId);
                //return UpdateStatus(orderId, 5); // 5 = Delivered
            }
            return result;
        }
    }
}
