using DAL.EF;
using DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repos
{
    internal class DeliverymanRepo : IRepo<Deliveryman, Deliveryman, int, bool>,IDeliverymanRepo
    {
        EcommerceMSWebAPIEntities db;
        public DeliverymanRepo()
        {
            this.db = new EcommerceMSWebAPIEntities();  
        }   
        public List<Deliveryman> Get()
        {
            return db.Deliverymen.ToList();
        }

        public Deliveryman Get(bool id)
        {
            throw new NotImplementedException();
        }

        public Deliveryman Create(Deliveryman obj)
        {
            throw new NotImplementedException();
        }

        public bool Delete(bool id)
        {
            throw new NotImplementedException();
        }

       
        public int Update(Deliveryman obj)
        {
            throw new NotImplementedException();
        }

        public Deliveryman GetByUserId(string userId)
        {
            return db.Deliverymen.FirstOrDefault(d => d.UserId == userId);  
        }
    }
}
