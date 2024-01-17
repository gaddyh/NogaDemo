using Microsoft.AspNetCore.Mvc;
using System.Linq;
using SYSMCLTD.Entities;
using SYSMCLTD.Data;

namespace SYSMCLTD.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class AddressController : ControllerBase
    {
        private readonly SYSMCLTDContext _context;

        public AddressController(SYSMCLTDContext context)
        {
            _context = context;
        }

        // GET: api/Address
        [HttpGet]
        public ActionResult<IEnumerable<Address>> Get()
        {
            return Ok(_context.Addresses.ToList());
        }

        // GET: api/Address/5
        [HttpGet("{id}")]
        public ActionResult<Address> Get(int id)
        {
            var address = _context.Addresses.FirstOrDefault(a => a.Id == id);
            if (address == null)
            {
                return NotFound();
            }

            return Ok(address);
        }

        // GET: api/Address/ByCustomer/1
        [HttpGet("ByCustomer/{customerId}")]
        public ActionResult<IEnumerable<Address>> GetByCustomer(int customerId)
        {
            var customerAddresses = _context.Addresses.Where(a => a.CustomerId == customerId).ToList();
            if (!customerAddresses.Any())
            {
                return NotFound();
            }

            return Ok(customerAddresses);
        }

        // POST: api/Address
        [HttpPost]
        public IActionResult Post([FromBody] Address address)
        {
            _context.Addresses.Add(address);
            _context.SaveChanges();
            return CreatedAtAction("Get", new { id = address.Id }, address);
        }

        // PUT: api/Address/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Address addressUpdate)
        {
            var address = _context.Addresses.FirstOrDefault(a => a.Id == id);
            if (address == null)
            {
                return NotFound();
            }

            address.City = addressUpdate.City;
            address.Street = addressUpdate.Street;
            address.CustomerId = addressUpdate.CustomerId;
            address.IsDeleted = addressUpdate.IsDeleted;

            _context.SaveChanges();
            return NoContent();
        }

        // DELETE: api/Address/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var address = _context.Addresses.FirstOrDefault(a => a.Id == id);
            if (address == null)
            {
                return NotFound();
            }

            _context.Addresses.Remove(address);
            _context.SaveChanges();
            return NoContent();
        }
    }
}
