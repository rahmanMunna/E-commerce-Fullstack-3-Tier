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
        [Route("todayTotalSale")]
        [EnableCors(origins: "*", headers: "*", methods: "GET")]
        public HttpResponseMessage TodayTotalSale()
        {
            try
            {
                var result = FinanciaService.TodayTotalSale();
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        [Logged("Admin")]
        [HttpGet]
        [Route("todayTotalRefund")]
        [EnableCors(origins: "*", headers: "*", methods: "GET")]
        public HttpResponseMessage TodayTotalRefund()
        {
            try
            {
                var result = FinanciaService.TodayTotalRefund();
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message);
            }
        }
    }
}
