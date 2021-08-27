using System;
using System.Linq;
using LeadershipProfileAPI.Data.Models.ProfileSearchRequest;

namespace LeadershipProfileAPI.Tests.Extensions
{
    public static class ProfileSearchRequestBodyExtensions
    {
        public static ProfileSearchRequestBody AddMinYears(this ProfileSearchRequestBody body, int years)
        {
            body.MinYears = years;
                
            return body;
        }
        
        public static ProfileSearchRequestBody AddMaxYears(this ProfileSearchRequestBody body, int years)
        {
            body.MaxYears = years;

            return body;
        }

        
        public static ProfileSearchRequestBody AddRatings(this ProfileSearchRequestBody body, ProfileSearchRequestRatings degrees = null)
        {
            if (degrees != null)
            {
                body.Ratings = degrees;
            }
            else
            {                
                body.Ratings = new ProfileSearchRequestRatings
                {
                    CategoryId = 1,
                    SubCategory = "Lorem Ipsum"
                };
            }

            return body;
        }

        public static ProfileSearchRequestBody AddAssignments(this ProfileSearchRequestBody body,
            ProfileSearchRequestAssignments assignments = null)
        {
            if (assignments != null)
            {
                body.Assignments = assignments;
            }
            else
            {
                body.Assignments = new ProfileSearchRequestAssignments
                {
                    StartDate = DateTime.UtcNow,
                    Values = Enumerable.Range(0, 10).ToList()
                };
            }

            return body;
        }

        public static ProfileSearchRequestBody AddDegrees(this ProfileSearchRequestBody body, ProfileSearchRequestDegrees degrees = null)
        {
            if (degrees != null)
            {
                body.Degrees = degrees;
            }
            else
            {                
                body.Degrees = new ProfileSearchRequestDegrees
                {
                    Values = Enumerable.Range(0, 10).ToList()
                };
            }

            return body;
        }


        public static ProfileSearchRequestBody AddInstitutions(this ProfileSearchRequestBody body,
            ProfileSearchRequestInstitution institutions = null)
        {
            if (institutions != null)
            {
                body.Institutions = institutions;
            }
            else
            {
                body.Institutions = new ProfileSearchRequestInstitution
                {
                    Values = Enumerable.Range(0, 10).ToList()
                };
            }

            return body;
        }
    }
}