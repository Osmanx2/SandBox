using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;

namespace AuthAPI
{
    // You may need to install the Microsoft.AspNetCore.Http.Abstractions package into your project
    public static class Constants
    {
        public const string TokenSecret = @"SUPER-SECRET-KEY_OF_MY_API@#$#@*(&&*(";
    }
}
