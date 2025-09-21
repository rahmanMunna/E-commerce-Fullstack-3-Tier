using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services
{
    public class OrderStatusService
    {
        public static bool ChangeStatusToProcessing(int orderId)
        {
            var statusChanged = OrderService.UpdateStatus(orderId, 2); // 2 = Processing
            return statusChanged;
        }
        public static bool ChangeStatusToAssignedToDeliveryman(int orderId)
        {
            var statusChanged = OrderService.UpdateStatus(orderId, 3); // 3 = Assigned to Deliveryman
            return statusChanged;
        }

        public static bool ChangeStatusToOnTheWay(int orderId)
        {
            var statusChanged = OrderService.UpdateStatus(orderId, 4); // 4 = On the way
            return statusChanged;
        }
        public static bool ChangeStatusToDelivered(int orderId)
        {
            var statusChanged = OrderService.UpdateStatus(orderId, 5); // 5 = Delivered
            return statusChanged;
        }
        public static bool ChangeStatusToCancelled(int orderId)
        {
            var statusChanged = OrderService.UpdateStatus(orderId, 6); // 6 = Delivered
            return statusChanged;
        }
    }
}
