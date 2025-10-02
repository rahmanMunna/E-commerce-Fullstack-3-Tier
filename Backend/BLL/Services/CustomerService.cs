using BLL.DTOs;
using BLL.Helper;
using DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services
{
    public class CustomerService
    {
        public static List<CustomerDTO> Get()
        {
            var customers = DataAccessFactory.CustomerData().Get();  
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

    }
}
