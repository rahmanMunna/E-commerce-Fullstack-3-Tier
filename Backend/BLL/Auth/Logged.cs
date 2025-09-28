using BLL.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace BLL.Auth
{
    public class Logged : AuthorizationFilterAttribute
    {
        private string[] roles;
        public Logged(params string[] roles)
        {
            this.roles = roles;
        }

        public override void OnAuthorization(HttpActionContext actionContext)
        {
            var token = actionContext.Request.Headers.Authorization;
            if(token == null )
            {
                actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.Unauthorized, new { Msg = "Token not supplied" });
                base.OnAuthorization(actionContext);
                return;

            }

            var user = AuthentiicationService.isValidToken(token.ToString());
            if(user == null)
            {
                actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.Unauthorized, new { Msg = "Invalid Token" });
                base.OnAuthorization(actionContext);
                return;
            }
            if (this.roles.Length > 0 && !this.roles.Contains(user.Role))
            {
                actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.Forbidden, new { Msg = "Access denied",Authorization = false });

            }
            base.OnAuthorization(actionContext);

        }

    }
}
