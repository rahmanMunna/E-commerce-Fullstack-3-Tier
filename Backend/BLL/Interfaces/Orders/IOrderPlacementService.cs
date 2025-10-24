using BLL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Interfaces
{
    internal interface IOrderPlacementService
    {
        bool PlaceOrder(List<CartItem> items, string tKey);
    }
}
