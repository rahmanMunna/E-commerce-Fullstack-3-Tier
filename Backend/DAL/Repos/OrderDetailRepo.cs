using DAL.EF;
using DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repos
{
    public class OrderDetailRepo : IRepo<OrderDetail, bool, bool, int>, IOrderDetailRepo
    {
        EcommerceMSWebAPIEntities db;

        public OrderDetailRepo()
        {
            this.db = new EcommerceMSWebAPIEntities();
        }   
        public bool InsertToOrderDetails(List<OrderDetail> obj)
        {
            foreach(var od in obj)
            {
                var res = Create(od);
                if (!res)
                {
                    return false;
                }
                
            }   
            return true;

        }
        public List<OrderDetail> GetByOrder(int oId)
        {
            return db.OrderDetails.Where(od => od.OrderId == oId).ToList();
        }

        public bool Create(OrderDetail obj)
        {
            db.OrderDetails.Add(obj); 
            return db.SaveChanges() > 0;
            
        }

        public List<OrderDetail> Get()
        {
            return db.OrderDetails.ToList();
        }

        public OrderDetail Get(int id)
        {
            return db.OrderDetails.Find(id);
        }

        public bool Delete(int id)
        {
            var existingObj = this.Get(id);
            if (existingObj != null)
            {
                db.OrderDetails.Remove(existingObj);
                return db.SaveChanges() > 0;
            }   
            return false;
        }

        public bool Update(OrderDetail obj)
        {
            return false;
        }

        
    }
}
