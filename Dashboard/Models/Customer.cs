using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace Dashboard
{
    public partial class Customer
    {
        public Customer()
        {
            Sales = new HashSet<Sale>();
        }

        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(255)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(255)]
        public string LastName { get; set; }

        [Required]
        [StringLength(255)]
        public string Address { get; set; }

        public virtual ICollection<Sale> Sales { get; set; }
    }
}
