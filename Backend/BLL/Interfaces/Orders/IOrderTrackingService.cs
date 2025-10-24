using BLL.DTOs;
using System.Collections.Generic;


namespace BLL.Interfaces
{
    internal interface IOrderTrackingService
    {
        List<OrderDTO> GetTrackOrders();
        List<OrderDTO> GetAssignedOrders(int deliverymanId);
    }
}
