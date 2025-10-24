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
    [RoutePrefix("api/deliveryman")]
    public class DeliverymanController : ApiController
    {
        [Logged("Admin","Deliveryman")]
        [HttpGet]
        [Route("all")]
        [EnableCors(origins: "*", headers: "*", methods: "GET")]
        public HttpResponseMessage Get()
        {
            try
            {
                var response = DeliverymanService.Get();
                return Request.CreateResponse(HttpStatusCode.OK, response);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        [Logged("Admin", "Deliveryman")]
        [HttpGet]
        [Route("{id}")]
        public HttpResponseMessage Get(int id)
        {
            try
            {
                var response = DeliverymanService.Get(id);
                return Request.CreateResponse(HttpStatusCode.OK, response);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        
        [HttpGet]
        [Route("user/{uId}")]
        [EnableCors(origins: "*", headers: "*", methods: "GET")]
        public HttpResponseMessage GetByUserId(string uId)
        {
            try
            {
                var response = DeliverymanService.GetByUserId(uId);
                return Request.CreateResponse(HttpStatusCode.OK, response);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        [Logged("Admin", "Deliveryman")]
        [HttpGet]
        [Route("completedOrders")]
        [EnableCors(origins: "*", headers: "*", methods: "GET")]
        public HttpResponseMessage CompletedOrders()
        {
            try
            {
                var tKey = Request.Headers.Authorization.ToString();    
                var response = DeliverymanService.CompletedOrders(tKey);
                return Request.CreateResponse(HttpStatusCode.OK, response);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message);
            }
        }

    }
}
