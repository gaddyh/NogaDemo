using Microsoft.EntityFrameworkCore;
using SYSMCLTD.Entities;

namespace SYSMCLTD.Data
{
    public class SYSMCLTDContext : DbContext
    {
        public SYSMCLTDContext(DbContextOptions<SYSMCLTDContext> options)
            : base(options)
        {
        }

        public DbSet<Customer> Customers { get; set; }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<Contact> Contacts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Model configurations for Customer
            modelBuilder.Entity<Customer>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired();
                entity.HasIndex(e => e.Name).IsUnique();
                entity.Property(e => e.CustomerNumber).IsRequired();
                // Add other configurations as necessary
            });

            // Model configurations for Address
            modelBuilder.Entity<Address>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.City).IsRequired();
                entity.Property(e => e.Street).IsRequired();
                entity.HasOne<Customer>().WithMany().HasForeignKey(e => e.CustomerId);
                // Add other configurations as necessary

                // Configure the one-to-many relationship with Customer
                entity.HasOne<Customer>()
                      .WithMany()
                      .HasForeignKey(e => e.CustomerId)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            // Model configurations for Contact
            modelBuilder.Entity<Contact>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.FullName).IsRequired();
                entity.Property(e => e.CustomerId).IsRequired();
                entity.HasOne<Customer>().WithMany().HasForeignKey(e => e.CustomerId);
                // Add other configurations as necessary

                // Configure the one-to-many relationship with Customer
                entity.HasOne<Customer>()
                      .WithMany()
                      .HasForeignKey(e => e.CustomerId)
                      .OnDelete(DeleteBehavior.Cascade);
            });


        }
    }
}
