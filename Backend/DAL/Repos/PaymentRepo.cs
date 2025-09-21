using DAL.EF;
using DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repos
{
    internal class PaymentRepo : IRepo<Payment, bool, bool, int>
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
            throw new NotImplementedException();
        }

        public bool Update(Payment obj)
        {
            throw new NotImplementedException();
        }
    }
}
