﻿using LeadershipProfileAPI.Features.Search;
using Shouldly;
using System.Threading.Tasks;
using LeadershipProfileAPI.Data.Models.ProfileSearchRequest;
using LeadershipProfileAPI.Tests.Extensions;
using Xunit;

namespace LeadershipProfileAPI.Tests.Features.Search
{
    public class ListTests
    {

        [Fact]
        public async Task ShouldGetResponseWithEmptyRequest()
        {
            var body = new ProfileSearchRequestBody();
            var response = await SendSearchQuery(body);

            response.ShouldNotBeNull();
        }

        [Fact]
        public async Task ShouldGetResponseWithRatingsRequest()
        {
            var body = new ProfileSearchRequestBody().AddRatings();
            var response = await SendSearchQuery(body);

            response.ShouldNotBeNull();
        }

        [Fact]
        public async Task ShouldGetResponseWithFullRequest()
        {
            var body = new ProfileSearchRequestBody()
                .AddRatings()
                .AddAssignments()
                .AddDegrees();

            var response = await SendSearchQuery(body);

            response.ShouldNotBeNull();
        }


        private Task<List.Response> SendSearchQuery(ProfileSearchRequestBody body, int page = 1)
        {
            return Testing.Send(new List.Query
            {
                SearchRequestBody = body,
                Page = page,
            });
        }
    }
}
