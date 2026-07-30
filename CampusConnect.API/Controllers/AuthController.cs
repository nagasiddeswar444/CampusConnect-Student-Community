using CampusConnect.API.DTOs;
using CampusConnect.API.Services;
using Microsoft.AspNetCore.Mvc;
using CampusConnect.API.Helpers;

namespace CampusConnect.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _service;
        private readonly JwtHelper _jwtHelper;

        public AuthController(
            IAuthService service,
            JwtHelper jwtHelper)
        {
            _service = service;
            _jwtHelper = jwtHelper;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            await _service.RegisterStudent(dto);

            return Ok(new
            {
                message = "Registration submitted successfully. Please wait for admin approval. After approval, you will receive an email to create your password."
            });
        }

        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword(
    ForgotPasswordDto dto
)
        {
            await _service.ForgotPassword(dto);

            return Ok(new
            {
                message = "Password reset link has been sent to your email."
            });
        }


        [HttpPost("create-password")]
        public async Task<IActionResult> CreatePassword(
    CreatePasswordDto dto
)
        {
            await _service.CreatePassword(dto);

            return Ok(new
            {
                message = "Password created successfully."
            });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            var user = await _service.Login(dto);

            if (user == null)
            {
                return Unauthorized(new
                {
                    message = "Invalid email or password"
                });
            }

            if (user.Status != "Approved")
            {
                return Unauthorized(new
                {
                    message = "Your account is awaiting admin approval."
                });
            }

            var token = _jwtHelper.GenerateToken(user);

            return Ok(new
            {
                message = "Login successful",
                token,
                userId = user.UserId,
                fullName = user.FullName,
                email = user.Email,
                roleId = user.RoleId,
                roleName = user.RoleName
            });
        }

        [HttpGet("profile/{userId}")]
        public async Task<IActionResult>
GetProfile(int userId)
        {
            var profile =
                await _service
                .GetStudentProfile(userId);

            if (profile == null)
            {
                return NotFound();
            }

            return Ok(profile);
        }

        [HttpPut("update-profile")]
        public async Task<IActionResult>
UpdateProfile(
    UpdateProfileDto dto)
        {
            await _service
                .UpdateProfile(dto);

            return Ok(new
            {
                message =
                    "Profile updated successfully"
            });
        }

        [HttpPost("upload-profile-photo")]
        public async Task<IActionResult>
UploadProfilePhoto(
    [FromForm]
    UploadProfilePhotoDto dto)
        {
            await _service
                .UploadProfilePhoto(dto);

            return Ok(new
            {
                message =
                    "Profile photo uploaded successfully"
            });
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword(CreatePasswordDto dto)
        {
            await _service.ResetPassword(dto);

            return Ok(new
            {
                message = "Password reset successfully."
            });
        }
    }
}