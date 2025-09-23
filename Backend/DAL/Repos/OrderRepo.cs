using DAL.EF;
using DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repos
{
    internal class OrderRepo : IRepo<Order,Order, bool, int>, IOrderRepo
    {
        EcommerceMSWebAPIEntities db;

        public OrderRepo()
        {
            this.db = new EcommerceMSWebAPIEntities();
        }   
        public List<Order> Get() 
        {
            return db.Orders.ToList();
        }
        public Order Get(int id)
        {
            return db.Orders.Find(id);
        }
        public Order Create(Order obj)
        {
            db.Orders.Add(obj); 
            db.SaveChanges();
            return obj;
        }
        public bool Update(Order obj)
        {
            return true;   
        }
        public bool Delete(int id)
        {
            var existingObj = this.Get(id); 
            if (existingObj != null)
            {
                db.Orders.Remove(existingObj);
                return db.SaveChanges() > 0;
            } 
            return false;
        }
        public Order PlaceOrder(Order obj)
        {
            var order = this.Create(obj);
            return order;   

        }

        public List<Order> GetAllPlacedOrder()
        {
            var order = (from o in db.Orders
                        where o.OrderStatusID == 1
                        select o).ToList();
            return order;
        }

        public List<Order> GetAllProcessingOrder()
        {
            var order = (from o in db.Orders
                         where o.OrderStatusID == 2
                         select o).ToList();
            return order;
        }
        public bool UpdateOrderStatus(int oId, int sId)
        {
            var order = this.Get(oId);
            if(order != null)
            {
                order.OrderStatusID = sId;
                return db.SaveChanges() > 0;    
            }
            return false;   
        }
        public bool CancelOrder(int oId, string name)
        {
            var order = this.Get(oId);
            if(order != null)
            {
                order.CancelledBy = name;
                order.CancelledAt = DateTime.Now;   
                order.OrderStatusID = 6; // 6 is the ID for 'Cancelled' status
                return db.SaveChanges() > 0;    
            }
            return false;
        }
        public bool AssignDeliveryMan(int oId, int dId)
        {
            var order = this.Get(oId);
            if(order != null)
            {
                order.DeliveryManId = dId;
                var r =db.SaveChanges() > 0;
                return r;
            }
            return false;   
        }
        


    }
}
