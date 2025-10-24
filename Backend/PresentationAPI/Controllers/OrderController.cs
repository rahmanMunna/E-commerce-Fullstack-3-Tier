using BLL.Auth;
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
        [Logged("Customer")]
        [HttpPost]
        [Route("place")]
        [EnableCors(origins: "*", headers: "*", methods: "POST")]
        public HttpResponseMessage PlaceOrder(List<CartItem> items)
        {
            try
            {
                var tKey = Request.Headers.Authorization.ToString();    
                var result = OrderService.PlaceOrder(items,tKey);
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        [Logged("Admin", "Customer")]
        [HttpGet]
        [Route("shippingAddress/{oId}")]
        public HttpResponseMessage GetShippingAddress(int oId)
        {
            try
            {
                var result = OrderService.GetShippingAddress(oId);   
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        [Logged("Admin")]
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

        [Logged("Admin")]
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

        [Logged("Admin")]
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

        [Logged("Admin")]
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

        [Logged("Admin")]
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

        [Logged("Deliveryman")]
        [HttpGet]
        [Route("getAssignedOrder/{deliverymanId}")]
        [EnableCors(origins: "*", headers: "*", methods: "GET")]
        public HttpResponseMessage GetAssignedOrder(int deliverymanId)
        {
            try
            {
                var result = OrderService.GetAssignedOrder(deliverymanId);
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        [Logged("Admin","Deliveryman")]
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

        [Logged("Customer")]
        [HttpGet]
        [Route("todayReceivedOrders")]
        [EnableCors(origins: "*", headers: "*", methods: "GET")]
        public HttpResponseMessage GetTodaysReceivedOrders()
        {
            try
            {
                var tkey = Request.Headers.Authorization.ToString();
                var result = OrderService.GetAlTodaysReceivedOrders(tkey);
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        [Logged("Admin")]
        [HttpGet]
        [Route("trackOrders")]
        [EnableCors(origins: "*", headers: "*", methods: "GET")]
        public HttpResponseMessage TrackOrders()
        {
            try
            {
                var result = OrderService.GetTrackOrders();
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        [Logged("Admin")]
        [HttpPut]
        [Route("processing/{id}")]
        [EnableCors(origins: "*", headers: "*", methods: "PUT")]
        public HttpResponseMessage ProcessingOrder(int id)
        {
            try
            {
                var result = OrderService.ConfirmOrder(id);
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        [Logged("Admin")]
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

        [Logged("Deliveryman")]
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


        [Logged("Admin","Deliveryman")]
        [HttpPut]
        [Route("delivered/{oId}")]
        [EnableCors(origins: "*", headers: "*", methods: "PUT")]
        public HttpResponseMessage DeliveredOrder(int oId)
        {
            try
            {
                var result = OrderService.DeliveredOrder(oId);
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        [Logged("Admin", "Deliveryman")]
        [HttpPut]
        [Route("cancel/{oId}")]
        [EnableCors(origins: "*", headers: "*", methods: "PUT")]
        public HttpResponseMessage CancelledOrder(int oId)
        {
            try
            {
                var tKey = Request.Headers.Authorization.ToString();
                var result = OrderService.CancelOrder(oId,tKey); 
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message);
            }

            
        }

       

    }
}
