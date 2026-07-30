using CampusConnect.API.Data;
using CampusConnect.API.Repositories;
using CampusConnect.API.Services;
using CampusConnect.API.Helpers;

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Controllers
builder.Services.AddControllers();

// CORS for React Frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact",
    policy =>
    {
        policy
    .AllowAnyOrigin()
    .AllowAnyHeader()
    .AllowAnyMethod();
    });
});

// Swagger
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("Bearer",
    new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Enter JWT Token"
    });


options.AddSecurityRequirement(
    new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });


});

// Dapper Context
builder.Services.AddScoped<DbContextDapper>();

// Auth
builder.Services.AddScoped<IAuthRepository, AuthRepository>();
builder.Services.AddScoped<IAuthService, AuthService>();


builder.Services.AddScoped<EmailService>();

// Admin
builder.Services.AddScoped<IAdminRepository, AdminRepository>();
builder.Services.AddScoped<IAdminService, AdminService>();

// Blogs
builder.Services.AddScoped<IBlogRepository, BlogRepository>();
builder.Services.AddScoped<IBlogService, BlogService>();

// Comments
builder.Services.AddScoped<ICommentRepository, CommentRepository>();
builder.Services.AddScoped<ICommentService, CommentService>();

// Likes
builder.Services.AddScoped<ILikeRepository, LikeRepository>();
builder.Services.AddScoped<ILikeService, LikeService>();
builder.Services.AddScoped<
    IVideoLikeRepository,
    VideoLikeRepository>();

builder.Services.AddScoped<
    IVideoLikeService,
    VideoLikeService>();

builder.Services.AddScoped<
    IVideoCommentRepository,
    VideoCommentRepository>();

builder.Services.AddScoped<
    IVideoCommentService,
    VideoCommentService>();

builder.Services.AddScoped<
    INotificationRepository,
    NotificationRepository>();

builder.Services.AddScoped<
    INotificationService,
    NotificationService>();

builder.Services.AddScoped<
    ICommunityRepository,
    CommunityRepository>();

builder.Services.AddScoped<
    ICommunityService,
    CommunityService>();

// Videos
builder.Services.AddScoped<IVideoRepository, VideoRepository>();
builder.Services.AddScoped<IVideoService, VideoService>();

// JWT Helper
builder.Services.AddScoped<JwtHelper>();

// JWT Authentication
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme =
    JwtBearerDefaults.AuthenticationScheme;


options.DefaultChallengeScheme =
    JwtBearerDefaults.AuthenticationScheme;


})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters =
    new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,

        ValidIssuer =
                builder.Configuration["Jwt:Issuer"],

        ValidAudience =
                builder.Configuration["Jwt:Audience"],

        IssuerSigningKey =
                new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(
                        builder.Configuration["Jwt:Key"]!
                    )
                )
    };


});

// Build App
var app = builder.Build();

// Swagger

    app.UseSwagger();
    app.UseSwaggerUI();


app.UseHttpsRedirection();

app.UseStaticFiles();

// CORS
app.UseCors("AllowReact");

// JWT
app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

Console.WriteLine(
    BCrypt.Net.BCrypt.HashPassword("admin123")
);
Console.WriteLine($"WebRootPath = {app.Environment.WebRootPath}");
Console.WriteLine($"ContentRootPath = {app.Environment.ContentRootPath}");
app.Run();
