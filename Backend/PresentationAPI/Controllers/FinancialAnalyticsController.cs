using BLL.Auth;
using BLL.Services;
using PresentationAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace PresentationAPI.Controllers
{
    [RoutePrefix("api/financial")]
    public class FinancialAnalyticsController : ApiController
    {

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

        [Logged("Admin")]
        [HttpPost]
        [Route("summary")]
        [EnableCors(origins: "*", headers: "*", methods: "POST")]
        public HttpResponseMessage Summary(DateRange dateRange)
        {
            try
            {
                var summary = FinanciaService.GetFinancialSummary(dateRange.StartDate, dateRange.EndDate);  
                return Request.CreateResponse(HttpStatusCode.OK, summary);

            }
            catch(Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);   
            }
        }

        [Logged("Admin")]
        [HttpGet]
        [Route("sales/weekly")]
        [EnableCors(origins: "*", headers: "*", methods: "GET")]
        public HttpResponseMessage SalesWeekly()
        {
            try
            {
                var summary = FinanciaService.GetSalesWeekly();
                return Request.CreateResponse(HttpStatusCode.OK, summary);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
    }
}
