using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading.Tasks;
using AureliaTest.Core.Interfaces;
using AureliaTest.Persistence;
using MongoDB.Bson;
using MongoDB.Driver;

namespace AureliaTest.Core
{
    public class TasksRepository : ITaskRepository
    {
        private readonly MongoDBContext context;

        public TasksRepository(MongoDBContext contex)
        {
            this.context = contex;            
        }

        public Models.Task AddTask(Models.Task task)
        {
            context.Tasks.InsertOne(task);
            var filter = Builders<Models.Task>.Filter.Eq(t => t.Description, task.Description);
            return context.Tasks.Find(filter).FirstOrDefault();
        }

        public Models.Task GetTask(string id)
        { 
            var filter = Builders<Models.Task>.Filter.Eq(t => t.Id, id);
            return context.Tasks.FindAsync(filter).GetAwaiter().GetResult().ToEnumerable().FirstOrDefault();
        }

        public async Task<IEnumerable<Models.Task>> GetTasks()
        {
            var filter = new BsonDocument();
            return await context.Tasks.Find(filter).ToListAsync();
        }

        public void RemoveTask(string id)
        {
            var filter = Builders<Models.Task>.Filter.Eq(t => t.Id, id);
            context.Tasks.DeleteOne(filter);
        }

        public void UpdateTask(Models.Task task)
        {
            var filter = Builders<Models.Task>.Filter.Eq(t => t.Id, task.Id);
            context.Tasks.FindOneAndReplace(filter, task);
        }
    }
}
