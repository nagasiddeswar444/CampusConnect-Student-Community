using CampusConnect.API.DTOs;
using CampusConnect.API.Models;
using CampusConnect.API.Repositories;

namespace CampusConnect.API.Services
{
    public class VideoService : IVideoService
    {
        private readonly IVideoRepository _repository;
        private readonly IWebHostEnvironment _environment;
        private readonly ICommunityService _communityService;
        private readonly IBlogRepository _blogRepository;
        private readonly INotificationService _notificationService;

        public VideoService(
    IVideoRepository repository,
    IWebHostEnvironment environment,
    ICommunityService communityService,
    IBlogRepository blogRepository,
    INotificationService notificationService
)
        {
            _repository = repository;
            _environment = environment;
            _communityService = communityService;
            _blogRepository = blogRepository;
            _notificationService = notificationService;
        }

        public async Task CreateVideo(CreateVideoDto dto)
        {
            if (dto.VideoFile == null || dto.VideoFile.Length == 0)
            {
                throw new Exception("Please select a video file.");
            }

            string extension =
                Path.GetExtension(dto.VideoFile.FileName).ToLower();

            if (extension != ".mp4")
            {
                throw new Exception("Only MP4 videos are allowed.");
            }

            string webRootPath =
      string.IsNullOrEmpty(_environment.WebRootPath)
          ? Path.Combine(
              _environment.ContentRootPath,
              "wwwroot")
          : _environment.WebRootPath;

            string uploadsFolder =
                Path.Combine(
                    webRootPath,
                    "Uploads",
                    "Videos");

            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            string fileName =
                Guid.NewGuid().ToString() + extension;

            string filePath =
                Path.Combine(uploadsFolder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await dto.VideoFile.CopyToAsync(stream);
            }

            Video video = new Video
            {
                UserId = dto.UserId,
                Title = dto.Title,
                Description = dto.Description,
                VideoPath = $"Uploads/Videos/{fileName}",
                CommunityId = dto.CommunityId
            };


            await _repository.CreateVideo(video);

            await _notificationService.AddNotification(
    new CreateNotificationDto
    {
        UserId = 1,
        Message = "New video submitted for approval",
        NotificationType = "AdminVideoApproval",
        ReferenceId = null
    }
);



        }

        public async Task<IEnumerable<Video>> GetAllVideos()
        {
            return await _repository.GetAllVideos();
        }

        public async Task<IEnumerable<Video>> GetVideosByUser(int userId)
        {
            return await _repository.GetVideosByUser(userId);
        }

        public async Task UpdateVideo(UpdateVideoDto dto)
        {
            await _repository.UpdateVideo(dto);
        }

        public async Task DeleteVideo(DeleteVideoDto dto)
        {
            await _repository.DeleteVideo(dto);
        }
    }
}