using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
#region snippet_NewtonsoftJsonImport
using Newtonsoft.Json;
#endregion

namespace WebApi.Models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("Name")]
        [JsonProperty("Name")]
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Nationality { get; set; }
        public string Gender { get; set; }
    }
}