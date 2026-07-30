using CampusConnect.API.DTOs;
using CampusConnect.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace CampusConnect.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LikeController : ControllerBase
    {
        private readonly ILikeService _service;

        public LikeController(ILikeService service)
        {
            _service = service;
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddLike(AddLikeDto dto)
        {
            await _service.AddLike(dto);

            return Ok(new
            {
                message = "Blog liked successfully"
            });
        }

        [HttpDelete("remove")]
        public async Task<IActionResult> RemoveLike(RemoveLikeDto dto)
        {
            await _service.RemoveLike(dto);

            return Ok(new
            {
                message = "Like removed successfully"
            });
        }

        [HttpGet("count/{blogId}")]
        public async Task<IActionResult> GetLikeCount(int blogId)
        {
            var count = await _service.GetLikeCount(blogId);

            return Ok(new
            {
                likeCount = count
            });
        }
    }
}