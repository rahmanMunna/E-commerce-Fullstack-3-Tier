using BLL.DTOs;
using DAL.EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Models
{
    public class ConfirmOrderResult
    {
        public bool Success { get; set; }
        public List<ProductDTO> NotEnoughStockProducts { get; set; } = new List<ProductDTO>();
    }
}
