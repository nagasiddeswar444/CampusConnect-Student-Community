using CampusConnect.API.DTOs;
using CampusConnect.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace CampusConnect.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VideoController : ControllerBase
    {
        private readonly IVideoService _service;

        public VideoController(IVideoService service)
        {
            _service = service;
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadVideo(
    [FromForm] CreateVideoDto dto)
        {
            try
            {
                await _service.CreateVideo(dto);

                return Ok(new
                {
                    message = "Video uploaded successfully"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    message = ex.Message
                });
            }
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllVideos()
        {
            var videos = await _service.GetAllVideos();

            return Ok(videos);
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetVideosByUser(int userId)
        {
            var videos = await _service.GetVideosByUser(userId);

            return Ok(videos);
        }


        [HttpPut("update")]
        public async Task<IActionResult> UpdateVideo(UpdateVideoDto dto)
        {
            await _service.UpdateVideo(dto);

            return Ok(new
            {
                message = "Video updated successfully"
            });
        }

        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteVideo(DeleteVideoDto dto)
        {
            await _service.DeleteVideo(dto);

            return Ok(new
            {
                message = "Video deleted successfully"
            });
        }
    }
}