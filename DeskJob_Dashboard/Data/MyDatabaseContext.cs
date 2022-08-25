using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using DeskJob_Dashboard.Models;

namespace DeskJob_Dashboard.Models
{
    public class MyDatabaseContext : DbContext
    {
        public MyDatabaseContext (DbContextOptions<MyDatabaseContext> options)
            : base(options)
        {
        }

        public DbSet<DeskJob_Dashboard.Models.Todo> Todo { get; set; }
    }
}
