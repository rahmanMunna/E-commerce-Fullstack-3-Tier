using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Interfaces.Orders
{
    public interface IOrderStatusService
    {
        bool PlaceOrder(int orderId);
        bool Processing(int orderId);
        bool AssignDeliveryMan(int orderId, int deliveryManId);
        bool OnTheWay(int orderId);
        bool Delivered(int orderId);  
        bool Cancel(int orderId);
    }
}
