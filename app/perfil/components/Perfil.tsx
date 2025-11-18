import { User } from "@/app/shared/interfaces/user.interface";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, User as UserIcon, Calendar } from "lucide-react";

interface PerfilProps {
  user: User;
}

export default function Perfil({ user }: PerfilProps) {
  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="border-b">
        <CardTitle className="text-xl sm:text-2xl">
          Información Personal
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nombre */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <UserIcon className="w-4 h-4 text-gray-500" />
              Nombre completo
            </label>
            <div className="px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-md text-gray-900">
              {user.name}
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Mail className="w-4 h-4 text-gray-500" />
              Email
            </label>
            <div className="px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-md text-gray-900 break-all">
              {user.email}
            </div>
          </div>

          {/* Fecha de creación */}
          <div className="space-y-2 md:col-span-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Calendar className="w-4 h-4 text-gray-500" />
              Miembro desde
            </label>
            <div className="px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-md text-gray-900 max-w-xs">
              {formatDate(user.createdAt)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
