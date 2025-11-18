import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Pencil, Check, X } from "lucide-react";
import { useUpdateUser } from "@/app/hooks/user/useUpdateUser";

interface DireccionProps {
  direccion: string;
}

export default function Direccion({ direccion }: DireccionProps) {
  const { mutate: updateDireccion } = useUpdateUser();

  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(direccion);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    updateDireccion({ address: value });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setValue(direccion);
    setIsEditing(false);
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl sm:text-2xl">Dirección</CardTitle>
          {!isEditing && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleEdit}
              className="gap-2"
            >
              <Pencil className="w-4 h-4" />
              Editar
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <MapPin className="w-4 h-4 text-gray-500" />
            Dirección de entrega
          </label>
          <Input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            readOnly={!isEditing}
            className={`${
              !isEditing
                ? "bg-gray-50 border-gray-200"
                : "border-green-500 focus:border-green-600"
            }`}
          />
          {isEditing && (
            <div className="flex gap-2 pt-2">
              <Button onClick={handleSave}>
                <Check className="w-4 h-4" />
                Guardar
              </Button>
              <Button
                variant="outline"
                onClick={handleCancel}
                className="gap-2"
              >
                <X className="w-4 h-4" />
                Cancelar
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
