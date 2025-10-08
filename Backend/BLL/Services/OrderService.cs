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
        public static bool PlaceOrder(List<CartItem> items,string tKey)
        {
            //corner case
            if (items.Count == 0)
                return false;

            var total = GetTotalPrice(items);

            var orderCreated = AddToOrder(total,tKey);

            if (orderCreated != null &&
                OrderDetailService.AddOrderDetails(items, orderCreated.Id) &&
                PaymentService.AddToPayment(orderCreated.Id, total)
                )
            {
                return true;
            }
            return false;
        }
        public static Order AddToOrder(double total,string tKey)
        {
            var cId = CustomerService.GetCustomerByToken(tKey).Id;

            Order order = new Order()
            {
                Date = DateTime.Now,
                ProductTotal = total,
                ShippingCharge = 60, // hardcoded for now
                Total = total + 60,
                CustomerId = cId, // hardcoded for now
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
        public static List<OrderDTO> GetAssignedOrder(int deliverymanId)
        {
            var allOrders = GetAllAssignedOrder();
            var assignedOrders = allOrders.Where(o => o.DeliveryManId == deliverymanId).ToList(); // for a specific deliveryman
            return MapperHelper.GetMapper().Map<List<OrderDTO>>(assignedOrders);    

        }
        public static List<OrderDTO> GetAllOnTheWayOrder()
        {
            var orders = DataAccessFactory.OrderDataExtended().GetAllOnTheWayOrder();
            return MapperHelper.GetMapper().Map<List<OrderDTO>>(orders);
        }
        public static List<OrderDTO> GetAlTodaysReceivedOrders(string tkey)
        {
            var allOrders = Get();      
            var customer = CustomerService.GetCustomerByToken(tkey);

            // filter todays orders -- based on todays date,customerId,status delivered only
            var todaysOrders = allOrders.Where(o => o.Date.Date == DateTime.Now.Date
                                                && o.CustomerId == customer.Id
                                                && o.OrderStatusID == 5 // Delivered
                                                ).ToList();
            return MapperHelper.GetMapper().Map<List<OrderDTO>>(todaysOrders);  
        }
        public static List<OrderDTO> TrackOrders()
        {
            //assigned or on the way or delivered
            var orders = Get(); 
            var trackedOrders = orders.Where(o => o.OrderStatusID == 3
                                            || o.OrderStatusID == 4
                                            || o.OrderStatusID == 5).ToList();
            return MapperHelper.GetMapper().Map<List<OrderDTO>>(trackedOrders);
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
                var order = new Order()
                {
                    Id = orderId,
                    DeliveredAt = DateTime.Now,
                    OrderStatusID = 5 // Delivered
                };
                return DataAccessFactory.OrderData().Update(order);    

            }
            return result;
        }
        public static ConfirmOrderResult ConfirmOrder(int orderId)
        {
            var order = Get(orderId); 
            if(order == null) return new ConfirmOrderResult { Success = false };

            var orderDetails = DataAccessFactory.OrderDetailDataExtended().GetByOrderId(orderId);
            if(orderDetails.Count == 0) return new ConfirmOrderResult { Success = false };

            var (isAvailable, notEnoughStockProducts) = ValidateStock(orderDetails);
            if(!isAvailable)
            {
                return new ConfirmOrderResult
                {
                    Success = false,
                    NotEnoughStockProducts = MapperHelper.GetMapper().Map<List<ProductDTO>>(notEnoughStockProducts)
                };
            }

            var result = DataAccessFactory.OrderDataExtended().AdjustQuantityAfterConfirm(orderDetails);
            if(!result)
            {
                return new ConfirmOrderResult { Success = false };
            }
            var statusChanged = OrderStatusService.ChangeStatusToProcessing(orderId);   
           
            return new ConfirmOrderResult { Success = statusChanged };
        }    
        public static bool CancelOrder(int oId,string tKey)
        {
            var tokenObj = DataAccessFactory.TokenDataExtented().GetByTKey(tKey);
            if (tokenObj == null) return false;

            string cancelBy;
            if(tokenObj.User.Role == "Admin")
            {
                 cancelBy = "Admin";
            }
            else
            {
                 cancelBy = "Customer";
            }

            var Order = new Order()
            {
                    Id = oId,
                    CancelledAt = DateTime.Now,
                    CancelledBy = cancelBy,
                    OrderStatusID = 6 // Cancelled
            };
            var result = DataAccessFactory.OrderData().Update(Order); 
            return result;
        }
        private static (bool,List<Product>) ValidateStock(List<OrderDetail> orderDetails)
        {
            List<Product> notEnoughStockProducts = new List<Product>();
            foreach (var od in orderDetails)
            {
                if (od.Product.StockQty < od.Qty)
                {
                    notEnoughStockProducts.Add(od.Product);
                }
            }
            
            bool isAvailable = !notEnoughStockProducts.Any();
            return (isAvailable,notEnoughStockProducts);    
        }
        
    }
}
