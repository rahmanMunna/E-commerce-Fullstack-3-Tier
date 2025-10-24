using DAL.EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Interfaces
{
    public interface IStockService
    {
        (bool IsAvailable, List<Product> NotEnoughStockProducts) ValidateStock(List<OrderDetail> orderDetails);
    }
}
