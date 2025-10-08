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
        //[Logged("Admin")]
        [HttpGet]
        [Route("summary")]
        [EnableCors(origins: "*", headers: "*", methods: "GET")]
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
    }
}
