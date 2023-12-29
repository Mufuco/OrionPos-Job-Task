using OrionDirectory.Application.DTOs;
using OrionDirectoryAPI.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrionDirectory.Application.Tokens
{
    public interface ITokenHandler
    {
        Token CreateAccessToken(int minute,User user);
    }
}
