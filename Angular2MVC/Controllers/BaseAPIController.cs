using Angular2MVC.DBContext;
using Newtonsoft.Json;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;

namespace Angular2MVC.Controllers
{   
    /// <summary>
    /// Base API controller for connecting DB entity
    /// </summary>
    public class BaseAPIController : ApiController
    {
        protected readonly CustomerDBEntities CustomerDB = new CustomerDBEntities();
        protected HttpResponseMessage ToJson(dynamic obj)
        {
            var response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(JsonConvert.SerializeObject(obj), Encoding.UTF8, "application/json");
            return response;
        }
    }
}
