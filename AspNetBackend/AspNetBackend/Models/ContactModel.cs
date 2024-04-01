using System.ComponentModel.DataAnnotations;

namespace AspNetBackend.Models
{
    public class ContactModel
    {
        [Key]
        public int ContactId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Twitter { get; set; }
        public string Avatar { get; set; }
        public string Notes { get; set; }
        public bool Favorite { get; set; }
    }
}
