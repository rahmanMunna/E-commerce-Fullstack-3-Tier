using DAL.EF;
using DAL.Interfaces;
using DAL.Repos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class DataAccessFactory
    {
        public static IRepo<Product, Product, bool, int> ProductData() { 
            return new ProductRepo();
        }

        public static ICategoryRepo<Product, int> ProductDataByCategory()
        {
            return new ProductRepo();
        }
        public static IRepo<Order, Order, bool, int> OrderData()
        {
            return new OrderRepo();
        }   
        
        public static IOrderRepo OrderDataExtended()
        {
            return new OrderRepo();
        }   

        public static IRepo<OrderDetail, bool, bool, int> OrderDetailData()
        {
            return new OrderDetailRepo();
        }   

        public static IOrderDetailRepo OrderDetailDataExtended()
        {
            return new OrderDetailRepo();
        }

        public static IRepo<Payment, bool, bool, int> PaymentData()
        {
            return new PaymentRepo();
        }
    }
}
