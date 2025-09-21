using DAL;
using DAL.EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Services
{
    internal class PaymentService
    {
        public static bool AddToPayment(int oId, double total)
        {
            Payment payment = new Payment()
            {
                OrderId = oId,
                PaymentMethodId = 1, // hardcoded for now - cash on delivery
                Amount = total,
                PaymentStatusId = 1 // hardcoded for now pending
            };

            var paymentCreated = DataAccessFactory.PaymentData().Create(payment);
            return paymentCreated;
        }
    }
}
