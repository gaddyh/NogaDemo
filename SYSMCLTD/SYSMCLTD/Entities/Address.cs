using System.ComponentModel.DataAnnotations;

namespace SYSMCLTD.Entities
{
    public class Address : BaseEntity
    {
        [Required]
        public string City { get; set; }
        [Required]
        public string Street { get; set; }
        [Required]
        public int CustomerId { get; set; }
    }
}
