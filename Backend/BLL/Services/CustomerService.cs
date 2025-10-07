using BLL.DTOs;
using BLL.Helper;
using DAL;
using DAL.EF;
using System.Collections.Generic;
using System.Linq;

namespace BLL.Services
{
    public class CustomerService
    {
        public static List<CustomerDTO> Get()
        {
            var customers = DataAccessFactory.CustomerData().Get();  
            //var customers = new CustomerRepo().Get();  
            return MapperHelper.GetMapper().Map<List<CustomerDTO>>(customers);  
        }

        public static CustomerDTO Get(int id)
        {
            var customer = DataAccessFactory.CustomerData().Get(id);    
            return MapperHelper.GetMapper().Map<CustomerDTO>(customer); 
        }   

        public static CustomerDTO GetByUserId(string uId)
        {
            var customer = DataAccessFactory.CustomerDataExtented().GetByUserId(uId);
            return MapperHelper.GetMapper().Map<CustomerDTO>(customer);
        }   
        public static List<OrderDTO> TrackOrders(string token)
        {
            var customer = GetCustomerByToken(token);
            var orders = DataAccessFactory.OrderDataExtended().GetByCustomerId(customer.Id);

            // get the orders except delivered ones
            var onGoingOrders = (from o in orders
                                where o.OrderStatusID != 5
                                select o).ToList();    

            return MapperHelper.GetMapper().Map<List<OrderDTO>>(onGoingOrders);

        }

        public static List<OrderDTO> MyOrders(string token)
        {
            var customer = GetCustomerByToken(token);
            var orders = DataAccessFactory.OrderDataExtended().GetByCustomerId(customer.Id);
            return MapperHelper.GetMapper().Map<List<OrderDTO>>(orders);
        }

        public static List<OrderDTO> CancelledOrders(string token)
        {
            var customer = GetCustomerByToken(token);   
            var orders = DataAccessFactory.OrderDataExtended().GetByCustomerId(customer.Id);
            var cancelledOrders = (from o in orders
                                   where o.OrderStatusID == 6
                                   select o).ToList();
            return MapperHelper.GetMapper().Map<List<OrderDTO>>(cancelledOrders);
        }
        public static Customer GetCustomerByToken(string token)
        {
            var tokenObj = DataAccessFactory.TokenDataExtented().GetByTKey(token);
            var userId = tokenObj.UserId;
            var customer = DataAccessFactory.CustomerDataExtented().GetByUserId(userId);
            return customer;    
            //return MapperHelper.GetMapper().Map<CustomerDTO>(customer);
        }

    }
}
