using System;
using System.Text;
using RabbitMQ.Client;

internal class Program
{
	private static void Main(string[] args)
	{
		var factory = new ConnectionFactory() { HostName = "localhost", Port = 5672 };
		factory.UserName = "user";
		factory.Password = "password";

		IConnection connection = factory.CreateConnection();

		using (var channel = connection.CreateModel())
		{
			channel.QueueDeclare(queue: "producer",
									durable: false,
									exclusive: false,
									autoDelete: false,
									arguments: null);

			for(int i = 0; i < 1000000; i++)
			{
				string message = Guid.NewGuid().ToString();
				var body = Encoding.UTF8.GetBytes(message);

				channel.BasicPublish(exchange: "",
										routingKey: "producer",
										basicProperties: null,
										body: body);
			}
			Console.WriteLine("Finished sending messages!");

		}
	}
}