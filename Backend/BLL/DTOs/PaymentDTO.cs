using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.DTOs
{
    public class PaymentDTO
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public int PaymentMethodId { get; set; }
        public double Amount { get; set; }
        public int PaymentStatusId { get; set; }
        public DateTime ProcessedAt { get; set; }
        public Nullable<int> TransactionTypeId { get; set; }

        public virtual OrderDTO Order { get; set; }
        public virtual PaymentMethodDTO PaymentMethod { get; set; }
        public virtual PaymentStatusDTO PaymentStatus { get; set; }
    }
}
