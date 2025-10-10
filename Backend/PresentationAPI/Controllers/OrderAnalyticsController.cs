using BLL.Auth;
using BLL.Services;
using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace PresentationAPI.Controllers
{
    [RoutePrefix("api/orderAnalytics")]
    public class OrderAnalyticsController : ApiController
    {      
        [Logged("Admin")]
        [HttpGet]
        [Route("totalOrderCompleted")]
        [EnableCors(origins: "*", headers: "*", methods: "GET")]
        public HttpResponseMessage TotalOrderCompleted()
        {
            try
            {
                var result = OrderAnalyticsService.TotalCompletedOrders();
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        [Logged("Admin")]
        [HttpGet]
        [Route("todayTotalOrderCompleted")]
        [EnableCors(origins: "*", headers: "*", methods: "GET")]
        public HttpResponseMessage TodayTotalOrderCompleted()
        {
            try
            {
                var result = OrderAnalyticsService.TodayTotalCompletedOrders();
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        [Logged("Admin")]
        [HttpGet]
        [Route("latestOrders/{count}")]
        [EnableCors(origins: "*", headers: "*", methods: "GET")]
        public HttpResponseMessage LatestOrders(int count)
        {
            try
            {
                var result = OrderAnalyticsService.LatestOrders(count);
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        [Logged("Admin")]
        [HttpGet]
        [Route("topSellingProducts/count/{count}/days/{days}")]
        [EnableCors(origins: "*", headers: "*", methods: "GET")]
        public HttpResponseMessage TopSellingProducts(int count,int days)
        {
            try
            {
                var result = OrderAnalyticsService.TopSellingProducts(count = 3,days = 3);
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        [Logged("Admin")]
        [HttpGet]
        [Route("lowStockProducts")]
        [EnableCors(origins: "*", headers: "*", methods: "GET")]
        public HttpResponseMessage LowStockProducts()
        {
            try
            {
                var result = OrderAnalyticsService.LowStockProducts();
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message);
            }
        }
    }
}
