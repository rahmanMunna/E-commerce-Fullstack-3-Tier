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
    [RoutePrefix("api/category")]
    public class CategoryController : ApiController
    {
        [HttpGet]
        [Route("all")]
        [EnableCors(origins: "*", headers: "*", methods: "GET")]
        public HttpResponseMessage Get()
        {
            try
            {
                var result = ProductCategoryService.Get();   
                return Request.CreateResponse(HttpStatusCode.OK, result); 
            }
            catch(Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }   
        }
    }
}
