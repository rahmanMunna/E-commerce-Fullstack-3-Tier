using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.DTOs
{
    public class OrderTrackerDTO
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public DateTime ApprovedAt { get; set; }
        public DateTime AssignedAt { get; set; }
        public DateTime DeliveredAt { get; set; }

        public virtual OrderDTO Order { get; set; }
    }
}
