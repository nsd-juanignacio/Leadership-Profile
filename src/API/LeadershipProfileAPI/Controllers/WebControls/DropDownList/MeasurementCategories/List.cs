﻿using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using LeadershipProfileAPI.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace LeadershipProfileAPI.Controllers.WebControls.DropDownList.MeasurementCategories
{
    public static class List
    {
        public class Query : IRequest<Response> { }

        public class Response
        {
            public ICollection<Category> Categories { get; set; }
        }

        public class Category
        {
            public string Value { get; set; }

            public string Text { get; set; }

            public Category() { }
            public Category(string value)
            {
                Value = value;
                Text = value;
            }
        }

        public class QueryHandler : IRequestHandler<Query, Response>
        {
            private readonly EdFiDbContext _dbContext;

            public QueryHandler(EdFiDbContext dbContext)
            {
                _dbContext = dbContext;
            }

            public async Task<Response> Handle(Query request, CancellationToken cancellationToken)
            {
                var list = await _dbContext.ListItemCategories
                    .OrderBy(c => c.SortOrder)
                    .Select(c => c.Category)
                    .Distinct()
                    .Select(c => new Category(c))
                    .ToListAsync(cancellationToken);

                return new Response
                {
                    Categories = list
                };
            }
        }
    }
}