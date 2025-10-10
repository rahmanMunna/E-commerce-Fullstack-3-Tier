using BLL.DTOs;
using BLL.Helper;
using DAL;
using DAL.EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services
{
    public class DeliverymanService
    {
        public static List<DeliverymanDTO> Get()
        {
            var deliverymen = DataAccessFactory.DeliverymanData().Get();    
            return MapperHelper.GetMapper().Map <List<DeliverymanDTO>>(deliverymen);
        }

        public static DeliverymanDTO Get(int id)
        {
            return null;    
        }

        public static DeliverymanDTO GetByUserId(string uId)
        {
            var deliveryman = DataAccessFactory.DeliverymanDataExtented().GetByUserId(uId);
            return MapperHelper.GetMapper().Map<DeliverymanDTO>(deliveryman);
        }
        public static List<OrderDTO> CompletedOrders(string tKey)
        {
            var deliveryman = GetDeliverymanByToken(tKey);  
            if (deliveryman == null)
                return null;  
            
            var orders = DataAccessFactory.OrderData().Get();   
            var completedOrders = orders.Where(o => o.DeliveryManId == deliveryman.Id && o.OrderStatusID == 5).ToList();    

            return MapperHelper.GetMapper().Map<List<OrderDTO>>(completedOrders);   

        }   
        private static DeliverymanDTO GetDeliverymanByToken(string tKey)
        {
            var token = DataAccessFactory.TokenDataExtented().GetByTKey(tKey);
            if (token == null)
                return null;
            var deliveryman = GetByUserId(token.UserId);    
            if (deliveryman == null)
                return null;    

            return deliveryman;
        }
    }
}
