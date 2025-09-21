using BLL.DTOs;
using BLL.Models;
using BLL.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Results;

namespace PresentationAPI.Controllers
{
    [RoutePrefix("api/order")]
    public class OrderController : ApiController
    {
        [HttpPost]
        [Route("place")]

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

        [HttpPut]
        [Route("processing/{id}")]
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
        [Route("ontheway/{id}")]
        public HttpResponseMessage OnTheWayOrder(int id)
        {
            try
            {
                var result = OrderStatusService.ChangeStatusToOnTheWay(id);
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        [HttpPut]
        [Route("assign")]
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



        //[HttpPut]
        //[Route("delivered/{id}")]
        //public HttpResponseMessage DeliveredOrder(int id)
        //{
        //    try
        //    {
        //        var result = OrderStatusService.ChangeStatusToDelivered(id);// can be change cz. of payment confirmation
        //        return Request.CreateResponse(HttpStatusCode.OK, result);
        //    }
        //    catch (Exception ex)
        //    {
        //        return Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message);
        //    }
        //}

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
