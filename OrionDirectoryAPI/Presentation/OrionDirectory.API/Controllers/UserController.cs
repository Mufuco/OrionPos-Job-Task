using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OrionDirectory.Application.DTOs;
using OrionDirectory.Application.Repositories.UserRepositoires;
using OrionDirectory.Application.Tokens;
using OrionDirectory.Application.ViewModels;
using OrionDirectoryAPI.Domain.Entities;
using System.Security.Claims;

namespace OrionDirectory.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        readonly private IUserReadRepository _userReadRepository;
        readonly private IUserWriteRepository _userWriteRepository;
        readonly ITokenHandler _tokenHandler;

        public UserController(IUserReadRepository userReadRepository, IUserWriteRepository userWriteRepository, ITokenHandler tokenHandler)
        {
            _userReadRepository = userReadRepository;
            _userWriteRepository = userWriteRepository;
            _tokenHandler = tokenHandler;
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] UserViewModel model)
        {
            if (model == null || string.IsNullOrEmpty(model.UserName) || string.IsNullOrEmpty(model.Password))
            {            
                return BadRequest("Kullanıcı adı ve şifre zorunludur.");
            }

            User user = _userReadRepository.GetWhere(x => x.UserName == model.UserName && x.Password == model.Password)?.FirstOrDefault();

            if (user == null)
            {
                return BadRequest("Kullanıcı adı veya şifre hatalı.");
            }

            Token token = _tokenHandler.CreateAccessToken(30,user);
            
            return Ok(new
            {
                Token=token
            });
        }

    }
}
