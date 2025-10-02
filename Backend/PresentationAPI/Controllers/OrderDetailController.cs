using BLL.Auth;
using BLL.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace PresentationAPI.Controllers
{
    [RoutePrefix("api/orderdetail")]
    public class OrderDetailController : ApiController
    {
        [Logged("Admin","Customer","Deliveryman")]
        [HttpGet]
        [Route("order/{oId}")]
        [EnableCors(origins: "*", headers: "*", methods: "GET")]
        public HttpResponseMessage GetByOrderId(int oId)
        {
            try
            {
                var result = OrderDetailService.GetByOrderId(oId);
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message);
            }
        }
    }
}
