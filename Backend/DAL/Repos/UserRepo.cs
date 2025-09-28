using DAL.EF;
using DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repos
{
    internal class UserRepo : IRepo<User, User, bool, string>
    {
        EcommerceMSWebAPIEntities db;
        public UserRepo() { 
            this.db = new EcommerceMSWebAPIEntities();
        }
        public List<User> Get()
        {
            throw new NotImplementedException();
        }

        public User Get(string id)
        {
            return db.Users.Find(id);    
        }

        public User Create(User obj)
        {
            throw new NotImplementedException();
        }

        public bool Delete(string id)
        {
            throw new NotImplementedException();
        }

        
        public bool Update(User obj)
        {
            throw new NotImplementedException();
        }
    }
}
