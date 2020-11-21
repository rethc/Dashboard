﻿using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace Dashboard
{
    public partial class Store
    {
        public Store()
        {
            Sales = new HashSet<Sales>();
        }

        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(255)]
        public string Name { get; set; }

        [Required]
        [StringLength(255)]
        public string Address { get; set; }

        public virtual ICollection<Sales> Sales { get; set; }
    }
}
