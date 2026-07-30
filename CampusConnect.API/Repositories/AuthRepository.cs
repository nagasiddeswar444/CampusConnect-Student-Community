using CampusConnect.API.Data;
using CampusConnect.API.DTOs;
using CampusConnect.API.Models;
using Dapper;

namespace CampusConnect.API.Repositories
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DbContextDapper _dbContext;

        public AuthRepository(DbContextDapper dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task RegisterStudent(RegisterDto dto)
        {
            var queryParameters = new
            {
                dto.FullName,
                dto.Email,
                
                dto.Department,
                dto.YearOfStudy
            };

            using var connection = _dbContext.CreateConnection();

            await connection.ExecuteAsync(
                "sp_RegisterStudent",
                queryParameters,
                commandType: System.Data.CommandType.StoredProcedure
            );
        }

        public async Task<User?> GetUserByEmail(string email)
        {
            using var connection = _dbContext.CreateConnection();

            return await connection.QueryFirstOrDefaultAsync<User>(
               "sp_GetUserWithRole",
                new { Email = email },
                commandType: System.Data.CommandType.StoredProcedure
            );
        }

        public async Task<ProfileDto?> GetStudentProfile(
    int userId)
        {
            using var connection =
                _dbContext.CreateConnection();

            return await connection
                .QueryFirstOrDefaultAsync<ProfileDto>(
                    "sp_GetStudentProfile",
                    new { UserId = userId },
                    commandType:
                    System.Data.CommandType.StoredProcedure
                );
        }

        public async Task UpdateProfile(
    UpdateProfileDto dto)
        {
            using var connection =
                _dbContext.CreateConnection();

            await connection.ExecuteAsync(
                "sp_UpdateProfile",
                new
                {
                    dto.UserId,
                    dto.FullName,
                    dto.Department,
                    dto.YearOfStudy
                },
                commandType:
                System.Data.CommandType.StoredProcedure
            );
        }
        public async Task UpdateProfilePhoto(
    int userId,
    string imagePath)
        {
            using var connection =
                _dbContext.CreateConnection();

            await connection.ExecuteAsync(
                "sp_UpdateProfilePhoto",
                new
                {
                    UserId = userId,
                    ProfileImagePath = imagePath
                },
                commandType:
                System.Data.CommandType.StoredProcedure
            );
        }


        public async Task<User?> GetUserById(
    int userId
)
        {
            using var connection =
                _dbContext.CreateConnection();

            return await connection
                .QueryFirstOrDefaultAsync<User>(
                    @"
            SELECT *
            FROM Users
            WHERE UserId = @UserId
            ",
                    new
                    {
                        UserId = userId
                    }
                );
        }


        public async Task SavePasswordSetupToken(
    int userId,
    string token
)
        {
            using var connection =
                _dbContext.CreateConnection();

            await connection.ExecuteAsync(
                "sp_SavePasswordSetupToken",
                new
                {
                    UserId = userId,
                    Token = token
                },
                commandType:
                System.Data.CommandType.StoredProcedure
            );
        }


        public async Task<User?> GetUserByPasswordToken(
    string token
)
        {
            using var connection =
                _dbContext.CreateConnection();

            return await connection
                .QueryFirstOrDefaultAsync<User>(
                    "sp_GetUserByPasswordToken",
                    new
                    {
                        Token = token
                    },
                    commandType:
                    System.Data.CommandType.StoredProcedure
                );
        }


        public async Task CreatePassword(
    int userId,
    string passwordHash
)
        {
            using var connection =
                _dbContext.CreateConnection();

            await connection.ExecuteAsync(
                "sp_CreatePassword",
                new
                {
                    UserId = userId,
                    PasswordHash = passwordHash
                },
                commandType:
                System.Data.CommandType.StoredProcedure
            );
        }

        public async Task SaveForgotPasswordToken(
    int userId,
    string token
)
        {
            using var connection =
                _dbContext.CreateConnection();

            await connection.ExecuteAsync(
                "sp_SaveForgotPasswordToken",
                new
                {
                    UserId = userId,
                    Token = token
                },
                commandType:
                System.Data.CommandType.StoredProcedure
            );
        }


        public async Task<User?> GetUserByForgotPasswordToken(string token)
        {
            using var connection = _dbContext.CreateConnection();

            return await connection.QueryFirstOrDefaultAsync<User>(
                "sp_GetUserByForgotPasswordToken",
                new
                {
                    Token = Guid.Parse(token)
                },
                commandType: System.Data.CommandType.StoredProcedure
            );
        }
    }
}