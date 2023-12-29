using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OrionDirectory.Application.Repositories.PhoneDirectoryRepositories;
using OrionDirectory.Application.Repositories.UserRepositoires;
using OrionDirectory.Application.ViewModels;
using OrionDirectoryAPI.Domain.Entities;
using System;

namespace OrionDirectory.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]

    public class PhoneDirectoryController : ControllerBase
    {
        readonly private IPhoneDirectoryReadRepository _directoryReadRepository;
        readonly private IPhoneDirectoryWriteRepository _directoryWriteRepository;
        readonly private IUserReadRepository _userReadRepository;

        public PhoneDirectoryController(IPhoneDirectoryReadRepository directoryReadRepository, IPhoneDirectoryWriteRepository directoryWriteRepository, IUserReadRepository userReadRepository)
        {
            _directoryReadRepository = directoryReadRepository;
            _directoryWriteRepository = directoryWriteRepository;
            _userReadRepository = userReadRepository;
        }

        [HttpPost]
        public async Task<IActionResult> GetDirectories([FromBody] GetPhoneDirectoryViewModel model)
        {        
            List<PhoneDirectory> list = _directoryReadRepository.GetWhere(x => x.CreatedBy.Id == model.UserId).ToList();
           
            var viewModel = list.Select(x => new PhoneDirectoryViewModel
            {
                Id = x.Id,
                Name = x.Name,
                PhoneNumber = x.PhoneNumber
            }).ToList();

            if (viewModel != null && viewModel.Count() > 0)
                return Ok(viewModel);


            return BadRequest();
        }

        [HttpPut]
        public async Task<IActionResult> CreateOrUpdate([FromBody] PhoneDirectoryViewModel model)
        {
            if (model?.Id != null && model?.Id != 0)
            {
                PhoneDirectory directory = await _directoryReadRepository.GetByIdAsync(model.Id.Value);
                if (directory != null)
                {
                    directory.Name = model.Name;
                    directory.PhoneNumber = model.PhoneNumber;

                    _directoryWriteRepository.Update(directory);
                    await _directoryWriteRepository.SaveAsync();
                    return Ok();
                }
                else
                {
                    return BadRequest();
                }
            }
            else
            {
                var created = await _userReadRepository.GetByIdAsync(model.CreatedBy);
                if (created != null)
                {
                    await _directoryWriteRepository.AddAsync(new PhoneDirectory
                    {
                        Name = model.Name,
                        PhoneNumber = model.PhoneNumber,
                        CreatedBy = created

                    });
                    await _directoryWriteRepository.SaveAsync();

                    return Ok();
                }
                else
                {
                    return BadRequest();
                }
            }

        }

        [HttpDelete]
        public async Task<IActionResult> Delete([FromBody] int[] ids)
        {
            List<PhoneDirectory> deleteList = new();
            foreach (var id in ids)
            {
                var deleteItem = await _directoryReadRepository.GetByIdAsync(id);
                if (deleteItem != null)
                    deleteList.Add(deleteItem);
            }
            if (deleteList != null && deleteList.Count() > 0)
                if (_directoryWriteRepository.RemoveRange(deleteList)) {
                  await _directoryWriteRepository.SaveAsync();
                    return Ok();
                }

            return BadRequest();
        }

       
    }
}
