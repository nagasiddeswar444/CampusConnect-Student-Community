using CampusConnect.API.DTOs;
using CampusConnect.API.Models;

namespace CampusConnect.API.Services
{
    public interface IAuthService
    {
        Task RegisterStudent(RegisterDto dto);

        Task ForgotPassword(ForgotPasswordDto dto);

        Task<User?> Login(LoginDto dto);
        Task<ProfileDto?> GetStudentProfile(
    int userId
);
        Task UpdateProfile(
    UpdateProfileDto dto
);
        Task UploadProfilePhoto(
    UploadProfilePhotoDto dto
);


        Task CreatePassword(CreatePasswordDto dto);

        Task<User?> GetUserByPasswordToken(string token);

        Task SavePasswordSetupToken(int userId, string token);

        Task ResetPassword(CreatePasswordDto dto);


    }
}