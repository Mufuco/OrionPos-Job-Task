using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using OrionDirectory.Application.DTOs;
using OrionDirectory.Application.Tokens;
using OrionDirectoryAPI.Domain.Entities;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace OrionDirectory.Infastructure.Tokens
{
    public class TokenHandler : ITokenHandler
    {
        readonly IConfiguration _config;

        public TokenHandler(IConfiguration config)
        {
            _config = config;
        }

        public Token CreateAccessToken(int minute, User user)
        {
            Token token = new();
            SymmetricSecurityKey securityKey = new(Encoding.UTF8.GetBytes(_config["Token:SecurityKey"]));
            SigningCredentials signingCredentials = new(securityKey, SecurityAlgorithms.HmacSha256);
            token.Expiration = DateTime.UtcNow.AddHours(4).AddMinutes(minute);
            var claims = new List<Claim>
    {
        new Claim("id", user.Id.ToString())
    };
            JwtSecurityToken securityToken = new(
                audience: _config["Token:Audience"],
                issuer: _config["Token:Issuer"],
                expires: token.Expiration,
                notBefore: DateTime.UtcNow,
                claims:claims,
                signingCredentials: signingCredentials
                );

            JwtSecurityTokenHandler tokenHandler = new();
            token.AccessToken = tokenHandler.WriteToken(securityToken);
            return token;

        }
    }
}
