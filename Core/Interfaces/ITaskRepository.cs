using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;

namespace AureliaTest.Core.Interfaces
{
    public interface ITaskRepository
    {
        Models.Task GetTask(string id);
        Task<IEnumerable<Models.Task>> GetTasks();
        Models.Task AddTask(Models.Task task);
        void RemoveTask(string id);
        void UpdateTask(Models.Task task);
    }
}
