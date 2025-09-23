using DAL.EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Interfaces
{
    public interface IOrderRepo
    {
        Order PlaceOrder(Order obj);

        List<Order> GetAllPlacedOrder();
        List<Order> GetAllProcessingOrder();

        bool UpdateOrderStatus(int oId,int sId);
        bool CancelOrder(int oId,string name);  
        bool AssignDeliveryMan(int oId, int dId);

    }
}
