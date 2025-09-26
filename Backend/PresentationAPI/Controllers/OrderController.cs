using BLL.DTOs;
using BLL.Models;
using BLL.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Results;

namespace PresentationAPI.Controllers
{
    [RoutePrefix("api/order")]
    public class OrderController : ApiController
    {
        [HttpPost]
        [Route("place")]
        [EnableCors(origins: "*", headers: "*", methods: "POST")]
        public HttpResponseMessage PlaceOrder(List<CartItem> items)
        {
            try
            {
                var result = OrderService.PlaceOrder(items);
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        [HttpGet]
        [Route("shippingAddress/{id}")]
        public HttpResponseMessage GetShippingAddress(int id)
        {
            try
            {
                var result = OrderService.GetShippingAddress(id);   
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        [HttpGet]
        [Route("all")]
        public HttpResponseMessage Get()
        {
            try
            {
                var result = OrderService.Get();
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        [HttpGet]
        [Route("{id}")]
        public HttpResponseMessage Get(int id)
        {
            try
            {
                var result = OrderService.Get(id);
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message);
            }
        }


        [HttpGet]
        [Route("getPlacedOrder")]
        [EnableCors(origins: "*", headers: "*", methods: "GET")]
        public HttpResponseMessage GetAllPlacedOrder()
        {
            try
            {
                var result = OrderService.GetAllPlacedOrder();
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message);
            }
        }


        [HttpGet]
        [Route("getProcessingOrder")]
        [EnableCors(origins: "*", headers: "*", methods: "GET")]
        public HttpResponseMessage GetAllProcessingOrder()
        {
            try
            {
                var result = OrderService.GetAllProcessingOrder();
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        [HttpGet]
        [Route("getAssignedOrder")]
        [EnableCors(origins: "*", headers: "*", methods: "GET")]
        public HttpResponseMessage GetAllAssignedOrder()
        {
            try
            {
                var result = OrderService.GetAllAssignedOrder();
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        [HttpGet]
        [Route("getOnTheWayOrder")]
        [EnableCors(origins: "*", headers: "*", methods: "GET")]
        public HttpResponseMessage GetAllOnTheWayOrder()
        {
            try
            {
                var result = OrderService.GetAllOnTheWayOrder();
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        [HttpGet]
        [Route("trackOrders")]
        [EnableCors(origins: "*", headers: "*", methods: "GET")]
        public HttpResponseMessage TrackOrders()
        {
            try
            {
                var result = OrderService.TrackOrders();
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message);
            }
        }


        [HttpPut]
        [Route("processing/{id}")]
        [EnableCors(origins: "*", headers: "*", methods: "PUT")]
        public HttpResponseMessage ProcessingOrder(int id)
        {
            try
            {
                var result = OrderStatusService.ChangeStatusToProcessing(id);
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        [HttpPut]
        [Route("assign")]
        [EnableCors(origins: "*", headers: "*", methods: "PUT")]
        public HttpResponseMessage AssignDeliveryman(AssignDeliveryman obj)
        {
            try
            {
                var result = OrderService.AssignDeliveryMan(obj.OrderId,obj.DeliverymanId);   
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        [HttpPut]
        [Route("ontheway/{oId}")]
        [EnableCors(origins: "*", headers: "*", methods: "PUT")]
        public HttpResponseMessage OnTheWayOrder(int oId)
        {
            try
            {
                var result = OrderStatusService.ChangeStatusToOnTheWay(oId);
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message);
            }
        }



        [HttpPut]
        [Route("delivered/{oId}")]
        [EnableCors(origins: "*", headers: "*", methods: "PUT")]
        public HttpResponseMessage DeliveredOrder(int oId)
        {
            try
            {
                var result = OrderService.DeliveredOrder(oId);// can be change cz. of payment confirmation
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        //[HttpPut]
        //[Route("cancelled/{id}")]
        //public HttpResponseMessage CancelledOrder(int id)
        //{
        //    try
        //    {
        //        //var result = OrderService.Get(id);
        //        return Request.CreateResponse(HttpStatusCode.OK, result);
        //    }
        //    catch (Exception ex)
        //    {
        //        return Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message);
        //    }
        //}

    }
}
