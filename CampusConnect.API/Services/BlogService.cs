using CampusConnect.API.DTOs;
using CampusConnect.API.Models;
using CampusConnect.API.Repositories;
using Microsoft.AspNetCore.Hosting;


namespace CampusConnect.API.Services
{
    public class BlogService : IBlogService
    {
        private readonly IBlogRepository _repository;
        private readonly ICommunityService _communityService;
        private readonly IWebHostEnvironment _environment;
        private readonly INotificationService _notificationService;

        public BlogService(
    IBlogRepository repository,
    ICommunityService communityService,
    IWebHostEnvironment environment,
    INotificationService notificationService
)
        {
            _repository = repository;
            _communityService = communityService;
            _environment = environment;
            _notificationService = notificationService;
        }

        public async Task CreateBlog(CreateBlogDto dto)
        {
            if (dto.AttachmentFile != null)
            {
                string webRootPath =
                    string.IsNullOrEmpty(
                        _environment.WebRootPath
                    )
                    ?
                    Path.Combine(
                        _environment.ContentRootPath,
                        "wwwroot"
                    )
                    :
                    _environment.WebRootPath;

                string uploadsFolder =
                    Path.Combine(
                        webRootPath,
                        "Uploads",
                        "BlogAttachments"
                    );

                if (!Directory.Exists(
                    uploadsFolder
                ))
                {
                    Directory.CreateDirectory(
                        uploadsFolder
                    );
                }

                string fileName =
                    Guid.NewGuid().ToString()
                    +
                    Path.GetExtension(
                        dto.AttachmentFile.FileName
                    );

                string filePath =
                    Path.Combine(
                        uploadsFolder,
                        fileName
                    );

                using (
                    var stream =
                        new FileStream(
                            filePath,
                            FileMode.Create
                        )
                )
                {
                    await dto.AttachmentFile
                        .CopyToAsync(stream);
                }

                dto.AttachmentPath =
                    $"Uploads/BlogAttachments/{fileName}";

                dto.AttachmentName =
                    dto.AttachmentFile.FileName;
            }

            await _repository.CreateBlog(dto);

            await _notificationService.AddNotification(
    new CreateNotificationDto
    {
        UserId = 1,
        Message = "New blog submitted for approval",
        NotificationType = "AdminBlogApproval",
        ReferenceId = null
    }
);


        }

        public async Task<IEnumerable<Blog>> GetAllBlogs()
        {
            return await _repository.GetAllBlogs();
        }

        public async Task<IEnumerable<Blog>> GetBlogsByUser(int userId)
        {
            return await _repository.GetBlogsByUser(userId);
        }

        public async Task UpdateBlog(
    UpdateBlogDto dto
)
        {
            if (dto.AttachmentFile != null)
            {
                string webRootPath =
                    string.IsNullOrEmpty(
                        _environment.WebRootPath
                    )
                    ?
                    Path.Combine(
                        _environment.ContentRootPath,
                        "wwwroot"
                    )
                    :
                    _environment.WebRootPath;

                string uploadsFolder =
                    Path.Combine(
                        webRootPath,
                        "Uploads",
                        "BlogAttachments"
                    );

                if (!Directory.Exists(
                    uploadsFolder
                ))
                {
                    Directory.CreateDirectory(
                        uploadsFolder
                    );
                }

                string fileName =
                    Guid.NewGuid().ToString()
                    +
                    Path.GetExtension(
                        dto.AttachmentFile.FileName
                    );

                string filePath =
                    Path.Combine(
                        uploadsFolder,
                        fileName
                    );

                using (
                    var stream =
                        new FileStream(
                            filePath,
                            FileMode.Create
                        )
                )
                {
                    await dto.AttachmentFile
                        .CopyToAsync(stream);
                }

                dto.AttachmentPath =
                    $"Uploads/BlogAttachments/{fileName}";

                dto.AttachmentName =
                    dto.AttachmentFile.FileName;
            }

            await _repository.UpdateBlog(dto);
        }

        public async Task DeleteBlog(DeleteBlogDto dto)
        {
            await _repository.DeleteBlog(dto);
        }
    }
}