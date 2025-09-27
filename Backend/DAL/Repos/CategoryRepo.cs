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
    public class CategoryRepo : IRepo<Category, bool, bool, int>
    {
        EcommerceMSWebAPIEntities db;

        public CategoryRepo()
        {
            this.db = new EcommerceMSWebAPIEntities();  
        }

        public bool Create(Category obj)
        {
            throw new NotImplementedException();
        }

        public bool Delete(int id)
        {
            throw new NotImplementedException();
        }

        public List<Category> Get()
        {
            return db.Categories.ToList();
        }

        public Category Get(int id)
        {
            throw new NotImplementedException();
        }

        public bool Update(Category obj)
        {
            throw new NotImplementedException();
        }
    }
}
