using BLL.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Interfaces.Orders
{
    public interface IOrderQueryService
    {
        List<OrderDTO> Get();
        OrderDTO Get(int id);
        ShippingAddressDTO GetShippingAddress(int orderId);
        List<OrderDTO> GetAllPlaced();
        List<OrderDTO> GetAllProcessing();
        List<OrderDTO> GetAllAssigned();
        List<OrderDTO> GetAssignedByDeliveryman(int deliverymanId);
        List<OrderDTO> GetAllOnTheWay();
        List<OrderDTO> GetTodaysReceived(string tKey);
        List<OrderDTO> GetTrackedOrders();
    }
}
