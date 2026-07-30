using CampusConnect.API.Models;
using CampusConnect.API.Repositories;

namespace CampusConnect.API.Services
{
    public class AdminService : IAdminService
    {
        private readonly IAdminRepository
            _repository;

        private readonly ICommunityService
            _communityService;

        private readonly IBlogRepository
            _blogRepository;

        private readonly IVideoRepository
            _videoRepository;


        private readonly IAuthRepository
    _authRepository;

        private readonly EmailService
            _emailService;
        public AdminService(
    IAdminRepository repository,
    ICommunityService communityService,
    IBlogRepository blogRepository,
    IVideoRepository videoRepository,
    IAuthRepository authRepository,
    EmailService emailService
)
        {
            _repository = repository;

            _communityService = communityService;

            _blogRepository = blogRepository;

            _videoRepository = videoRepository;

            _authRepository = authRepository;

            _emailService = emailService;
        }

        public async Task<IEnumerable<User>> GetPendingStudents()
        {
            return await _repository.GetPendingStudents();
        }

        public async Task ApproveStudent(
    int userId
)
        {
            await _repository
                .ApproveStudent(userId);

            string token =
    Guid.NewGuid().ToString();

            await _authRepository
                .SavePasswordSetupToken(
                    userId,
                    token
                );

            var student =
                await _authRepository
                    .GetUserById(userId);

            if (student != null)
            {
                await _emailService.SendEmail(
                    student.Email,
                    "CampusConnect Account Approved",
                   $@"
<div style='font-family: Arial, sans-serif;
            max-width:600px;
            margin:auto;
            padding:30px;
            border:1px solid #e5e7eb;
            border-radius:12px;'>

    <h1 style='color:#2563eb;'>
        🎓 Welcome to CampusConnect
    </h1>

    <h3>
        Hello {student.FullName},
    </h3>

    <p>
        Congratulations! 🎉
    </p>

   <p>
    Your registration request has been reviewed and approved by the CampusConnect administrator.
</p>

<p>
    Please click the button below to create your password before logging in.
</p>

<br/>

<a
href='http://localhost:3000/create-password?token={token}'
style='
background:#2563eb;
padding:14px 25px;
color:white;
text-decoration:none;
border-radius:8px;
font-weight:bold;
display:inline-block;
'>
Create Password
</a>

<br/><br/>

<p>
This password setup link can be used only once.
</p>

<br/>

<p>
Best Regards,<br/>
<strong>CampusConnect Team</strong>
</p>

</div>


"

);
            }
        }



        public async Task RejectStudent(
    int userId
)
        {
            var student =
                await _authRepository
                    .GetUserById(userId);

            await _repository
                .RejectStudent(userId);

            if (student != null)
            {
                await _emailService.SendEmail(
                    student.Email,
                    "CampusConnect Registration Update",
                   $@"
<div style='font-family: Arial, sans-serif;
            max-width:600px;
            margin:auto;
            padding:30px;
            border:1px solid #e5e7eb;
            border-radius:12px;'>

    <h1 style='color:#dc2626;'>
        CampusConnect Registration Update
    </h1>

    <h3>
        Hello {student.FullName},
    </h3>

    <p>
        Thank you for registering with CampusConnect.
    </p>

    <p>
        After reviewing your application, we are unable to approve your registration at this time.
    </p>

    <p>
        We appreciate your interest and encourage you to apply again in the future.
    </p>

    <br/>

    <p>
        Best Regards,<br/>
        <strong>CampusConnect Team</strong>
    </p>

</div>
"
                );
            }
        }

        public async Task<IEnumerable<Blog>> GetAllBlogs()
        {
            return await _repository.GetAllBlogs();
        }

        public async Task DeleteAnyBlog(int blogId)
        {
            await _repository.DeleteAnyBlog(blogId);
        }

        public async Task<IEnumerable<Video>> GetAllVideos()
        {
            return await _repository.GetAllVideos();
        }

        public async Task DeleteAnyVideo(int videoId)
        {
            await _repository.DeleteAnyVideo(videoId);
        }

        public async Task DeleteAnyComment(int commentId)
        {
            await _repository.DeleteAnyComment(commentId);
        }

        public async Task<IEnumerable<Blog>>
    GetPendingBlogs()
        {
            return await _repository
                .GetPendingBlogs();
        }

        public async Task ApproveBlog(
    int blogId
)
        {
            await _repository
                .ApproveBlog(
                    blogId
                );

            var blog =
                await _blogRepository
                    .GetBlogById(
                        blogId
                    );

            if (blog.CommunityId != null)
            {
                string creatorName =
                    await _blogRepository
                        .GetUserName(
                            blog.UserId
                        );

                string communityName =
                    await _blogRepository
                        .GetCommunityName(
                            blog.CommunityId.Value
                        );

                await _communityService
                    .AddCommunityNotification(
                        blog.CommunityId.Value,
                        blog.UserId,
                        creatorName +
                        " posted a new blog in " +
                        communityName
                    );
            }
        }

        public async Task RejectBlog(
            int blogId
        )
        {
            await _repository
                .RejectBlog(blogId);
        }

        public async Task<IEnumerable<Video>>
    GetPendingVideos()
        {
            return await _repository
                .GetPendingVideos();
        }

        public async Task ApproveVideo(
    int videoId
)
        {
            await _repository
                .ApproveVideo(
                    videoId
                );

            var video =
                await _videoRepository
                    .GetVideoById(
                        videoId
                    );

            if (video.CommunityId != null)
            {
                string creatorName =
                    await _blogRepository
                        .GetUserName(
                            video.UserId
                        );

                string communityName =
                    await _blogRepository
                        .GetCommunityName(
                            video.CommunityId.Value
                        );

                await _communityService
                    .AddCommunityNotification(
                        video.CommunityId.Value,
                        video.UserId,
                        creatorName +
                        " uploaded a new video in " +
                        communityName
                    );
            }
        }

        public async Task RejectVideo(
            int videoId
        )
        {
            await _repository
                .RejectVideo(videoId);
        }

        public async Task<IEnumerable<Community>>
GetPendingCommunities()
        {
            return await _repository
                .GetPendingCommunities();
        }

        public async Task ApproveCommunity(
            int communityId
        )
        {
            await _repository
                .ApproveCommunity(
                    communityId
                );
        }

        public async Task RejectCommunity(
            int communityId
        )
        {
            await _repository
                .RejectCommunity(
                    communityId
                );
        }
    }
}