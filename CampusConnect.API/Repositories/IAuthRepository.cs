using CampusConnect.API.DTOs;
using CampusConnect.API.Models;

namespace CampusConnect.API.Repositories
{
    public interface IAuthRepository
    {
        Task RegisterStudent(RegisterDto dto);

        Task<User?> GetUserByEmail(string email);

        Task<ProfileDto?> GetStudentProfile(
            int userId
        );

        Task UpdateProfile(
            UpdateProfileDto dto
        );

        Task UpdateProfilePhoto(
            int userId,
            string imagePath
        );

        Task<User?> GetUserById(
    int userId
);


        Task SavePasswordSetupToken(
        int userId,
        string token
    );

        Task<User?> GetUserByPasswordToken(
            string token
        );

        Task CreatePassword(
            int userId,
            string passwordHash
        );


        Task SaveForgotPasswordToken(
    int userId,
    string token
);

        Task<User?> GetUserByForgotPasswordToken(string token);




    }
}