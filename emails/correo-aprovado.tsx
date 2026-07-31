import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Preview,
    Section,
    Tailwind,
    Text,
    pixelBasedPreset,
  } from "react-email";
  
  interface SolicitudAprobadaEmailProps {
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    email: string;
    codigo: string;
    qrUrl: string;
  }
  
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "";
  
  export const SolicitudAprobadaEmail = ({
    nombre,
    apellidoPaterno,
    apellidoMaterno,
    email,
    codigo,
    qrUrl,
  }: SolicitudAprobadaEmailProps) => {
    const nombreCompleto = `${nombre} ${apellidoPaterno} ${apellidoMaterno}`;
    const previewText = "¡Tu solicitud ha sido aprobada!";
  
    return (
      <Html>
        <Head />
        <Tailwind
          config={{
            presets: [pixelBasedPreset],
          }}
        >
          <Body className="mx-auto my-auto bg-[#f6f9fc] px-2 font-sans">
            <Preview>{previewText}</Preview>
  
            <Container className="mx-auto my-[40px] max-w-[500px] rounded-lg border border-[#eaeaea] bg-white p-[32px]">
  
              <Section className="text-center">
                <Img
                  src={`${baseUrl}/static/logo.png`}
                  width="60"
                  height="60"
                  alt="Logo"
                  className="mx-auto"
                />
              </Section>
  
              <Heading className="text-center text-[24px] font-bold text-[#111827]">
                🎉 ¡Solicitud aprobada!
              </Heading>
  
              <Text className="text-[15px] leading-[24px] text-[#374151]">
                Hola <strong>{nombreCompleto}</strong>,
              </Text>
  
              <Text className="text-[15px] leading-[24px] text-[#374151]">
                Nos complace informarte que, después de revisar la información
                proporcionada, <strong>tu solicitud ha sido aprobada.</strong>
              </Text>
  
              <Text className="text-[15px] leading-[24px] text-[#374151]">
                A partir de este momento formas parte de nuestro registro. A
                continuación encontrarás tu código de identificación.
              </Text>
  
              <Section className="my-[30px] rounded-lg border border-[#d1fae5] bg-[#ecfdf5] p-[24px] text-center">
  
                <Text className="mb-[10px] text-[14px] font-medium text-[#065f46]">
                  Código de aprobación
                </Text>
  
                <Heading className="m-0 text-[30px] font-bold tracking-[4px] text-[#047857]">
                  {codigo}
                </Heading>
  
                <Text className="mt-[18px] text-[14px] leading-[22px] text-[#065f46]">
                  Guarda este código. Será necesario para futuras consultas,
                  validaciones o trámites relacionados con tu registro.
                </Text>
  
                <Img
                  src={qrUrl}
                  width="180"
                  height="180"
                  alt="Código QR"
                />
  
              </Section>
  
              <Section className="my-[30px] text-center">
                <Button
                  href="https://tu-sitio.com"
                  className="rounded bg-[#059669] px-6 py-3 text-[14px] font-semibold text-white no-underline"
                >
                  Visitar sitio web
                </Button>
              </Section>
  
              <Hr className="my-[24px] border border-[#e5e7eb]" />
  
              <Text className="text-[12px] leading-[20px] text-[#6b7280]">
                Este correo fue enviado a <strong>{email}</strong>. Si tienes alguna duda sobre el proceso o necesitas asistencia,
                puedes comunicarte con nosotros por WhatsApp.
              </Text>

              <Section className="text-center mt-[12px]">
                <Button
                  href={`https://wa.me/526641727333?text=${encodeURIComponent(
                    "Hola, tengo una duda sobre mi solicitud."
                  )}`}
                  className="rounded bg-[#25D366] px-5 py-3 text-[14px] font-semibold text-white no-underline"
                >
                  Contactar por WhatsApp
                </Button>
              </Section>
  
            </Container>
          </Body>
        </Tailwind>
      </Html>
    );
  };
  
  SolicitudAprobadaEmail.PreviewProps = {
    nombre: "Juan",
    apellidoPaterno: "Pérez",
    apellidoMaterno: "García",
    email: "juan.perez@example.com",
    codigo: "ABC123DEF456XYZ",
    qrUrl: "https://via.placeholder.com/180",
  } as SolicitudAprobadaEmailProps;
  
  export default SolicitudAprobadaEmail;