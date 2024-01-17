using System.ComponentModel.DataAnnotations;

namespace SYSMCLTD.Entities
{
    public class Contact : BaseEntity
    {
        [Required]
        public string FullName { get; set; }
        public string OfficeNumber { get; set; }
        public string Email { get; set; }
        [Required]
        public int CustomerId { get; set; }

    }
}
