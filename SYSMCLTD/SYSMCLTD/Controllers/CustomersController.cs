using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using SYSMCLTD.Entities;
using SYSMCLTD.Data; // Namespace where SYSMCLTDContext is located

namespace SYSMCLTD.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class CustomersController : ControllerBase
    {
        private readonly SYSMCLTDContext _context;

        public CustomersController(SYSMCLTDContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var customers = _context.Customers.Where(c => !c.IsDeleted).ToList();
            return Ok(customers);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var customer = _context.Customers.FirstOrDefault(c => c.Id == id && !c.IsDeleted);
            if (customer == null)
            {
                return NotFound();
            }

            return Ok(customer);
        }

        [HttpPost]
        public IActionResult Post([FromBody] Customer customer)
        {
            customer.Created = DateTime.Now;
            customer.IsDeleted = false;
            _context.Customers.Add(customer);
            _context.SaveChanges();
            return CreatedAtAction(nameof(Get), new { id = customer.Id }, customer);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Customer customerUpdate)
        {
            var customer = _context.Customers.FirstOrDefault(c => c.Id == id && !c.IsDeleted);
            if (customer == null)
            {
                return NotFound();
            }

            customer.Name = customerUpdate.Name;
            customer.CustomerNumber = customerUpdate.CustomerNumber;
            customer.IsDeleted = customerUpdate.IsDeleted;
            _context.SaveChanges();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var customer = _context.Customers.FirstOrDefault(c => c.Id == id && !c.IsDeleted);
            if (customer == null)
            {
                return NotFound();
            }

            customer.IsDeleted = true; // Soft delete
            _context.SaveChanges();
            return NoContent();
        }
    }
}
