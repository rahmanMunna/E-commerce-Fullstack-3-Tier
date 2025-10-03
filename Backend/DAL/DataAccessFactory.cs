using DAL.EF;
using DAL.Interfaces;
using DAL.Repos;


namespace DAL
{
    public class DataAccessFactory
    {

        public static IRepo<User,User,bool,string> UserData()
        {
            return new UserRepo();
        }

        public static IRepo<Token,Token,bool,int> TokenData()
        {
            return new TokenRepo();
        }
        public static IToken TokenDataExtented()
        {
            return new TokenRepo();
        }

        public static IRepo<Customer, Customer, bool, int> CustomerData()
        {
            return new CustomerRepo();
        }
        public static ICustomerRepo CustomerDataExtented()
        {
            return new CustomerRepo();
        }
        public static IRepo<Deliveryman, Deliveryman, int, bool> DeliverymanData()
        {
            return new DeliverymanRepo();
        }
        public static IDeliverymanRepo DeliverymanDataExtented()
        {
            return new DeliverymanRepo();
        }   
        public static IRepo<Product, Product, bool, int> ProductData() { 
            return new ProductRepo();
        }

        public static ICategoryRepo<Product, int> ProductDataExtented()
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
        public static IPaymentRepo PaymentDataExtended()
        {
            return new PaymentRepo();
        }

        public static IRepo<Category, bool, bool, int> CategoryData()
        {
            return new CategoryRepo();
        }   
    }
}
