using BLL.Auth;
using BLL.Services;
using PresentationAPI.Models;
using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
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
                var token = AuthentiicationService.Login(user.UserId,user.Password);

                //var cookie = new CookieHeaderValue("token", token.Tkey)
                //{
                //    HttpOnly = true,
                //    Secure = false, // for  HTTPS
                //    Path = "/",
                //    Expires = DateTime.Now.AddMinutes(30)  
                //};
                //var response = Request.CreateResponse(HttpStatusCode.OK, new { message = "Login successful",role = token.User.Role,userId = token.UserId });
                //response.Headers.AddCookies(new[] { cookie });
                return Request.CreateResponse(HttpStatusCode.OK, new { tkey = token.Tkey,role = token.User.Role,userId = token.UserId});

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
