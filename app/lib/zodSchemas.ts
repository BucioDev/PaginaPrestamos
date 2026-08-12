import z from "zod"

export const loginSchema = z.object({
    password: z.string().min(1, "Contraseña Incorrecta")
})

export const actividadSchema = z.object({
    descripcion: z.string().min(10, "la descripcion es muy corta"),
    solicitudId: z.string("Se debe seleccionar una solicitud"),
})

export const solicitudSchema = z.object({
    mayorEdad: z.boolean("El financiamiento solo esta disponible para mayores de edad"),
    nombre: z.string("Nombre es Requerido"),
    apellidoPaterno: z.string("Apellido Panerno es Requerido"),
    apellidoMaterno: z.string("Apellido Materno es Requerido"),
    fechaNacimiento: z.date("Fecha de Nacimiento es Requerido"),
    Telefono: z.string("Numero de Telefono es Requerido"),
    email: z.email("Correo Invalido"),
    confirmaEmail: z.email("Correo Invalido"),
    direccion: z.string("Direccion es Requerido"),
    codigoPostal: z
    .string("Código Postal es Requerido")
    .regex(/^\d{5}$/, "El Código Postal debe tener 5 dígitos")
    .refine(
      (value) => {
        const cp = Number(value);
        return cp >= 22000 && cp <= 22700;
      },
      "El Código Postal debe pertenecer a Tijuana, Baja California"
    ),
    anosNegocio: z.number("Años del negocio es Requerido"),
    nombreNegocio: z.string("Nombre del Negocio es Requerido"),
    paginaNegocio: z.string().optional(),
    descripcion: z.string().min(20).max(500),
    nombreReferencia: z.string("Nombre de la Referencia es Requerido"),
    telefonoReferencia: z.string("Numero de Telefono de la Referencia es Requerido"),
    creditoVigente: z.enum(["0", "1"]).transform(v => v === "1"),
    images: z.array(z.string("Imagenes es requerida")).min(1,"Imagenes es requerida"),
}).refine((data) => data.email === data.confirmaEmail,{
    error: "Los Correos no Coinciden",
    path:["confirmaEmail"],
});

export const solicitudPersonalSchema = z.object({
    mayorEdad: z.boolean("El financiamiento solo esta disponible para mayores de edad"),
    nombre: z.string("Nombre es Requerido"),
    apellidoPaterno: z.string("Apellido Panerno es Requerido"),
    apellidoMaterno: z.string("Apellido Materno es Requerido"),
    fechaNacimiento: z.date("Fecha de Nacimiento es Requerido"),
    Telefono: z.string("Numero de Telefono es Requerido"),
    email: z.email("Correo Invalido"),
    confirmaEmail: z.email("Correo Invalido"),
    direccion: z.string("Direccion es Requerido"),
    codigoPostal: z
    .string("Código Postal es Requerido")
    .regex(/^\d{5}$/, "El Código Postal debe tener 5 dígitos")
    .refine(
      (value) => {
        const cp = Number(value);
        return cp >= 22000 && cp <= 22700;
      },
      "El Código Postal debe pertenecer a Tijuana, Baja California"
    ),
    nombreReferencia: z.string("Nombre de la Referencia es Requerido"),
    telefonoReferencia: z.string("Numero de Telefono de la Referencia es Requerido"),
    creditoVigente: z.enum(["0", "1"]).transform(v => v === "1"),
}).refine((data) => data.email === data.confirmaEmail,{
    error: "Los Correos no Coinciden",
    path:["confirmaEmail"],
});