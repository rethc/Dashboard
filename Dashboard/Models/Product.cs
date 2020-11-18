using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


#nullable disable

namespace Dashboard
{
    public partial class Product
    {
        public Product()
        {
            Sales = new HashSet<Sale>();
        }

        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(255)]
        public string Name { get; set; }

        [Column(TypeName = "decimal(10, 2)")]
        [Range(0, 9999.99)]
        public decimal Price { get; set; }

        public virtual ICollection<Sale> Sales { get; set; }
    }
}
