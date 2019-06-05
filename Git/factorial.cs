using System;

namespace Simple {
    class Factorial {
        public static void Main(string[] args) {
            Console.WriteLine($"Your factorial: {CalcFac(Convert.ToInt32(args[0]))}");
        }

        private static int CalcFac(int num) {
            return (num > 1) ? (num * CalcFac(num - 1)) : 1;
        }
    }
}