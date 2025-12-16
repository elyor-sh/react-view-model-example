import {Login} from "@/features/auth";
import {Lock} from "lucide-react";
import {Card, CardDescription, CardHeader, CardTitle} from "@/shared/ui";
import {Link} from "react-router";

export const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 mb-4 shadow-lg">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">
            Добро пожаловать
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Войдите в свой аккаунт
          </p>
        </div>

        {/* Login Card */}
        <Card className="border-slate-200 dark:border-slate-800 shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Вход</CardTitle>
            <CardDescription>
              Введите свои данные для входа в систему
            </CardDescription>
          </CardHeader>
          <Login />
        </Card>

        {/* Sign Up Link */}
        <p className="text-center text-sm text-slate-600 dark:text-slate-400 mt-6">
          Нет аккаунта?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            Зарегистрироваться
          </Link>
        </p>
      </div>
    </div>
  )
}