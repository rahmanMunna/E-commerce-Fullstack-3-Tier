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
    internal class ProductRepo : IRepo<Product,Product, bool, int>, ICategoryRepo<Product, int>
    {
        EcommerceMSWebAPIEntities db;
        public ProductRepo() { 
            this.db = new EcommerceMSWebAPIEntities();  
        }
        public List<Product> Get() {
            var products = db.Products.ToList();
            return products;
        }
        public Product Get(int id) {
            var product = db.Products.Find(id);
            return product;
        }
        public List<Product> GetByCategory(int cId) { 
            var products = db.Products.Where(p => p.CategoryId == cId).ToList(); 
            return products;
        }
        public Product Create(Product obj) { 
            if(obj != null)
            {
                db.Products.Add(obj);
                db.SaveChanges();
                return obj;
            }
            return null;
        }
        public bool Update(Product obj) { 
            var existingObj = this.Get(obj.Id);
            db.Entry(existingObj).CurrentValues.SetValues(obj);

            return db.SaveChanges() > 0;    

        }
        public bool Delete(int id) {
            var existingObj = this.Get(id);
            if(existingObj != null)
            {
                db.Products.Remove(existingObj);
                return db.SaveChanges() > 0;
            }
            return false;   

        }

        public List<Product> Search(string text)
        {
            var products = db.Products.Where(p => p.Name.ToLower().Contains(text.ToLower())).ToList();
            return products;
        }

    }
}
