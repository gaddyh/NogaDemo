using Microsoft.AspNetCore.Mvc;
using System.Linq;
using SYSMCLTD.Entities;
using SYSMCLTD.Data; // Namespace where SYSMCLTDContext is located

namespace SYSMCLTD.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class ContactController : ControllerBase
    {
        private readonly SYSMCLTDContext _context;

        public ContactController(SYSMCLTDContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Contact>> Get()
        {
            return Ok(_context.Contacts.ToList());
        }

        [HttpGet("{id}")]
        public ActionResult<Contact> Get(int id)
        {
            var contact = _context.Contacts.FirstOrDefault(c => c.Id == id);
            if (contact == null)
            {
                return NotFound();
            }

            return Ok(contact);
        }

        [HttpGet("ByCustomer/{customerId}")]
        public ActionResult<IEnumerable<Contact>> GetByCustomer(int customerId)
        {
            var customerContacts = _context.Contacts.Where(c => c.CustomerId == customerId).ToList();
            if (!customerContacts.Any())
            {
                return NotFound();
            }

            return Ok(customerContacts);
        }

        [HttpPost]
        public IActionResult Post([FromBody] Contact contact)
        {
            _context.Contacts.Add(contact);
            _context.SaveChanges();
            return CreatedAtAction(nameof(Get), new { id = contact.Id }, contact);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Contact contactUpdate)
        {
            var contact = _context.Contacts.FirstOrDefault(c => c.Id == id);
            if (contact == null)
            {
                return NotFound();
            }

            // Update contact details
            contact.FullName = contactUpdate.FullName;
            contact.OfficeNumber = contactUpdate.OfficeNumber;
            contact.Email = contactUpdate.Email;
            contact.CustomerId = contactUpdate.CustomerId;
            contact.IsDeleted = contactUpdate.IsDeleted;

            _context.SaveChanges();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var contact = _context.Contacts.FirstOrDefault(c => c.Id == id);
            if (contact == null)
            {
                return NotFound();
            }

            contact.IsDeleted = true;

            _context.SaveChanges();
            return NoContent();
        }
    }
}
