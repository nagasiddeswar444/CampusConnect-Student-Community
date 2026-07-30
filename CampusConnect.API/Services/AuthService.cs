using BCrypt.Net;
using CampusConnect.API.DTOs;
using CampusConnect.API.Repositories;
using CampusConnect.API.Models;

namespace CampusConnect.API.Services
{
    public class AuthService : IAuthService
    {
        private readonly IAuthRepository _repository;
        private readonly IWebHostEnvironment _environment;
        private readonly EmailService _emailService;

        public AuthService(
    IAuthRepository repository,
    IWebHostEnvironment environment,
    EmailService emailService
)
        {
            _repository = repository;
            _environment = environment;
            _emailService = emailService;
        }

        public async Task RegisterStudent(RegisterDto dto)
        {
            

            await _repository.RegisterStudent(dto);
        }


        public async Task ForgotPassword(
    ForgotPasswordDto dto
)
        {
            var user =
                await _repository
                    .GetUserByEmail(dto.Email);

            if (user == null)
            {
                throw new Exception(
                    "No account found with this email."
                );
            }

            string token =
                Guid.NewGuid().ToString();

            await _repository
                .SaveForgotPasswordToken(
                    user.UserId,
                    token
                );

            string link =
     $"http://localhost:3000/reset-password?token={token}";

            await _emailService.SendEmail(
                user.Email,
                "CampusConnect Password Reset",
                $@"
<div style='font-family:Arial;padding:30px;'>

<h2>Hello {user.FullName},</h2>

<p>
We received a request to reset your CampusConnect password.
</p>

<p>
Click the button below to create a new password.
</p>

<br/>

<a
href='{link}'
style='
background:#2563eb;
color:white;
padding:14px 24px;
border-radius:8px;
text-decoration:none;
font-weight:bold;
'>
Reset Password
</a>

<br/><br/>

<p>
If you didn't request this, you can safely ignore this email.
</p>

<br/>

<p>
CampusConnect Team
</p>

</div>"
            );
        }


        public async Task<User?> Login(LoginDto dto)
        {
            var user = await _repository.GetUserByEmail(dto.Email);

            if (user == null)
            {
                return null;
            }

            if (string.IsNullOrEmpty(user.PasswordHash))
            {
                throw new Exception(
                    "Please create your password from the email sent by CampusConnect."
                );
            }

            bool isPasswordValid =
                BCrypt.Net.BCrypt.Verify(
                    dto.Password,
                    user.PasswordHash
                );

            if (!isPasswordValid)
            {
                return null;
            }

            return user;
        }

        public async Task<ProfileDto?> GetStudentProfile(
    int userId)
        {
            return await _repository
                .GetStudentProfile(userId);
        }

        public async Task UpdateProfile(
    UpdateProfileDto dto)
        {
            await _repository
                .UpdateProfile(dto);
        }

        public async Task UploadProfilePhoto(
    UploadProfilePhotoDto dto)
        {
            if (dto.ProfileImage == null ||
                dto.ProfileImage.Length == 0)
            {
                throw new Exception(
                    "Please select an image."
                );
            }

            string extension =
                Path.GetExtension(
                    dto.ProfileImage.FileName
                ).ToLower();

            if (
                extension != ".jpg" &&
                extension != ".jpeg" &&
                extension != ".png"
               )
            {
                throw new Exception(
                    "Only JPG, JPEG and PNG allowed."
                );
            }

            string webRootPath =
                string.IsNullOrEmpty(
                    _environment.WebRootPath)
                ?
                Path.Combine(
                    _environment.ContentRootPath,
                    "wwwroot")
                :
                _environment.WebRootPath;

            string uploadsFolder =
                Path.Combine(
                    webRootPath,
                    "Uploads",
                    "Profiles");

            if (!Directory.Exists(
                uploadsFolder))
            {
                Directory.CreateDirectory(
                    uploadsFolder);
            }

            string fileName =
                Guid.NewGuid().ToString()
                + extension;

            string filePath =
                Path.Combine(
                    uploadsFolder,
                    fileName);

            using (var stream =
                new FileStream(
                    filePath,
                    FileMode.Create))
            {
                await dto.ProfileImage
                    .CopyToAsync(stream);
            }

            string imagePath =
                $"Uploads/Profiles/{fileName}";

            await _repository
                .UpdateProfilePhoto(
                    dto.UserId,
                    imagePath
                );
        }


        public async Task SavePasswordSetupToken(
    int userId,
    string token
)
        {
            await _repository.SavePasswordSetupToken(
                userId,
                token
            );
        }


        public async Task<User?> GetUserByPasswordToken(
    string token
)
        {
            return await _repository
                .GetUserByPasswordToken(token);
        }

        public async Task CreatePassword(
     CreatePasswordDto dto
 )
        {
            var user =
await _repository.GetUserByForgotPasswordToken(dto.Token);

            if (user == null)
            {
                throw new Exception(
                    "This password setup link is invalid or has expired."
                );
            }

            string hash =
    BCrypt.Net.BCrypt.HashPassword(dto.Password);

            await _repository.CreatePassword(
                user.UserId,
                hash
            );

            
        }


        public async Task ResetPassword(CreatePasswordDto dto)
        {
            var user =
 await _repository.GetUserByForgotPasswordToken(dto.Token);

            if (user == null)
            {
                throw new Exception("Invalid or expired reset link.");
            }

            string hash = BCrypt.Net.BCrypt.HashPassword(dto.Password);

            await _repository.CreatePassword(user.UserId, hash);
        }
    }
}