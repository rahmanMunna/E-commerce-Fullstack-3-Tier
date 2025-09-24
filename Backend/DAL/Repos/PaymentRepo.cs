using DAL.EF;
using DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repos
{
    internal class PaymentRepo : IRepo<Payment, bool, bool, int>, IPaymentRepo
    {
        EcommerceMSWebAPIEntities db;
        public PaymentRepo()
        {
            db = new EcommerceMSWebAPIEntities();   
        }
        public bool Create(Payment obj)
        {
            db.Payments.Add(obj);
            return db.SaveChanges() > 0;    
        }

        public bool Delete(int id)
        {
            throw new NotImplementedException();
        }

        public List<Payment> Get()
        {
            throw new NotImplementedException();
        }

        public Payment Get(int id)
        {
            return db.Payments.Find(id);    
        }

        public Payment GetLastPaymentByOrderId(int orderId)
        {
            return db.Payments.Where(p => p.OrderId == orderId).OrderByDescending(p => p.ProcessedAt).FirstOrDefault();
        }
        public bool Update(Payment obj)
        {
            var existing = GetLastPaymentByOrderId(obj.OrderId); 
            if (existing != null)
            {
                existing.PaymentStatusId = obj.PaymentStatusId;
                existing.ProcessedAt = obj.ProcessedAt;
                existing.TransactionTypeId = obj.TransactionTypeId;
                return db.SaveChanges() > 0;
            }
            return false;
        }
    }
}
