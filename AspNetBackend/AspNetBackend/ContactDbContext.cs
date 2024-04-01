using AspNetBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace AspNetBackend
{
    public class ContactDbContext : DbContext
    {
        public ContactDbContext(DbContextOptions<ContactDbContext> options) : base(options) { }

        public DbSet<ContactModel> Contacts { get; set; }
    }
}
