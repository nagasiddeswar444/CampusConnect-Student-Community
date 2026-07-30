using Microsoft.Data.SqlClient;
using System.Data;

namespace CampusConnect.API.Data
{
    public class DbContextDapper
    {
        private readonly IConfiguration _configuration;

        public DbContextDapper(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public IDbConnection CreateConnection()
        {
            return new SqlConnection(
                _configuration.GetConnectionString("DefaultConnection")
            );
        }
    }
}