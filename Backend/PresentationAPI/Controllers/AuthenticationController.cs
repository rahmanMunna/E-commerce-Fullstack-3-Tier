using BLL.Auth;
using BLL.Services;
using PresentationAPI.Models;
using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace PresentationAPI.Controllers
{

    [RoutePrefix("api/authentication")]
    public class AuthenticationController : ApiController
    {
        [HttpPost]
        [Route("login")]
        [EnableCors(origins: "*", headers: "*", methods: "POST")]
        public HttpResponseMessage Login(LoggedUser user )
        {
            try
            {
                var response = AuthentiicationService.Login(user.UserId,user.Password);
                return Request.CreateResponse(HttpStatusCode.OK, response); 
            }
            catch(Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, ex.Message);
            }
        }

        [Logged]
        [HttpPost]
        [Route("logout")]
        [EnableCors(origins: "*", headers: "*", methods: "POST")]
        public HttpResponseMessage Logout()
        {
            try
            {
                var tKey = Request.Headers.Authorization.ToString(); 
                var response = AuthentiicationService.Logout(tKey);
                return Request.CreateResponse(HttpStatusCode.OK, response);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, ex.Message);
            }
        }
    }
}
