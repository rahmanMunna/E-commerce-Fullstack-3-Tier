using DAL.EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Interfaces
{
    public interface IOrderDetailRepo
    {
        bool InsertToOrderDetails(List<OrderDetail> obj);
        List<OrderDetail> GetByOrderId(int oId);


    }
}
