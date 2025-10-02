using BLL.Auth;
using BLL.DTOs;
using BLL.Services;
using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace PresentationAPI.Controllers
{
    [RoutePrefix("api/product")]
    public class ProductController : ApiController
    {

        [Logged("Admin","Customer")]
        [HttpGet]     
        [Route("all")]  
        [EnableCors(origins: "*", headers: "*", methods: "GET")]
        public HttpResponseMessage Get()
        {
            try
            {
                var data = ProductService.Get();
                return Request.CreateResponse(HttpStatusCode.OK, data);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, ex.Message);
            }

        }

        [Logged("Admin", "Customer")]
        [HttpGet]
        [Route("{id}")]
        public HttpResponseMessage Get(int id)
        {
            try
            {
                var data = ProductService.Get(id);
                return Request.CreateResponse(HttpStatusCode.OK, data);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, ex.Message);
            }

        }

        [Logged("Admin", "Customer")]
        [HttpGet]
        [Route("category/{pId}")]
        public HttpResponseMessage GetProductCategory(int pId)
        {
            try
            {
                var data = ProductService.Get(pId);
                var categoryData = data.Category;    
                return Request.CreateResponse(HttpStatusCode.OK, categoryData);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, ex.Message);
            }

        }

        [Logged("Admin", "Customer")]
        [HttpGet]
        [Route("byCategory/{cId}")]
        public HttpResponseMessage GetProductByCategory(int cId)
        {
            try
            {
                var data = ProductService.GetByCategory(cId);             
                return Request.CreateResponse(HttpStatusCode.OK, data);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, ex.Message);
            }

        }

        [Logged("Admin")]
        [HttpPost]
        [Route("add")]
        [EnableCors(origins: "*", headers: "*", methods: "POST")]
        public HttpResponseMessage Add(ProductDTO obj)
        {
            try
            {
                var result = ProductService.Create(obj);
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }

        }

        [Logged("Admin")]
        [HttpPut]
        [Route("update")]
        public HttpResponseMessage Update(ProductDTO obj)
        {
            try
            {
                var result = ProductService.Update(obj);
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }

        }

        [Logged("Admin")]
        [HttpDelete]
        [Route("delete/{id}")]
        public HttpResponseMessage Delete(int id)
        {
            try
            {
                var result = ProductService.Delete(id);
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }

        }

        [Logged("Admin", "Customer")]
        [HttpGet]
        [Route("search/{text}")]
        [EnableCors(origins: "*", headers: "*", methods: "GET")]
        public HttpResponseMessage Serach(string text)
        {
            try
            {
                var result = ProductService.Search(text);
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }

        }




    }
}
