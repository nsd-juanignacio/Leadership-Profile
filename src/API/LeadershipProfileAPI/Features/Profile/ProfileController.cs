﻿using LeadershipProfileAPI.Data.Models;
using LeadershipProfileAPI.Infrastructure;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;

namespace LeadershipProfileAPI.Features.Profile
{
    [TypeFilter(typeof(ApiExceptionFilter))]
    [ApiController]
    [Route("[controller]")]
    [Authorize(Roles = "Admin")]
    public class ProfileController : ControllerBase
    {
        private readonly ILogger<ProfileController> _logger;
        private readonly IHttpClientFactory _clientFactory;
        private readonly IMediator _mediator;

        public ProfileController(ILogger<ProfileController> logger, IHttpClientFactory clientFactory,
            IMediator mediator)
        {
            _logger = logger;
            _clientFactory = clientFactory;
            _mediator = mediator;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetProfile([FromRoute] string id, CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(new Get.Query { Id = id }, cancellationToken);

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        [HttpPost("datacorrection")]
        public async Task<ActionResult> SendDataCorrection(DataCorrectionModel data, CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(new DataCorrection.Command
            {
                MessageDescription = data.MessageDescription,
                MessageSubject = data.MessageSubject,
                StaffEmail = data.StaffEmail,
                StaffUniqueId = data.StaffUniqueId,
                UserFullName = data.UserFullName,
                Telephone = data.Telephone
            });

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }
    }
}