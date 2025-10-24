﻿using BLL.Models;
using System.Collections.Generic;


namespace BLL.Interfaces
{
    public interface IOrderPricingService
    {
        double  GetTotalPrice(List<CartItem> items);
    }
}
