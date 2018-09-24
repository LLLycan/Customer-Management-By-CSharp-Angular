using Angular2MVC.DBContext;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net.Http;
using System.Web.Http;

namespace Angular2MVC.Controllers
{
    /// <summary>
    /// Customer API based on CRUD
    /// </summary>
    public class CustomerAPIController : BaseAPIController
    {
        /// <summary>
        /// Get top 5 oldest customers, order by last name
        /// </summary>
        public HttpResponseMessage Get()
        {
            var customerList = CustomerDB.tblCustomers.ToList();
            List<tblCustomer> customers = new List<tblCustomer>();
            foreach (var customer in customerList)
            {
                if (customer.DOB != null)
                {
                    customers.Add(customer);
                }
            }
            customers = customers.OrderBy(c => c.DOB).Take(5).OrderBy(x => x.LastName).ToList();
            return ToJson(customers.AsEnumerable());
        }

        /// <summary>
        /// Create new customer
        /// </summary>
        public HttpResponseMessage Post([FromBody]tblCustomer value)
        {
            CustomerDB.tblCustomers.Add(value);             
            return ToJson(CustomerDB.SaveChanges());
        }

        /// <summary>
        /// Update customer by id
        /// </summary>
        public HttpResponseMessage Put(int id, [FromBody]tblCustomer value)
        {
            CustomerDB.Entry(value).State = EntityState.Modified;
            return ToJson(CustomerDB.SaveChanges());
        }

        /// <summary>
        /// Delete customer by id
        /// </summary>
        public HttpResponseMessage Delete(int id)
        {
            CustomerDB.tblCustomers.Remove(CustomerDB.tblCustomers.FirstOrDefault(x => x.CustomerId == id));
            return ToJson(CustomerDB.SaveChanges());
        }
    }
}
