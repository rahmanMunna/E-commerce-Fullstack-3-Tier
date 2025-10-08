using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.DTOs
{
    public class OrderDTO
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public double Total { get; set; }
        public int CustomerId { get; set; }
        public int DeliveryManId { get; set; }
        public int OrderStatusID { get; set; }
        public string CancelledBy { get; set; }
        public DateTime CancelledAt { get; set; }
        public DateTime DeliveredAt { get; set; }

        public virtual OrderStatusDTO OrderStatus { get; set; }
        public virtual CustomerDTO Customer { get; set; }   
    }
}
