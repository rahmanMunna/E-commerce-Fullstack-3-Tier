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
    public class DeliverymanService
    {
        public static List<DeliverymanDTO> Get()
        {
            return null;
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
    }
}
