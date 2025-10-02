using DAL.EF;
using DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repos
{
    internal class CustomerRepo : IRepo<Customer,Customer,bool,int>, ICustomerRepo
    {
        EcommerceMSWebAPIEntities db;
        public CustomerRepo() { 
            this.db = new EcommerceMSWebAPIEntities();
        }

        public List<Customer> Get()
        {
            return db.Customers.ToList();
        }

        public Customer Get(int id)
        {
            return db.Customers.Find(id);   
        }
        public Customer Create(Customer obj)
        {
            throw new NotImplementedException();
        }

        public bool Delete(int id)
        {
            throw new NotImplementedException();
        }
        public bool Update(Customer obj)
        {
            throw new NotImplementedException();
        }

        public Customer GetByUserId(string uId)
        {
            return db.Customers.FirstOrDefault(c => c.UserId == uId);   
        }
    }
}
