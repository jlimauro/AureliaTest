using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AureliaTest.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AureliaTest.Controllers
{
    [Route("api/[controller]")]
    public class TasksController : Controller
    {
        private readonly ITaskRepository repository;

        public TasksController(ITaskRepository repository)
        {
            this.repository = repository;
        }

        // GET: api/Tasks
        [HttpGet]
        public async Task<IEnumerable<Core.Models.Task>> GetAll()
        {
            IEnumerable<Core.Models.Task> results = await repository.GetTasks();
            return results;
        }

        // GET api/Tasks/id
        [HttpGet("{id}")]
        public Core.Models.Task Get(string id)
        {
            return repository.GetTask(id);
        }

        // POST api/Tasks
        [HttpPost]
        public IActionResult Post([FromBody]Core.Models.Task task)
        {
            return Ok(repository.AddTask(task));
        }

        // PUT api/Tasks
        [HttpPut]
        public IActionResult Put([FromBody]Core.Models.Task task)
        {
            repository.UpdateTask(task);
            return Ok();
        }

        // DELETE api/Tasks
        [HttpDelete]
        public IActionResult Delete([FromBody]Core.Models.Task task)
        {
           repository.RemoveTask(task.Id);
           return Ok();
        }
    }
}
